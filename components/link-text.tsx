export const LinkText = ({ text, link }: { text: string; link: string }) => {
  return (
    <a
      className="text-slate-300 hover:text-slate-400 after:content-open-external-link-icon after:inline-block after:ml-0.5"
      target="_blank"
      href={link}
    >
      {text}
    </a>
  );
};
