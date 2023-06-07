import React from "react";
import * as Dropzone from "react-dropzone";
import { useRefCallback } from "@crossbell/util-hooks";
import classNames from "classnames";

import commonStyles from "../../../styles.module.css";
import styles from "./index.module.css";
import { useGetWeb2Url } from "@crossbell/ui";

const IMAGE_MIME = { "image/*": [] };

export type AvatarProps = {
	file: string | File | null;
	onSelect: (file: string | File | null) => void;
};

export function Avatar({ file, onSelect }: AvatarProps) {
	const previewURL = usePreviewFile(file);

	const onDrop = useRefCallback(([file]: File[]) => {
		onSelect(file ?? null);
	});

	const { getRootProps, getInputProps, isDragActive } = Dropzone.useDropzone({
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
				<img src={previewURL} alt={`Blurred Avatar`} className={styles.bg} />
			)}

			{previewURL ? (
				<img src={previewURL} alt="Avatar" className={styles.avatar} />
			) : (
				<Placehoder />
			)}
		</div>
	);
}

function usePreviewFile(file: string | File | null) {
	const getWeb2Url = useGetWeb2Url();
	const url = React.useMemo(
		() =>
			file
				? typeof file === "string"
					? getWeb2Url(file)
					: URL.createObjectURL(file)
				: null,
		[file, getWeb2Url]
	);

	React.useEffect(() => {
		return () => {
			if (url && typeof file !== "string") {
				URL.revokeObjectURL(url);
			}
		};
	}, [url]);

	return url;
}

function Placehoder() {
	return (
		<svg
			width="48"
			height="48"
			viewBox="0 0 48 48"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<circle cx="24" cy="24" r="24" fill="rgb(var(--color-153_153_153))" />
			<g clipPath="url(#clip0_5447_19662)">
				<path
					d="M23.85 24C27.6848 24 30.7928 20.9111 30.7928 17.1C30.7928 13.2888 27.6848 10.2 23.85 10.2C20.0151 10.2 16.9071 13.2888 16.9071 17.1C16.9071 20.9111 20.0151 24 23.85 24ZM28.71 25.725H27.8041C26.6 26.2748 25.2602 26.5875 23.85 26.5875C22.4397 26.5875 21.1054 26.2748 19.8958 25.725H18.99C14.9653 25.725 11.7 28.9701 11.7 32.97V35.2125C11.7 36.641 12.8661 37.8 14.3035 37.8H33.3964C34.8338 37.8 36 36.641 36 35.2125V32.97C36 28.9701 32.7346 25.725 28.71 25.725Z"
					fill="rgb(var(--color-250_252_255))"
				/>
			</g>
			<defs>
				<clipPath id="clip0_5447_19662">
					<rect
						width="24.3"
						height="27.6"
						fill="white"
						transform="translate(11.7 10.2)"
					/>
				</clipPath>
			</defs>
		</svg>
	);
}
