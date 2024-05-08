import React from "react";
import styles from "./index.module.css";
import { MdMenu } from "react-icons/md";
import DevTubeLogo from "@/icons/logo.svg";
import Image from "next/image";
import LoginButton from "@/components/LoginButton";
import SearchBar from "@/components/SearchBar";

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarSection}>
        <MdMenu className={styles.menuIcon} />
        <Image src={DevTubeLogo} alt="DevTube" />
      </div>
      <div className={styles.navbarSection}>
        <SearchBar />
      </div>
      <div className={styles.navbarSection}>
        <LoginButton />
      </div>
    </nav>
  );
}

export default Navbar;
