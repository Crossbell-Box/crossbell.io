import Zoom_ from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
// import styles from "./zoom.module.css";

export default function Zoom({ children }: { children: React.ReactNode }) {
	return (
		<span
			// className={styles.zoom}
			onClick={(e) => e.stopPropagation()}
		>
			<Zoom_ wrapElement="span">{children}</Zoom_>
		</span>
	);
}
