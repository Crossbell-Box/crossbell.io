import { PropsWithChildren, useEffect } from "react";
import { useCharacter } from "@/utils/apis/indexer";
import { TextInput, Button, Group, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { Dropzone, DropzoneStatus, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import Avatar from "@/components/common/Avatar";

export default function CharacterManagement({
  characterId,
}: PropsWithChildren<
  {
    characterId?: string;
  }
>) {
  const { data: character } = useCharacter(characterId || "");

  const form = useForm({
    initialValues: {
      handle: "",
      avatar: "",
      name: "",
      bio: "",
    },

    validate: {
      handle: (value) => ((!value || /^[a-z0-9_\\-]{3,31}$/.test(value)) ? null : 'Invalid handle'),
    },
  });

  useEffect(() => {
    if (character) {
      form.setValues({
        handle: character.username || "",
        avatar: character.avatars?.[0] || "",
        name: character.name || "",
        bio: character.bio || "",
      });
    }
  }, [character]);

  return (
    <div>
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
          <Group className="mb-8">
            <div className="w-15 text-right">Handle</div>
            <TextInput
              className="flex-1"
              required
              {...form.getInputProps('handle')}
            />
          </Group>
        
          <Group className="mb-8">
            <div className="w-15 text-right">Avatar</div>
            <Dropzone
              onDrop={(files) => console.log('accepted files', files)}
              accept={IMAGE_MIME_TYPE}
              radius={9999}
              padding={0}
              styles={{
                root: {
                  border: 'none'
                },
              }}
            >
            {(status) => {
              return <div className="relative">
                <Avatar className="h-16 w-16" src={form.values.avatar} />
                <span className="absolute left-0 top-0 right-0 bottom-0 bg-black opacity-40 rounded-full"></span>
                <span className="absolute left-0 top-0 right-0 bottom-0 text-center leading-16 text-5xl text-white">+</span>
              </div>
            }}
            </Dropzone>
            <TextInput
              className="flex-1"
              required
              {...form.getInputProps('avatar')}
            />
          </Group>

          <Group className="mb-8">
            <div className="w-15 text-right">Name</div>
            <TextInput
              className="flex-1"
              {...form.getInputProps('name')}
            />
          </Group>

          <Group className="mb-8">
            <div className="w-15 text-right">Bio</div>
            <Textarea
              className="flex-1"
              {...form.getInputProps('bio')}
            />
          </Group>

          <Group position="right" mt="md">
            <Button type="submit">Submit</Button>
          </Group>
        </form>
    </div>
  );
}
