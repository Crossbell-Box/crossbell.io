import "react-medium-image-zoom/dist/styles.css";

import { Platforms } from "@/platforms";
import { UnbindingModal } from "@/modals";

export default function PlatformsPage() {
	return (
		<>
			<UnbindingModal />
			<Platforms />
		</>
	);
}
