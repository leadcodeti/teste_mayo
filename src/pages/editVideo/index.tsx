import { EditVideoSideBar } from "../../components/editVideoSideBar";
import { MyVideos } from "../../components/myVideos";
import { useState } from "react";
import styles from "./styles.module.scss";
import MyAccount from "../../components/myAccount";

export default function EditVideo() {
  const [userOption, setUserOption] = useState("");

  return (
    <div className={styles.backgroundDashboard}>
      <div className={styles.container}>
        <div>
          <EditVideoSideBar setUserOption={setUserOption} />
        </div>
        <main>
          {(() => {
            switch (userOption) {
              case "videos":
                return <MyVideos />;
              case "account":
                return <MyAccount />;
              default:
                return <MyVideos />;
            }
          })()}
        </main>
      </div>
    </div>
  );
}
