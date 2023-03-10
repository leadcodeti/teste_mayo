import styles from "./styles.module.scss";
import { MyVideos } from "../../components/myVideos";
import { useState } from "react";
import { Security } from "../../components/security";
import { DashboardSideBar } from "../../components/dashboardSideBar";
import MyAccount from "../../components/myAccount";

export default function Dashboard() {
  const [userOption, setUserOption] = useState("");

  return (
    <>
      <div className={styles.sideBar}>
        <div className={styles.container}>
          <DashboardSideBar setUserOption={setUserOption} />
        </div>
      </div>
      <main className={styles.main}>
        {(() => {
          switch (userOption) {
            case "videos":
              return <MyVideos />;
            case "security":
              return <Security />;
            case "account":
              return <MyAccount />;
            default:
              return <MyVideos />;
          }
        })()}
      </main>
    </>
  );
}
