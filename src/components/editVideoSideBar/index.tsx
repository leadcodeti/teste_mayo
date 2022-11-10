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
import { useState } from "react";
import Accordion from "react-bootstrap/Accordion";

export function EditVideoSideBar() {
  const [design, setDesign] = useState(false);

  return (
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
                <Accordion.Header className={styles.removeBorder}>
                  <BsPalette />
                  Design
                </Accordion.Header>
                <Accordion.Body className="p-0">
                  <div className={styles.design}>
                    <span>
                      <label htmlFor="corPrincipal">Cor principal</label>{" "}
                      <input
                        className={styles.colors}
                        type="color"
                        id="corPrincipal"
                        value="#ffffff"
                      />
                    </span>
                    <br />
                    <span>
                      <label htmlFor="corBackground">Cor background</label>{" "}
                      <input
                        className={styles.colors}
                        type="color"
                        id="corBackground"
                        // value="#ff003c"
                      />
                    </span>
                  </div>
                  <div className={styles.controls}>
                    <p>Controles</p>
                    <span>
                      <label htmlFor="botaoPlayGrande">Botão play grande</label>
                      <input id="botaoPlayGrande" type="checkbox" />
                    </span>

                    <span>
                      <label htmlFor="botaoPlayGrande">
                        Botão play pequeno
                      </label>
                      <input id="botaoPlayGrande" type="checkbox" />
                    </span>

                    <span>
                      <label htmlFor="botaoPlayGrande">
                        Barra de progresso
                      </label>
                      <input id="botaoPlayGrande" type="checkbox" />
                    </span>

                    <span>
                      <label htmlFor="botaoPlayGrande">Tempo de vídeo</label>
                      <input id="botaoPlayGrande" type="checkbox" />
                    </span>

                    <span>
                      <label htmlFor="botaoPlayGrande">Voltar 10s</label>
                      <input id="botaoPlayGrande" type="checkbox" />
                    </span>

                    <span>
                      <label htmlFor="botaoPlayGrande">Avançar 10s</label>
                      <input id="botaoPlayGrande" type="checkbox" />
                    </span>

                    <span>
                      <label htmlFor="botaoPlayGrande">Volume</label>
                      <input id="botaoPlayGrande" type="checkbox" />
                    </span>

                    <span>
                      <label htmlFor="botaoPlayGrande">Fullscreen</label>
                      <input id="botaoPlayGrande" type="checkbox" />
                    </span>
                  </div>
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="1">
                <Accordion.Header className={styles.removeBorder}>
                  <BsCardImage />
                  Thumbnails
                </Accordion.Header>
                <Accordion.Body className="p-0">
                  <div className={styles.design}>
                    <span>
                      <label htmlFor="corPrincipal">Cor principal</label>{" "}
                      <input
                        className={styles.colors}
                        type="color"
                        id="corPrincipal"
                        value="#ffffff"
                      />
                    </span>
                    <br />
                    <span>
                      <label htmlFor="corBackground">Cor background</label>{" "}
                      <input
                        className={styles.colors}
                        type="color"
                        id="corBackground"
                        // value="#ff003c"
                      />
                    </span>
                  </div>
                  <div className={styles.controls}>
                    <p>Controles</p>
                    <span>
                      <label htmlFor="botaoPlayGrande">Botão play grande</label>
                      <input id="botaoPlayGrande" type="checkbox" />
                    </span>

                    <span>
                      <label htmlFor="botaoPlayGrande">
                        Botão play pequeno
                      </label>
                      <input id="botaoPlayGrande" type="checkbox" />
                    </span>

                    <span>
                      <label htmlFor="botaoPlayGrande">
                        Barra de progresso
                      </label>
                      <input id="botaoPlayGrande" type="checkbox" />
                    </span>

                    <span>
                      <label htmlFor="botaoPlayGrande">Tempo de vídeo</label>
                      <input id="botaoPlayGrande" type="checkbox" />
                    </span>

                    <span>
                      <label htmlFor="botaoPlayGrande">Voltar 10s</label>
                      <input id="botaoPlayGrande" type="checkbox" />
                    </span>

                    <span>
                      <label htmlFor="botaoPlayGrande">Avançar 10s</label>
                      <input id="botaoPlayGrande" type="checkbox" />
                    </span>

                    <span>
                      <label htmlFor="botaoPlayGrande">Volume</label>
                      <input id="botaoPlayGrande" type="checkbox" />
                    </span>

                    <span>
                      <label htmlFor="botaoPlayGrande">Fullscreen</label>
                      <input id="botaoPlayGrande" type="checkbox" />
                    </span>
                  </div>
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="2">
                <Accordion.Header className={styles.removeBorder}>
                  <BsPlayCircle />
                  Autoplay
                </Accordion.Header>
                <Accordion.Body className="p-0">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Quisquam harum accusantium veniam tempore error consequatur
                  quaerat, cumque expedita, iusto optio quo, molestiae atque
                  ratione sint minus repudiandae? Repellendus, esse suscipit!
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="3">
                <Accordion.Header className={styles.removeBorder}>
                  <BsHourglass />
                  Fakebar
                </Accordion.Header>
                <Accordion.Body className="p-0">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Quisquam harum accusantium veniam tempore error consequatur
                  quaerat, cumque expedita, iusto optio quo, molestiae atque
                  ratione sint minus repudiandae? Repellendus, esse suscipit!
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="4">
                <Accordion.Header className={styles.removeBorder}>
                  <FiRepeat />
                  Continuar
                </Accordion.Header>
                <Accordion.Body className="p-0">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Quisquam harum accusantium veniam tempore error consequatur
                  quaerat, cumque expedita, iusto optio quo, molestiae atque
                  ratione sint minus repudiandae? Repellendus, esse suscipit!
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="5">
                <Accordion.Header className={styles.removeBorder}>
                  <BsHandIndexThumb />
                  Botões
                </Accordion.Header>
                <Accordion.Body className="p-0">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Quisquam harum accusantium veniam tempore error consequatur
                  quaerat, cumque expedita, iusto optio quo, molestiae atque
                  ratione sint minus repudiandae? Repellendus, esse suscipit!
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </>
        </div>
      </div>

      <div className={styles.myAccount}>
        <button>Minha conta</button>
        <button className={styles.exit}>Sair</button>
      </div>
    </aside>
  );
}
