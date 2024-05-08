"use client";
import React from "react";
import styles from "./index.module.css";
import { MdAccountCircle } from "react-icons/md";
import { useRouter } from "next/navigation";

function LoginButton() {
  const router = useRouter();

  return (
    <button
      className={styles.loginButton}
      onClick={() => router.replace("/auth/signin")}
    >
      <MdAccountCircle className={styles.accountIcon} />
      <p>Sign in</p>
    </button>
  );
}

export default LoginButton;
