"use client";

import Image from "next/image";
import { useState } from "react";
type ImageProps = {
  url: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
};

const ImageWithLoader = ({
  url,
  alt,
  width,
  height,
  className,
}: ImageProps) => {
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  return (
    <>
      {!imageLoaded && (
        <div
          className={`animate-pulse bg-gray-300 dark:bg-gray-700 absolute inset-0 w-full h-full`}
        />
      )}
      <Image
        src={url}
        alt={alt}
        className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 transition-opacity duration-500 ${
          imageLoaded ? "opacity-100" : "opacity-0"
        } ${className || ""}`}
        width={width}
        height={height}
        onLoad={() => setImageLoaded(true)}
      />
    </>
  );
};

export default ImageWithLoader;
