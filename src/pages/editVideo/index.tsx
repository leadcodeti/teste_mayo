import { DashboardSideBar } from "../../components/dashboardSideBar";
import { EditVideoSideBar } from "../../components/editVideoSideBar";
import { MyVideos } from "../../components/myVideos";
import styles from "./styles.module.scss";

export default function EditVideo() {
  return (
    <div className={styles.backgroundDashboard}>
      <div className={styles.container}>
        <EditVideoSideBar />
        <main>
          <MyVideos />
        </main>
      </div>
    </div>
  );
}
