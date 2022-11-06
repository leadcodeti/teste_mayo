import Link from "next/link";
import styles from "./styles.module.scss";
import { IoMdAddCircleOutline } from "react-icons/io";

export default function Dashboard() {
  return (
    <div className={styles.backgroundDashboard}>
      <div className={styles.container}>
        <aside>
          <div className={styles.logoApp}>
            <img src="/images/logo-1.svg" alt="Logo MayoPlayer" />
          </div>
          <div className={styles.newVideo}>
            <button>
              <IoMdAddCircleOutline /> Novo vídeo
            </button>
          </div>
        </aside>
        <main></main>
      </div>
    </div>
  );
}
