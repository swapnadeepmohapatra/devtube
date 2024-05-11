"use client";
import React, { useContext } from "react";
import styles from "./index.module.css";
import { MdMenu } from "react-icons/md";
import DevTubeLogo from "@/icons/logo.svg";
import Image from "next/image";
import LoginButton from "@/components/LoginButton";
import SearchBar from "@/components/SearchBar";
import { AuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

function Navbar() {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarSection}>
        <MdMenu className={styles.menuIcon} />
        <div
          style={{ cursor: "pointer" }}
          onClick={() => {
            router.replace("/");
          }}
        >
          <Image src={DevTubeLogo} alt="DevTube" />
        </div>
      </div>
      <div className={styles.navbarSection}>
        <SearchBar />
      </div>
      <div className={styles.navbarSection}>
        {user ? <p>{user.name}</p> : <LoginButton />}
      </div>
    </nav>
  );
}

export default Navbar;
