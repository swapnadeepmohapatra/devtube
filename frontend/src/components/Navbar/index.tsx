import React from "react";
import styles from "./index.module.css";
import { MdMenu } from "react-icons/md";
import DevTubeLogo from "@/icons/logo.svg";
import Image from "next/image";

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarSection}>
        <MdMenu className={styles.menuIcon} />
        <Image src={DevTubeLogo} alt="DevTube" />
      </div>
      <div className={styles.navbarSection}>Search</div>
      <div className={styles.navbarSection}>Login</div>
    </nav>
  );
}

export default Navbar;
