import { default as NextImage, type ImageProps } from "next/future/image";
import { PropsWithChildren } from "react";

export default function Image({
  src,
  alt,
  width,
  height,
  ...props
}: PropsWithChildren<ImageProps>) {
  return (
    <NextImage
      // loader={myLoader}
      src={src}
      alt={alt}
      width={width}
      height={height}
      {...props}
    />
  );
}
