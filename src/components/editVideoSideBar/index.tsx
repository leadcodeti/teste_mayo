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
import { NewVideo } from "../newVideoModal";
import { useVideoContext } from "../../contexts/useContext";
import stylesSwitch from "./switch.module.scss";

import { signOut } from "../../contexts/useContext";
import { CSpinner } from "@coreui/react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getDesign } from "../../pages/api/get_functions";
import { putDesign } from "../../pages/api/post_put_functions";
import { LoadingScrean } from "../loading/loading";

interface PutDesignTypes {
  currentVideoId:string;
  newDesignData: {
    background_color: string;
  }
}


export function EditVideoSideBar({ setUserOption }: UserOptionProps) {
  
  const queryClient = useQueryClient()
  const { videosId } = useVideoContext();
  
  const { data: design, isLoading } = useQuery(['design', videosId.currentVideoId],() => getDesign(videosId.currentVideoId))
  
  const { mutateAsync: designMutation } = useMutation(putDesign,{
    onSuccess: () => {
      queryClient.invalidateQueries('design')
    },
  })

  function activeUserAccount() {
    setUserOption("account");
  }

  const {
    openModalNewVideo,
    continueIsVisible,
    fakeBarIsVibiles,
    hasFakeBar,
    hasContinue,
    autoPlayIsVisible,
    hasAutoPlay,
    hasThumbNails,
    thumbnailsIsVisible,
  } = useVideoContext();

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
                <button onClick={openModalNewVideo}>
                  <IoMdAddCircleOutline size={20} /> Novo vídeo
                </button>
              </div>
              <NewVideo />
              <Link className={styles.backToDashboard} href="/dashboard">
                <BsArrowLeft /> Voltar
              </Link>
              <div className={styles.userOptions}>
                <>
                  <Accordion>
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>
                        <div className={stylesSwitch.container}>
                          <span className={stylesSwitch.content}>
                            <BsPalette />
                            Design
                          </span>
                          {isLoading && ( <LoadingScrean color="#ff003c" fontSize={0.7} size="sm" />)}
                        </div>
                      </Accordion.Header>
                      <Accordion.Body className="p-0">
                        <Design design={design} designMutation={designMutation}/>
                      </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="1">
                      <Accordion.Header>
                        <div className={stylesSwitch.container}>
                          <span className={stylesSwitch.content}>
                            <BsCardImage />
                            Thumbnails
                          </span>
                          <label className={stylesSwitch.switch}>
                            <input
                              onClick={() => thumbnailsIsVisible()}
                              type="checkbox"
                              checked={hasThumbNails}
                            />
                            <span
                              className={`${stylesSwitch.slider} ${stylesSwitch.round}`}
                            ></span>
                          </label>
                        </div>
                      </Accordion.Header>
                      <Accordion.Body className="p-0">
                        <Thumbnails />
                      </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="2">
                      <Accordion.Header>
                        <div className={stylesSwitch.container}>
                          <span className={stylesSwitch.content}>
                            <BsPlayCircle />
                            Autoplay
                          </span>
                          <label className={stylesSwitch.switch}>
                            <input
                              onClick={() => autoPlayIsVisible()}
                              type="checkbox"
                              checked={hasAutoPlay}
                            />

                            <span
                              className={`${stylesSwitch.slider} ${stylesSwitch.round}`}
                            ></span>
                          </label>
                        </div>
                      </Accordion.Header>
                      <Accordion.Body className="p-0">
                        <AutoPlay />
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="3">
                      <Accordion.Header>
                        <div className={stylesSwitch.container}>
                          <span className={stylesSwitch.content}>
                            <BsHourglass />
                            Fakebar
                          </span>
                          <label className={stylesSwitch.switch}>
                            <input
                              onClick={() => fakeBarIsVibiles()}
                              type="checkbox"
                              checked={hasFakeBar}
                            />
                            <span
                              className={`${stylesSwitch.slider} ${stylesSwitch.round}`}
                            ></span>
                          </label>
                        </div>
                      </Accordion.Header>
                      <Accordion.Body className="p-0">
                        <FakeBar />
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="4">
                      <Accordion.Header>
                        <div className={stylesSwitch.container}>
                          <span className={stylesSwitch.content}>
                            <FiRepeat />
                            Continuar
                          </span>
                          <label className={stylesSwitch.switch}>
                            <input
                              onClick={() => continueIsVisible()}
                              type="checkbox"
                              checked={hasContinue}
                            />
                            <span
                              className={`${stylesSwitch.slider} ${stylesSwitch.round}`}
                            ></span>
                          </label>
                        </div>
                      </Accordion.Header>
                      <Accordion.Body className="p-0">
                        <WatchAgain />
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="5">
                      <Accordion.Header>
                        <div className={stylesSwitch.container}>
                          <span className={stylesSwitch.content}>
                            <BsHandIndexThumb />
                            Botões
                          </span>
                        </div>
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
              <button onClick={() => signOut()} className={styles.exit}>
                Sair
              </button>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
