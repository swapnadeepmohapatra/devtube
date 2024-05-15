import React, { useContext } from "react";
import styles from "./index.module.css";
import { MdOutlineLogout, MdOutlinePublish } from "react-icons/md";
import { AuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

interface NavbarUserSectionProps {
  user: any;
}

function NavbarUserSection({ user }: NavbarUserSectionProps) {
  const { logout } = useContext(AuthContext);
  const router = useRouter();

  return (
    <div className={styles.navBarSection}>
      <MdOutlinePublish
        className={styles.icon}
        onClick={() => router.replace("/upload")}
      />
      <p>{user.name}</p>
      <MdOutlineLogout className={styles.icon} onClick={() => logout()} />
    </div>
  );
}

export default NavbarUserSection;
