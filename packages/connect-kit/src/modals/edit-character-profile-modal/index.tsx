import { EditCharacterProfile } from "./scenes/edit-character-profile";
import { createDynamicScenesModal } from "../../components";

export const {
	useModal: useEditCharacterProfileModal,
	showModal: showEditCharacterProfileModal,
} = createDynamicScenesModal("edit-character-profile", {
	kind: "edit-character-profile",
	Component: EditCharacterProfile,
});
