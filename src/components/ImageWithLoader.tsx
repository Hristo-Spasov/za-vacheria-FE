"use client";

import Image from "next/image";
import { useState } from "react";
type ImageProps = {
  url: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  roundedClass?: string;
};

const ImageWithLoader = ({
  url,
  alt,
  width,
  height,
  className,
  roundedClass,
}: ImageProps) => {
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  const handleImageLoad = () => {
    setTimeout(() => setImageLoaded(true), 6000);
  };

  return (
    <div className={`relative w-full h-full ${roundedClass}`}>
      {!imageLoaded && (
        <div className={`skeleton-loader ${roundedClass}`}>
          <div className="skeleton-shimmer" />
        </div>
      )}
      <Image
        src={url}
        alt={alt}
        className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105  ${
          imageLoaded ? "opacity-100" : "opacity-0"
        } ${className || ""} ${roundedClass}`}
        width={width}
        height={height}
        onLoad={handleImageLoad}
        // onLoad={() => setImageLoaded(true)}
      />
    </div>
  );
};

export default ImageWithLoader;
