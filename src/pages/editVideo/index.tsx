import { EditVideoSideBar } from "../../components/editVideoSideBar";
import { useState } from "react";
import styles from "./styles.module.scss";
import MyAccount from "../../components/myAccount";
import { VideoSelected } from "../../components/videoSelected";

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
                return <VideoSelected />;
              case "account":
                return <MyAccount />;
              default:
                return <VideoSelected />;
            }
          })()}
        </main>
      </div>
    </div>
  );
}
