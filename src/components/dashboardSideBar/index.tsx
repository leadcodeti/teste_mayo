import { IoMdAddCircleOutline } from "react-icons/io";
import { BsCameraVideo, BsLock, BsInfoLg } from "react-icons/bs";
import Link from "next/link";
import styles from "./styles.module.scss";
import { UserOptionProps } from "../../types/types";
import { NewVideo } from "../newVideoModal";
import { useVideoContext } from "../../contexts/useContext";

import { signOut } from "../../contexts/useContext";
import { sign } from "crypto";

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

  const { openModalNewVideo } = useVideoContext();

  return (
    <aside className={styles.aside}>
      <div className={styles.logoApp}>
        <img src="/images/logo-1.svg" alt="Logo MayoPlayer" />
      </div>
      <div className={styles.newVideo}>
        <button onClick={openModalNewVideo}>
          <IoMdAddCircleOutline size={20} /> Novo vídeo
        </button>
      </div>
      <NewVideo />
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
      <div>
        <div className={styles.myAccount}>
          <Link onClick={activeUserAccount} href="#/account">
            Minha conta
          </Link>
          <button onClick={() => signOut()} className={styles.exit}>
            Sair
          </button>
        </div>
      </div>
    </aside>
  );
}
