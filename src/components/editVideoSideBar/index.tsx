/* eslint-disable @next/next/no-img-element */
import { IoMdAddCircleOutline } from "react-icons/io";
import {BsArrowLeft} from "react-icons/bs";
import Link from "next/link";
import styles from "./styles.module.scss";
import { UserOptionProps } from "../../types/types";
import { NewVideo } from "../newVideoModal";
import { useVideoContext } from "../../contexts/useContext";


import { signOut } from "../../contexts/useContext";
import { Accordions } from "./accordion/accordion";


export function EditVideoSideBar({ setUserOption }: UserOptionProps) {
  
  function activeUserAccount() {
    setUserOption("account");
  }

  const { openModalNewVideo } = useVideoContext();

  return (
    <>
      <div className={styles.sideBar}>
        <div className={styles.container}>
          <aside className={styles.aside}>
            <div className={styles.logoApp}>
              <img src="/images/logo-1.svg" alt="Logo MayoPlayer" />
            </div>
            <div className={styles.containerSidebar}>
              <div className={styles.newVideo}>
                <button onClick={openModalNewVideo}>
                  <IoMdAddCircleOutline size={20} /> Novo vídeo
                </button>
              </div>
              <NewVideo />
              <Link className={styles.backToDashboard} href="/dashboard">
                <BsArrowLeft /> Voltar
              </Link>
              <div className={styles.userOptions}>
                <Accordions />
              </div>
            </div>

            <div className={styles.myAccount}>
              <button onClick={activeUserAccount}>Minha conta</button>
              <button onClick={() => signOut()} className={styles.exit}>
                Sair
              </button>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
