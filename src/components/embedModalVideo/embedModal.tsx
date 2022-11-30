import Modal from "react-modal";
import { FileJs, FileHtml } from "phosphor-react";
import { IoClose } from "react-icons/io5";
import { useVideoContext } from "../../contexts/useContext";
import { usePlayeContext } from "../../contexts/usePlayerContext";
import { customStyles } from "../../utils/modalConfig";
import styles from "./style.module.scss";
import { useState } from "react";

Modal.setAppElement("body");
export function EmbedModal() {
  const { closeModal, modalOpen } = useVideoContext();
  const {embedString} = usePlayeContext();
  const [activeEmbed, setActiveEmbed] = useState(false);

  function activeJsEmbed() {
    setActiveEmbed(false);
  }

  function activeIframeEmbed() {
    setActiveEmbed(true);
  }

  return (
    <>
      <Modal
        isOpen={modalOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        className={styles.content}
      >
        <div className={styles.embedContente}>
          <header>
            <div className={styles.footerUp}>
              <p>Recomendado</p>

              <button onClick={closeModal} className={styles.closeEmbed}>
                <IoClose />
              </button>
            </div>

            <div className={styles.optionsEmbed}>
              <button
                onClick={activeJsEmbed}
                className={
                  activeEmbed
                    ? `${styles.jsButtomDisabled}`
                    : `${styles.activeJsButtom}`
                }
              >
                <FileJs size={35} />
                <span>JS</span>
              </button>

              <button
                onClick={activeIframeEmbed}
                className={
                  activeEmbed
                    ? `${styles.activeIFrameButton}`
                    : `${styles.iFrameButtonDisabled}`
                }
              >
                <FileHtml size={35} />
                <span>Iframe</span>
              </button>
            </div>
          </header>

          <div className={styles.embedCodeContent}>
            {activeEmbed ? (
              <>
                <h3>Código do iFrame</h3>
                <div className={styles.embedCode}>
                  <p>{embedString}</p>
                </div>
              </>
            ) : (
              <>
                <h3>Código JS</h3>
                <div className={styles.embedCode}>
                  <p>{embedString}</p>
                </div>
              </>
            )}
          </div>

          <div onClick={closeModal} className={styles.footerEmbedButton}>
            <button>Fechar</button>
          </div>
        </div>
      </Modal>
    </>
  );
}
