const Header = () => {
  const handleLinkClick = (value: string) => {
    const paths = location.href.split("/");
    if (location.href.endsWith(".html")) {
      paths[paths.length - 1] = value === "" ? "index.html" : `${value}.html`;
    } else {
      paths[paths.length - 1] = value;
    }
    location.href = paths.join("/");
  };
  return (
    <header className="my-10">
      <nav>
        <ul className="flex space-x-6">
          <li
            onClick={(e) => {
              handleLinkClick("");
            }}
            className="cursor-pointer hover:text-slate-400"
          >
            Home
          </li>
          <li
            onClick={(e) => {
              handleLinkClick("text");
            }}
            className="cursor-pointer hover:text-slate-400"
          >
            Text
          </li>
          <li
            onClick={(e) => {
              handleLinkClick("image");
            }}
            className="cursor-pointer hover:text-slate-400"
          >
            Image
          </li>
          <li
            onClick={(e) => {
              handleLinkClick("image-variation");
            }}
            className="cursor-pointer hover:text-slate-400"
          >
            Image Variation
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
