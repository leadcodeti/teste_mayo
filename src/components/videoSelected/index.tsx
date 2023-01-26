import dynamic from "next/dynamic";
import { useCopyToClipboard } from "usehooks-ts";
import styles from "./styles.module.scss";
import { BsCodeSlash } from "react-icons/bs";
import { usePlayeContext } from "../../contexts/usePlayerContext";
import { FormEvent, useEffect, useState } from "react";
import { api } from "../../services/api";
import { useVideoContext } from "../../contexts/useContext";
import { BelowButon } from "../editVideoSideBar/components/botoes/belowButtons";
import { toast } from "react-toastify";
import { AiFillEdit } from "react-icons/ai";
import { useMutation, useQueryClient } from "react-query";
import { upDateVideoName } from "../../pages/api/post_put_functions";

const PlayerVideo = dynamic(() => import("./player"), {
  ssr: false,
});

export function VideoSelected() {
  const [copiedLink, copyLink] = useCopyToClipboard();
  const { onGenerate } = usePlayeContext();
  const [buttonProps, setButtonProps] = useState({
    background_color: "",
    background_hover: "",
    size: "",
    text: "",
    text_color: "",
    link: "",
  });

  const {
    currentVideo,
    belowButtonProps,
    setBelowButtonProps,
    isVisibleBelow,
    user,
    isVisibleButtonBelow,
    setIsVisibleButtonBelow,
    videosId,
  } = useVideoContext();

  const [editName, setEditName] = useState(false);
  const [newVideoName, setNewVideoName] = useState("");
  const queryClient = useQueryClient();

  const { mutate: videoNameMutation, data } = useMutation(upDateVideoName, {
    onSuccess: () => {
      queryClient.invalidateQueries("videos");
    },
  });

  function copyYouTubeLink() {
    copyLink(`youtube.com/embed/${videosId.currentPlayerId}`);
    toast.success("Copiado");
  }

  useEffect(() => {
    if (user) {
      api(`/cta_buttons/${videosId.currentVideoId}`).then((res) => {
        const data = res.data[0];
        setButtonProps({
          background_color: data.background_color,
          background_hover: data.background_hover,
          size: data.size,
          text: data.text,
          text_color: data.text_color,
          link: data.link,
        });
      });
    }
  }, [currentVideo.currentVideoId, user, videosId]);

  useEffect(() => {
    api(`/cta_buttons/${videosId.currentVideoId}`).then((res) => {
      const data = res.data;
      const belowFiltered = data.filter((e: any) => e.type === "below");
      const belowResult = belowFiltered[0];

      // setBelowButtonProps({
      //   background_color: belowResult.background_color,
      //   background_hover: belowResult.background_hover,
      //   size: belowResult.size,
      //   text: belowResult.text,
      //   text_color: belowResult.text_color,
      //   link: belowResult.link,
      //   is_visible: belowResult.is_visible,
      // });
    });
  }, [currentVideo.currentVideoId, setBelowButtonProps, videosId]);

  function editVideoName() {
    setEditName(!editName);
  }

  function onSubmitName(e: FormEvent) {
    e.preventDefault();
    videoNameMutation({
      videosId: {
        videoName: newVideoName,
        currentVideoId: videosId.currentVideoId,
      },
    });
    toast.success("Nome atualizado!");
    setEditName(!editName);
  }

  return (
    <div className={styles.container}>
      <div className={styles.detailsVideo}>
        <div className={styles.videoName}>
          {editName ? (
            <>
              <form onSubmit={onSubmitName}>
                <input
                  defaultValue={videosId.videoName}
                  onChange={(e) => setNewVideoName(e.target.value)}
                />
                <button type="submit">Salvar</button>
              </form>
            </>
          ) : (
            <>
              <h2>{videosId.videoName}</h2>
              <button className={styles.editBtnName} onClick={editVideoName}>
                <AiFillEdit />
              </button>
            </>
          )}
        </div>

        <button className={styles.embedBtn} onClick={onGenerate}>
          <BsCodeSlash size={18} /> Código de incorporação
        </button>
      </div>

      <strong>
        Link:
        <span title="Copiar link" onClick={copyYouTubeLink}>
          {`youtube.com/embed/${videosId.currentPlayerId}`}
        </span>
      </strong>
      <div className={styles.divisor}></div>

      <div className={styles.embedVideo}>
        <PlayerVideo />

        <div className={styles.buttonVideo}>
          {isVisibleButtonBelow ? <BelowButon /> : ""}
        </div>
      </div>
    </div>
  );
}
