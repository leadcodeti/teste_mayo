import { IoMdAddCircleOutline } from "react-icons/io";
import {
  BsCardImage,
  BsPlayCircle,
  BsArrowLeft,
  BsPalette,
  BsHourglass,
  BsHandIndexThumb,
} from "react-icons/bs";
import { FiRepeat } from "react-icons/fi";
import Link from "next/link";
import styles from "./styles.module.scss";
import Accordion from "react-bootstrap/Accordion";
import { Design } from "./components/design";
import { Thumbnails } from "./components/thumbnails";
import { AutoPlay } from "./components/autoPlay";
import { FakeBar } from "./components/fakeBar";
import { WatchAgain } from "./components/continuar";
import { Botoes } from "./components/botoes";
import { UserOptionProps } from "../../types/types";

export function EditVideoSideBar({ setUserOption }: UserOptionProps) {
  function activeUserAccount() {
    setUserOption("account");
  }

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
                <button>
                  <IoMdAddCircleOutline size={20} /> Novo vídeo
                </button>
              </div>
              <Link className={styles.backToDashboard} href="/dashboard">
                <BsArrowLeft /> Voltar
              </Link>
              <div className={styles.userOptions}>
                <>
                  <Accordion>
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>
                        <BsPalette />
                        Design
                      </Accordion.Header>
                      <Accordion.Body className="p-0">
                        <Design />
                      </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="1">
                      <Accordion.Header>
                        <BsCardImage />
                        Thumbnails
                      </Accordion.Header>
                      <Accordion.Body className="p-0">
                        <Thumbnails />
                      </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="2">
                      <Accordion.Header>
                        <BsPlayCircle />
                        Autoplay
                      </Accordion.Header>
                      <Accordion.Body className="p-0">
                        <AutoPlay />
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="3">
                      <Accordion.Header>
                        <BsHourglass />
                        Fakebar
                      </Accordion.Header>
                      <Accordion.Body className="p-0">
                        <FakeBar />
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="4">
                      <Accordion.Header>
                        <FiRepeat />
                        Continuar
                      </Accordion.Header>
                      <Accordion.Body className="p-0">
                        <WatchAgain />
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="5">
                      <Accordion.Header>
                        <BsHandIndexThumb />
                        Botões
                      </Accordion.Header>
                      <Accordion.Body className="p-0">
                        <Botoes />
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </>
              </div>
            </div>

            <div className={styles.myAccount}>
              <button onClick={activeUserAccount}>Minha conta</button>
              <button className={styles.exit}>Sair</button>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
