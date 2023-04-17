import Image from "next/image";
import Link from "next/link";

import ContactLogo from "../../assets/images/icons/contactLogo.png";

const NavBar = () => {
  return (
    <div className="navbar bg-neutral text-neutral-content">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost normal-case text-xl">
          <Image src={ContactLogo} alt="contact-logo" width="30" />
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href="/">
              <span>🔍</span> View All Contacts
            </Link>
          </li>
          <li>
            <Link href="/add-contact">
              <span>✏️ </span>New Contact
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
