"use client";
import { useRouter } from "next/navigation";
import React from "react";
import styles from "./index.module.css";

interface RedirectLinkProps {
  location: string;
  text: string;
}

function RedirectLink({ location, text }: RedirectLinkProps) {
  const router = useRouter();
  return (
    <a onClick={() => router.replace(location)} className={styles.link}>
      {text}
    </a>
  );
}

export default RedirectLink;
