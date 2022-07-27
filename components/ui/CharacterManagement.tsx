import { PropsWithChildren, useEffect, useState } from "react";
import { useCharacter, useCharacterByHandle } from "@/utils/apis/indexer";
import {
	TextInput,
	Button,
	Group,
	Textarea,
	Box,
	Text,
	Space,
	Loader,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import Avatar from "@/components/common/Avatar";
import { uploadToIpfs } from "@/utils/ipfs";
import { extractCharacterName } from "@/utils/metadata";
import { useDebouncedValue } from "@mantine/hooks";
import {
	useCreateCharacter,
	useSetCharacterHandle,
	useSetCharacterMetadata,
} from "@/utils/apis/contract";
import LoadingOverlay from "../common/LoadingOverlay";
import { useRouter } from "next/router";
import { composeCharacterHref } from "@/utils/url";

export default function CharacterManagement({
	characterId,
}: PropsWithChildren<{
	characterId?: number;
}>) {
	const { data: character, isLoading: isLoadingCharacter } =
		useCharacter(characterId);

	const [avatarLoading, setAvatarLoading] = useState(false);

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

	// check if handle is taken
	const [debouncedHandle] = useDebouncedValue(form.values.handle, 200);
	const {
		data: existingHandle,
		isFetching: isFetchingExistingHandle,
		refetch,
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
		if (character) {
			form.setValues({
				handle: character.handle ?? "",
				avatar:
					character.metadata?.content?.avatars?.[0].replace(
						"https://gateway.ipfs.io/ipfs/",
						"ipfs://"
					) ?? "",
				name: extractCharacterName(character) ?? "",
				bio: character.metadata?.content?.bio ?? "",
			});
		}
	}, [character]);

	// upload avatar
	const handleUpload = async (files: File[]) => {
		setAvatarLoading(true);
		try {
			const ipfsUri = await uploadToIpfs(files[0]);
			form.setFieldValue("avatar", "");
			setTimeout(() => {
				form.setFieldValue("avatar", ipfsUri);
			});
		} catch (e: any) {}
		setAvatarLoading(false);
	};

	const createCharacter = useCreateCharacter();
	const setHandle = useSetCharacterHandle(character?.characterId!);
	const setMetadata = useSetCharacterMetadata(character?.characterId!);

	const [loadingDescription, setLoadingDescription] = useState(
		"Loading character..."
	);

	const router = useRouter();

	// submit
	const handleSubmit = async () => {
		await refetch();
		form.validate();

		if (character) {
			const tasks: (() => Promise<void>)[] = [];
			const taskNames: string[] = [];

			// get current status
			const currentHandle = character.handle;
			const currentName = extractCharacterName(character, {
				fallbackToHandle: false,
			});
			const currentBio = character.metadata?.content?.bio;
			const currentAvatar = character.metadata?.content?.avatars?.[0];

			// task1: check if handle is changed
			if (form.values.handle !== currentHandle) {
				taskNames.push("Updating handle");
				tasks.push(async () => {
					await setHandle.mutateAsync({
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
						metadata: {
							name: form.values.name,
							avatars: [form.values.avatar].filter((x) => Boolean(x)),
							bio: form.values.bio,
						},
					});
				});
			}

			// run all tasks
			for (let i = 0; i < tasks.length; i++) {
				setLoadingDescription(`${taskNames[i]}... (${i + 1}/${tasks.length})`);
				await tasks[i]();
			}
		} else {
			setLoadingDescription("Creating character...");

			// create new character
			createCharacter.mutate({
				handle: form.values.handle,
				metadata: {
					name: form.values.name,
					avatars: [form.values.avatar].filter((x) => Boolean(x)),
					bio: form.values.bio,
				},
			});
		}

		router.push(composeCharacterHref(form.values.handle));
	};

	return (
		<Box>
			<LoadingOverlay
				visible={
					isLoadingCharacter ||
					createCharacter.isLoading ||
					setHandle.isLoading ||
					setMetadata.isLoading
				}
				description={loadingDescription ?? "Loading character"}
			/>

			<form
				className="relative"
				onSubmit={form.onSubmit((values) => {
					console.log({ values });
					handleSubmit();
				})}
			>
				<Space h={15} />

				{/* handle */}
				<Group>
					<Text className="w-15 text-right">Handle</Text>
					<TextInput
						className="flex-1"
						placeholder="A globally unique handle (ID) for your character"
						required
						size="md"
						maxLength={31}
						rightSection={
							isFetchingExistingHandle ? <Loader size="xs" /> : null
						}
						{...form.getInputProps("handle")}
					/>
				</Group>

				<Space h={15} />

				{/* avatar */}
				<Group>
					<Text className="w-15 text-right">Avatar</Text>
					<div className="relative flex items-center flex-1">
						<Dropzone
							onDrop={handleUpload}
							accept={IMAGE_MIME_TYPE}
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
										className="h-16 w-16"
										src={form.values.avatar.replace(
											"ipfs://",
											"https://gateway.ipfs.io/ipfs/"
										)}
									/>
								</div>
							</Group>
						</Dropzone>
					</div>
				</Group>

				<Space h={15} />

				{/* name */}
				<Group>
					<Text className="w-15 text-right">Name</Text>
					<TextInput
						className="flex-1"
						placeholder="Your character's name"
						size="md"
						maxLength={50}
						{...form.getInputProps("name")}
					/>
				</Group>

				<Space h={15} />

				{/* bio */}
				<Group>
					<Text className="w-15 text-right">Bio</Text>
					<Textarea
						className="flex-1"
						placeholder="A short bio about your character"
						size="md"
						maxLength={200}
						{...form.getInputProps("bio")}
					/>
				</Group>

				<Space h={20} />

				{/* actions */}
				<Group position="right" mt="md">
					<Button type="submit" size="md" className="text-dark">
						I’ve decided
					</Button>
				</Group>
			</form>
		</Box>
	);
}
