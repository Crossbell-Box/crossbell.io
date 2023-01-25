import React from "react";
import { useDropzone } from "react-dropzone";
import { useRefCallback } from "@crossbell/util-hooks";
import classNames from "classnames";

import commonStyles from "../../../styles.module.css";
import styles from "./index.module.css";

const IMAGE_MIME = { "image/*": [] };

export type AvatarProps = {
	file: File | null;
	onSelect: (file: File | null) => void;
};

export function Avatar({ file, onSelect }: AvatarProps) {
	const previewURL = usePreviewFile(file);

	const onDrop = useRefCallback(([file]: File[]) => {
		onSelect(file ?? null);
	});

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: IMAGE_MIME,
		maxFiles: 1,
		maxSize: 2 * 1024 ** 2, // 2MB
	});

	return (
		<div
			{...getRootProps()}
			className={classNames(
				styles.container,
				isDragActive && styles.isActive,
				!previewURL && commonStyles.uxOverlay
			)}
		>
			<input {...getInputProps()} />

			{previewURL && (
				<img
					src={previewURL}
					alt={`Blurred ${file?.name}`}
					className={styles.bg}
				/>
			)}

			{previewURL ? (
				<img src={previewURL} alt={file?.name} className={styles.avatar} />
			) : (
				<span className={styles.tips}>
					{`Drag and drop \nor click to select an image`}
				</span>
			)}
		</div>
	);
}

function usePreviewFile(file: File | null) {
	const url = React.useMemo(() => file && URL.createObjectURL(file), [file]);

	React.useEffect(() => {
		return () => {
			if (url) {
				URL.revokeObjectURL(url);
			}
		};
	}, [url]);

	return url;
}
