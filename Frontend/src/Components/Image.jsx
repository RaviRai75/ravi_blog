import React from "react";
import { IKImage } from "imagekitio-react";

const Image = ({ src, className, w, h, alt }) => {
  // If src is an absolute URL (Clerk avatars, external images), use plain img
  if (!src) return null;

  const isAbsolute = src.startsWith("http://") || src.startsWith("https://");

  if (isAbsolute) {
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        width={w}
        height={h}
        loading="lazy"
      />
    );
  }

  return (
    <IKImage
      urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT}
      path={src}
      className={className}
      loading="lazy"
      lqip={{ active: true, quality: 20 }}
      alt={alt}
      width={w}
      height={h}
      transformation={[{ w, h }]}
    />
  );
};

export default Image;
