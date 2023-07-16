import IconExternalLink from "./externalLink";

export const LinkText = ({ text, link }: { text: string; link: string }) => {
  return (
    <a
      className="text-slate-300 hover:text-slate-400"
      target="_blank"
      href={link}
    >
      {text}
      <IconExternalLink />
    </a>
  );
};
