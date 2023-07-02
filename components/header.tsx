import Link from "next/link";

const Header = () => {
  return (
    <header className="my-10">
      <nav>
        <ul className="flex space-x-4">
          <li>
            <Link className="hover:text-slate-400" href="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="hover:text-slate-400" href="/text">
              Text
            </Link>
          </li>
          <li>
            <Link className="hover:text-slate-400" href="/image">
              Image
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
