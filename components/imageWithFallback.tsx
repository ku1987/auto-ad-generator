import { useEffect, useState } from "react";
import Image from "next/image";

export const ImageWithFallback = ({ src, ...props }: any) => {
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    setError(null);
  }, []);

  return (
    <Image
      alt="generated image"
      onError={setError}
      src={error ? "/placeholder.png" : src}
      {...props}
    />
  );
};
