import Zoom_ from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import styles from "./Zoom.module.css";

export default function Zoom({ children }: { children: React.ReactNode }) {
	return (
		<div className={styles.zoom} onClick={(e) => e.stopPropagation()}>
			<Zoom_>{children}</Zoom_>
		</div>
	);
}
