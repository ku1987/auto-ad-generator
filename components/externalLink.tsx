function IconExternalLink(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      fill="none"
      className="inline-block align-text-top w-4 ml-2"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      viewBox="0 0 24 24"
      {...props}
    >
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
    </svg>
  );
}

export default IconExternalLink;
