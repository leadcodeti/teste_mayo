import styles from "./styles.module.scss";
import { MyVideos } from "../../components/myVideos";
import { useState } from "react";
import { Security } from "../../components/security";
import { DashboardSideBar } from "../../components/dashboardSideBar";

export default function Dashboard() {
  const [userOption, setUserOption] = useState("");

  return (
    <div className={styles.backgroundDashboard}>
      <div className={styles.container}>
        <DashboardSideBar setUserOption={setUserOption} />
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
