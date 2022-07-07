import { PropsWithChildren, useEffect, useState } from "react";
import { useCharacter } from "@/utils/apis/indexer";
import { LoadingOverlay, TextInput, Button, Group, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { Dropzone, DropzoneStatus, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import Avatar from "@/components/common/Avatar";
import { useAccount } from "wagmi";
import { upload } from '@/utils/ipfs';
import unidata from '@/utils/unidata';
import { showNotification } from '@mantine/notifications';
import { useQueryClient, useMutation } from "react-query";
import { SCOPE_KEYS } from "@/utils/apis/indexer/character";

export default function CharacterManagement({
  characterId,
}: PropsWithChildren<
  {
    characterId?: string;
  }
>) {
  const { data: character } = useCharacter(characterId || "");
  const { data: account } = useAccount();

  const [avatarLoading, setAvatarLoading] = useState(false);
  const [characterLoading, setCharacterLoading] = useState(!!characterId);

  const queryClient = useQueryClient();

  const form = useForm({
    initialValues: {
      handle: "",
      avatar: "",
      name: "",
      bio: "",
    },

    validate: {
      handle: (value) => (/^[a-z0-9_\\-]{3,31}$/.test(value) ? null : 'Invalid handle'),
    },
  });

  useEffect(() => {
    if (character) {
      form.setValues({
        handle: character.username || "",
        avatar: character.avatars?.[0].replace("https://gateway.ipfs.io/ipfs/", "ipfs://") || "",
        name: character.name || "",
        bio: character.bio || "",
      });
      setCharacterLoading(false);
    }
  }, [character]);

  const handleUpload = async (files: File[]) => {
    setAvatarLoading(true);
    try {
      const ipfsUri = await upload(files[0]);
      form.setFieldValue('avatar', "");
      setTimeout(() => {
        form.setFieldValue('avatar', ipfsUri);
      });
    } catch (e: any) { }
    setAvatarLoading(false);
  };

  const check = async () => {
    if (form.values.handle) {
      showNotification({
        message: 'This handle is available!',
        color: 'green',
        icon: <div className={"i-csb:check"} />
      });
      return;
    }
    try {
      const characters = await unidata.profiles.get({
        source: 'Crossbell Profile',
        identity: form.values.handle,
        platform: 'Crossbell',
      });

      if (characters?.list.length) {
        showNotification({
          message: 'Oops, this handle has already been taken...',
          color: 'red',
          icon: <div className={"i-csb:cross"}></div>
        });
        return false;
      } else {
        showNotification({
          message: 'This handle is available!',
          color: 'green',
          icon: <div className={"i-csb:check"} />
        });
        return true;
      }
    } catch (e) {
      showNotification({
        message: 'Sorry, unable to check validity at this moment.',
        color: 'red',
        icon: <div className={"i-csb:cross"} />
      });
      return false;
    }
  };

  const mint = useMutation(async () => {
    setCharacterLoading(true);
    try {
      let data = {
        ...(form.values.handle !== character?.username && { username: form.values.handle, }),
        ...(form.values.avatar !== character?.avatars?.[0] && { avatars: [form.values.avatar], }),
        ...(form.values.name !== character?.name && { name: form.values.name, }),
        ...(form.values.bio !== character?.bio && { bio: form.values.bio, }),
      }
      if (characterId) {
        await unidata.profiles.set(
          {
            source: 'Crossbell Profile',
            identity: characterId,
            platform: 'Crossbell',
            action: 'update',
          },
          data,
        );
      } else if (account?.address) {
        await unidata.profiles.set(
          {
            source: 'Crossbell Profile',
            identity: account.address,
            platform: 'Ethereum',
            action: 'add',
          },
          data,
        );
      }
    } catch (e) {
      showNotification({
        message: 'Failed to mint handle...',
        color: 'red',
        icon: <div className={"i-csb:cross"} />
      });
      console.log(e);
    }

    setCharacterLoading(false);
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries([...SCOPE_KEYS, "list", account?.address]);
      characterId && queryClient.invalidateQueries([...SCOPE_KEYS, "one", characterId]);
      queryClient.invalidateQueries([...SCOPE_KEYS, "primary", account?.address]);
    },
  });

  return (
    <>
      <p className="mb-8 mt-8">You are logged in as <b>{account?.address?.slice(0, 6)}...{account?.address?.slice(-4)}</b></p>
      <form className="relative" onSubmit={form.onSubmit((values) => console.log(values))}>
        <LoadingOverlay visible={characterLoading} />
        <Group className="mb-8">
          <div className="w-15 text-right">Handle</div>
          <TextInput
            className="flex-1"
            required
            styles={{
              input: {
                height: '3rem',
              },
            }}
            {...form.getInputProps('handle')}
          />
        </Group>

        <Group className="mb-8">
          <div className="w-15 text-right">Avatar</div>
          <div className="relative flex items-center flex-1">
            <LoadingOverlay visible={avatarLoading} />
            <Dropzone
              onDrop={handleUpload}
              accept={IMAGE_MIME_TYPE}
              radius={9999}
              padding={0}
              className="mr-4"
              styles={{
                root: {
                  border: 'none'
                },
              }}
            >
              {(status) => {
                return <div className="relative">
                  <Avatar className="h-16 w-16" src={form.values.avatar.replace("ipfs://", "https://gateway.ipfs.io/ipfs/")} />
                  <span className="absolute left-0 top-0 right-0 bottom-0 bg-black opacity-40 rounded-full"></span>
                  <span className="absolute left-0 top-0 right-0 bottom-0 text-center leading-16 text-5xl text-white">+</span>
                </div>
              }}
            </Dropzone>
            <TextInput
              className="flex-1"
              required
              styles={{
                input: {
                  height: '3rem',
                },
              }}
              {...form.getInputProps('avatar')}
            />
          </div>
        </Group>

        <Group className="mb-8">
          <div className="w-15 text-right">Name</div>
          <TextInput
            className="flex-1"
            styles={{
              input: {
                height: '3rem',
              },
            }}
            {...form.getInputProps('name')}
          />
        </Group>

        <Group className="mb-8">
          <div className="w-15 text-right">Bio</div>
          <Textarea
            className="flex-1"
            styles={{
              input: {
                height: '6rem',
              },
            }}
            {...form.getInputProps('bio')}
          />
        </Group>

        <Group position="right" mt="md">
          <Button
            variant="default"
            size="md"
            onClick={check}
          >
            Check Availability
          </Button>
          <Button
            type="submit"
            size="md"
            onClick={() => {
              mint.mutate()
            }}
          >I’ve decided</Button>
        </Group>
      </form>
    </>
  );
}
