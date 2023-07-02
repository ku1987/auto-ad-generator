import Image from "next/image";

export const CopyIcon = () => {
  return (
    <Image
      src="/icons/copy-icon.svg"
      alt="Copy Icon"
      width={16}
      height={16}
      className="fill-gray-100 hover: fill-gray-300"
    />
  );
};
