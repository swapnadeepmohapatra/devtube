import React from "react";
import styles from "./index.module.css";
import { MdAccountCircle } from "react-icons/md";

function LoginButton() {
  return (
    <button className={styles.loginButton}>
      <MdAccountCircle className={styles.accountIcon} />
      <p>Sign in</p>
    </button>
  );
}

export default LoginButton;
