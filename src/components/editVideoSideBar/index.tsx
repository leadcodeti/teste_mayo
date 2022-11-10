import { IoMdAddCircleOutline } from "react-icons/io";
import {
  AiOutlineFileImage,
  AiOutlineExclamationCircle,
  AiOutlineQuestionCircle,
} from "react-icons/ai";

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
                  <div className={styles.thumbnails}>
                    <p className={styles.whatsThumbnails}>
                      <AiOutlineExclamationCircle /> O que são Thumbnails
                    </p>
                    <div className={styles.startThumbnail}>
                      <p>Thumbnail de início</p>
                      <label
                        className={styles.thumbnailsBox}
                        htmlFor="startThumbnail"
                      >
                        <AiOutlineFileImage />
                        Upload de imagem
                        <p>Clique ou arraste uma imagem</p>
                      </label>
                      <input id="startThumbnail" type="file" />
                      <hr />
                    </div>
                    <div className={styles.pauseThumbnail}>
                      <p>Thumbnail de Pause</p>
                      <label
                        className={styles.thumbnailsBox}
                        htmlFor="pauseThumbnail"
                      >
                        <AiOutlineFileImage />
                        Upload de imagem
                        <p>Clique ou arraste uma imagem</p>
                      </label>
                      <input id="pauseThumbnail" type="file" />
                      <hr />
                    </div>
                    <div className={styles.finalThumbnail}>
                      <p>Thumbnail de Final</p>
                      <label
                        className={styles.thumbnailsBox}
                        htmlFor="finalThumbnail"
                      >
                        <AiOutlineFileImage />
                        Upload de imagem
                        <p>Clique ou arraste uma imagem</p>
                      </label>
                      <input id="finalThumbnail" type="file" />
                    </div>
                    <div className={styles.saveOrCancel}>
                      <button>Cancelar</button>
                      <button>Salvar</button>
                    </div>
                  </div>
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="2">
                <Accordion.Header className={styles.removeBorder}>
                  <BsPlayCircle />
                  Autoplay
                </Accordion.Header>
                <Accordion.Body className="p-0">
                  <div className={styles.autoPLay}>
                    <p className={styles.whatsAutoPlay}>
                      <AiOutlineExclamationCircle /> O que é AutoPlay
                    </p>
                    <span>
                      <label htmlFor="corDoTexto">Cor do Texto</label>{" "}
                      <input
                        className={styles.colors}
                        type="color"
                        id="corDoTexto"
                        value="#ffffff"
                      />
                    </span>
                    <br />
                    <span>
                      <label htmlFor="corDobackground">Cor do background</label>{" "}
                      <input
                        className={styles.colors}
                        type="color"
                        id="corDobackground"
                        // value="#ff003c"
                      />
                    </span>

                    <hr />
                    <div className={styles.textStyles}>
                      <p>Texto Superior</p>
                      <textarea></textarea>
                      <hr />

                      <p>Texto Inferior</p>
                      <textarea></textarea>
                    </div>
                    <div className={styles.saveOrCancel}>
                      <button>Cancelar</button>
                      <button>Salvar</button>
                    </div>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="3">
                <Accordion.Header className={styles.removeBorder}>
                  <BsHourglass />
                  Fakebar
                </Accordion.Header>
                <Accordion.Body className="p-0">
                  <div className={styles.fakeBar}>
                    <p className={styles.whatsFakeBar}>
                      <AiOutlineExclamationCircle /> O que é fakeBar
                    </p>
                    <div className={styles.fakeBarRange}>
                      <label htmlFor="">Altura</label>
                      <input type="range" />
                      <p>
                        Variaveis de teste <AiOutlineExclamationCircle />
                      </p>
                      <span>
                        <input type="checkbox" />{" "}
                        <label htmlFor="">
                          Altura <AiOutlineQuestionCircle />
                        </label>
                      </span>
                      <span>
                        <input type="checkbox" />{" "}
                        <label htmlFor="">
                          Término <AiOutlineQuestionCircle />
                        </label>
                      </span>
                    </div>
                    <div className={styles.saveOrCancel}>
                      <button>Cancelar</button>
                      <button>Salvar</button>
                    </div>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="4">
                <Accordion.Header className={styles.removeBorder}>
                  <FiRepeat />
                  Continuar
                </Accordion.Header>
                <Accordion.Body className="p-0">
                  <div className={styles.watchAgain}>
                    <div className={styles.textStyles}>
                      <p>Mensagem</p>
                      <textarea></textarea>
                      <hr />

                      <p>Botão continuar</p>
                      <input type="text" />

                      <hr />

                      <p>Botão Recomeçar</p>
                      <input type="text" />
                      <hr />
                    </div>

                    <span>
                      <label htmlFor="corDoTexto">Cor do Texto</label>{" "}
                      <input
                        className={styles.colors}
                        type="color"
                        id="corDoTexto"
                        value="#ffffff"
                      />
                    </span>
                    <br />
                    <span>
                      <label htmlFor="corDobackground">Cor do background</label>{" "}
                      <input
                        className={styles.colors}
                        type="color"
                        id="corDobackground"
                        // value="#ff003c"
                      />
                    </span>
                    <div className={styles.saveOrCancel}>
                      <button>Cancelar</button>
                      <button>Salvar</button>
                    </div>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="5">
                <Accordion.Header className={styles.removeBorder}>
                  <BsHandIndexThumb />
                  Botões
                </Accordion.Header>
                <Accordion.Body className="p-0">
                  <div className={styles.buttons}>
                    <button>Adicionar novo botão</button>
                  </div>
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
