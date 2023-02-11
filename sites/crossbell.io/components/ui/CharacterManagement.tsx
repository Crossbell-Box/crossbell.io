import {
	TextInput,
	Button,
	Group,
	Textarea,
	Text,
	Space,
	Loader,
	Avatar,
	Container,
	Input,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { useDebouncedValue } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import Link from "next/link";
import { PropsWithChildren, useEffect, useState } from "react";

import { useCharacter, useCharacterByHandle } from "@crossbell/indexer";
import { ipfsLinkToHttpLink, uploadToIpfs } from "~/shared/ipfs";
import {
	extractCharacterName,
	generateCharacterHandle,
} from "@crossbell/util-metadata";
import { composeCharacterHref } from "~/shared/url";
import { BizError } from "@crossbell/contract";
import {
	useAccountState,
	useConnectModal,
	useCreateCharacter,
	useUpdateCharacterHandle,
	useUpdateCharacterMetadata,
} from "@crossbell/connect-kit";

import { LoadingOverlay } from "~/shared/components/loading-overlay";

export default function CharacterManagement({
	characterId,
}: PropsWithChildren<{
	characterId?: number;
}>) {
	const { data: character, isLoading: isLoadingCharacter } =
		useCharacter(characterId);
	const isAbleToEditHandle = useAccountState((s) => !!s.wallet);

	const [avatarLoading, setAvatarLoading] = useState(false);
	const mode: "new" | "edit" = characterId ? "edit" : "new";

	let isExistingHandle = false;
	const form = useForm({
		initialValues: {
			handle: "",
			avatar: "",
			name: "",
			bio: "",
		},

		validate: {
			handle: (value) => {
				if (value.length === 0) return null;

				if (value.length < 3) {
					return "Handle must be at least 3 characters long";
				}

				if (value.length > 31) {
					return "Handle must be at most 31 characters long";
				}

				// no upper case
				if (value.match(/[A-Z]/)) {
					return "Handle must not contain upper case";
				}

				// no special characters unless _ or -
				if (!/^[a-z0-9\-\_]+$/.test(value)) {
					return "Handle must contain only lower case letters, numbers, and _ or -";
				}

				if (isExistingHandle) {
					return `Handle ${value} is already taken`;
				}

				return null;
			},
		},
	});

	// update handle while name is being edited
	useEffect(() => {
		if (mode === "new") {
			if (form.values.name.length > 0) {
				const name = form.values.name;
				const handle = generateCharacterHandle(name);
				form.setFieldValue("handle", handle);
			} else {
				form.setFieldValue("handle", "");
			}
		}
	}, [form.values.name, mode]);

	// check if handle is taken
	const [debouncedHandle] = useDebouncedValue(form.values.handle, 200);
	const {
		data: existingHandle,
		isFetching: isFetchingExistingHandle,
		refetch: refetchExistingHandle,
	} = useCharacterByHandle(debouncedHandle);
	isExistingHandle =
		Boolean(existingHandle) && existingHandle?.characterId !== characterId;

	// check handle validation while typing
	useEffect(() => {
		const { errors } = form.validate();
		if (errors.handle) {
			return;
		}
	}, [debouncedHandle, existingHandle?.handle]);

	useEffect(() => {
		isExistingHandle = false;
	}, [form.values.handle]);

	// inject existing character data into form
	useEffect(() => {
		if (character?.metadata?.content) {
			form.setValues({
				handle: character.handle ?? "",
				avatar:
					character.metadata?.content?.avatars?.[0]?.replace?.(
						"https://gateway.ipfs.io/ipfs/",
						"ipfs://"
					) ?? "",
				name: extractCharacterName(character) ?? "",
				bio: character.metadata?.content?.bio ?? "",
			});
		}
	}, [character, character?.metadata?.content]);

	// upload avatar
	const handleUpload = async (files: File[]) => {
		setAvatarLoading(true);
		try {
			const ipfsUri = await uploadToIpfs(files[0]);
			form.setFieldValue("avatar", "");
			setTimeout(() => {
				form.setFieldValue("avatar", ipfsUri);
			});
		} catch (err: any) {
			showNotification({
				title: "Error while uploading avatar",
				message: err.message,
				color: "red",
			});
		}
		setAvatarLoading(false);
	};

	const createCharacter = useCreateCharacter();
	const setHandle = useUpdateCharacterHandle();
	const setMetadata = useUpdateCharacterMetadata();

	const [loadingDescription, setLoadingDescription] = useState(
		"Loading character..."
	);

	const [status, setStatus] = useState<"form" | "done">("form");

	// submit
	const handleSubmit = async () => {
		await refetchExistingHandle();
		form.validate();

		try {
			if (character) {
				const tasks: (() => Promise<void>)[] = [];
				const taskNames: string[] = [];

				// get current status
				const currentHandle = character.handle;
				const currentName = extractCharacterName(character, {
					fallbackToHandle: false,
				});
				const currentBio = character.metadata?.content?.bio ?? "";
				const currentAvatar = character.metadata?.content?.avatars?.[0] ?? "";

				// task1: check if handle is changed
				if (form.values.handle !== currentHandle) {
					taskNames.push("Updating handle");
					tasks.push(async () => {
						await setHandle.mutateAsync({
							characterId: character.characterId,
							handle: form.values.handle,
						});
					});
				}

				// task2: check if metadata is changed
				if (
					form.values.name !== currentName ||
					form.values.bio !== currentBio ||
					form.values.avatar !== currentAvatar
				) {
					taskNames.push("Updating metadata");
					tasks.push(async () => {
						await setMetadata.mutateAsync({
							characterId: character.characterId,
							edit(metadata) {
								metadata.type = metadata.type ?? "character";
								metadata.name = form.values.name;
								metadata.avatars = [form.values.avatar].filter(Boolean);
								metadata.bio = form.values.bio;
							},
						});
					});
				}

				// run all tasks
				for (let i = 0; i < tasks.length; i++) {
					setLoadingDescription(
						`${taskNames[i]}... (${i + 1}/${tasks.length})`
					);
					await tasks[i]();
				}
			} else {
				setLoadingDescription("Creating character...");

				// create new character
				await createCharacter.mutateAsync({
					handle: form.values.handle,
					metadata: {
						name: form.values.name,
						avatars: [form.values.avatar].filter((x) => Boolean(x)),
						bio: form.values.bio,
					},
				});
			}

			// done
			setStatus("done");
		} catch (e: any) {
			if (!(e instanceof BizError)) {
				showNotification({
					title: "Error while minting character",
					message: e.message,
					color: "red",
				});
			}
		}
	};

	const renderForm = () => {
		return (
			<div>
				<form
					className="relative"
					onSubmit={form.onSubmit((values) => {
						console.log({ values });
						handleSubmit();
					})}
				>
					<Space h={15} />

					{/* avatar */}
					<Input.Label size="md">
						<Group spacing="sm">
							Avatar
							<Text color="dimmed" inline>
								(max size: 2MB)
							</Text>
						</Group>
					</Input.Label>
					<div className="relative flex items-center flex-1">
						<Dropzone
							onDrop={handleUpload}
							accept={IMAGE_MIME_TYPE}
							maxSize={2 * 1024 ** 2} // 2MB
							radius={9999}
							padding={0}
							className="mr-4"
							styles={{
								root: { border: "none" },
							}}
						>
							<Group>
								<div className="relative">
									<LoadingOverlay visible={avatarLoading} />
									<Avatar
										className="h-16 w-16 rounded-full"
										src={ipfsLinkToHttpLink(form.values.avatar)}
									/>
								</div>
							</Group>
						</Dropzone>
					</div>

					<Space h={15} />

					{/* name */}
					<Group>
						<TextInput
							className="flex-1"
							placeholder="Your character's name"
							size="md"
							label="Name"
							required
							maxLength={50}
							{...form.getInputProps("name")}
						/>
					</Group>

					<Space h={15} />

					{/* handle */}
					{isAbleToEditHandle && (
						<Group>
							<TextInput
								className="flex-1"
								placeholder="A globally unique handle (ID) for your character"
								label="Handle"
								required
								size="md"
								maxLength={31}
								rightSection={
									isFetchingExistingHandle ? <Loader size="xs" /> : null
								}
								{...form.getInputProps("handle")}
							/>
						</Group>
					)}

					<Space h={15} />

					{/* bio */}
					<Group>
						<Textarea
							className="flex-1"
							placeholder="A short bio about your character"
							size="md"
							label="Bio"
							maxLength={200}
							{...form.getInputProps("bio")}
						/>
					</Group>

					<Space h={20} />

					{/* actions */}
					<Group position="right" mt="md">
						<Button
							type="submit"
							size="md"
							className="text-dark"
							disabled={
								(Boolean(characterId) && isLoadingCharacter) || avatarLoading
							}
						>
							I’ve decided
						</Button>
					</Group>
				</form>
			</div>
		);
	};

	const renderCompleted = () => {
		return (
			<div className="flex flex-col items-center justify-center">
				<img
					src={
						mode === "new"
							? "/illustrations/completed.svg"
							: "/illustrations/data-uploaded.svg"
					}
					alt="Congratulations"
					className="w-full"
				/>

				<Text className="my-5" weight={500}>
					{mode === "new" &&
						"Congrats! You have minted your own character now!"}
					{mode === "edit" &&
						"Your data has been successfully recorded on Crossbell!"}
				</Text>

				<Button
					className="text-dark"
					size="lg"
					component={Link}
					href={composeCharacterHref(form.values.handle)}
					target="_blank"
				>
					My Character Page
				</Button>
			</div>
		);
	};

	return (
		<Container>
			<LoadingOverlay
				visible={
					(characterId && isLoadingCharacter) ||
					createCharacter.isLoading ||
					setHandle.isLoading ||
					setMetadata.isLoading
				}
				description={loadingDescription ?? "Loading character"}
			/>

			{status === "form" && renderForm()}

			{status === "done" && renderCompleted()}

			<LoginPopup />
		</Container>
	);
}

// This will keep popping up if the user is not logged in.
function LoginPopup() {
	const { account, ssrReady } = useAccountState((s) => ({
		account: s.computed.account,
		ssrReady: s.ssrReady,
	}));
	const connectModal = useConnectModal();

	useEffect(() => {
		if (ssrReady && !account && !connectModal.isActive) {
			connectModal.show();
		}
	}, [account, ssrReady, connectModal]);

	return <></>;
}
