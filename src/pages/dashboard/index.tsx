import Link from "next/link";
import styles from "./styles.module.scss";
import { IoMdAddCircleOutline } from "react-icons/io";
import { BsCameraVideo, BsLock, BsInfoLg } from "react-icons/bs";
import { MyVideos } from "../../components/myVideos";
import { useState } from "react";
import { Security } from "../../components/security";

export default function Dashboard() {
  const [userOption, setUserOpction] = useState("");

  function activeUserVideos() {
    setUserOpction("videos");
  }

  function activeUserSecurity() {
    setUserOpction("security");
  }

  return (
    <div className={styles.backgroundDashboard}>
      <div className={styles.container}>
        <aside>
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
            <button>Minha conta</button>
            <button className={styles.exit}>Sair</button>
          </div>
        </aside>
        <main>
          {(() => {
            switch (userOption) {
              case "videos":
                return <MyVideos />;
              case "security":
                return <Security />;
              default:
                return <MyVideos />;
            }
          })()}
        </main>
      </div>
    </div>
  );
}
