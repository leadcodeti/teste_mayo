import { IoMdAddCircleOutline } from "react-icons/io";
import { BsCameraVideo, BsLock, BsInfoLg } from "react-icons/bs";
import Link from "next/link";
import styles from "./styles.module.scss";
import { UserOptionProps } from "../../types/types";

export function DashboardSideBar({ setUserOption }: UserOptionProps) {
  function activeUserVideos() {
    setUserOption("videos");
  }

  function activeUserSecurity() {
    setUserOption("security");
  }

  function activeUserAccount() {
    setUserOption("account");
  }

  return (
    <aside className={styles.aside}>
      <div className={styles.logoApp}>
        <img src="/images/logo-1.svg" alt="Logo MayoPlayer" />
      </div>
      <div className={styles.newVideo}>
        <button>
          <IoMdAddCircleOutline size={20} /> Novo vídeo
        </button>
      </div>
      <div className={styles.userOptions}>
        <Link href="#/videos" onClick={activeUserVideos}>
          <BsCameraVideo />
          Meus vídeos
        </Link>
        <Link href="#/security" onClick={activeUserSecurity}>
          <BsLock />
          Segurança
        </Link>
        <Link
          className={styles.help}
          target="_blank"
          href="https://mayoplayer.com/tutoriais"
        >
          <BsInfoLg />
          Ajuda e tutoriais
        </Link>
      </div>
      <div className={styles.myAccount}>
        <Link onClick={activeUserAccount} href="#/account">
          Minha conta
        </Link>
        <button className={styles.exit}>Sair</button>
      </div>
    </aside>
  );
}
