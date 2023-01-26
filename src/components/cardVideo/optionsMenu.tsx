import { FaRegEdit } from "react-icons/fa";
import { MdContentCopy } from "react-icons/md";
import { HiCodeBracket } from "react-icons/hi2";
import { BsGraphUp, BsYoutube } from "react-icons/bs";
import { FiTrash } from "react-icons/fi";
import styles from "./styles.module.scss";
import Link from "next/link";
import { useVideoContext } from "../../contexts/useContext";
import { api } from "../../services/api";
import { toast } from "react-toastify";
import { useSideBarContext } from "../../contexts/thirdContext";
import { useEffect, useState } from "react";
import { AlertDeleteMessage } from "./alert/alert";
import { useRouter } from "next/router";
import { usePlayeContext } from "../../contexts/usePlayerContext";
import { useMutation, useQueryClient } from "react-query";
import { createVideo } from "../../pages/api/post_put_functions";
import { CreateVideoTypes, VideoTypes } from "../../types/types";
import { useLocalStorage } from "usehooks-ts";


interface OptionsProps {
  isOpen: boolean;
  videoId: string;
  videoName:string;
  currentVideoPlayerId: string;
  closeOptions:() => void;
  selectedVideo:VideoTypes;
}

export function OptionsMenu({ closeOptions, isOpen, videoId, currentVideoPlayerId,videoName,selectedVideo}: OptionsProps) {

  const { setCurrentVideo, } = useVideoContext();
  const { onGenerate } = usePlayeContext();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [deleteVideoId, setDeleteVideoId] = useState("");
  const router = useRouter()
  const queryClient = useQueryClient()


  const { mutate: videoMutation } = useMutation(({ name, url }:CreateVideoTypes) => createVideo({ name, url }),{
    onSuccess:() => {
      queryClient.invalidateQueries('videos');
    },
  });

  function openModal (currentVideoId: string) {
    setIsOpenModal(true)
    setDeleteVideoId(currentVideoId)
  }

  function closeModal() {
    setIsOpenModal(false)
  }

  function duplicateVideo(currentPlayerId: string, videoName: string) {
    videoMutation({name:videoName, url:`https://www.youtube.com/watch?v=${currentPlayerId}`});
    closeOptions()
    toast.success("Duplicando...");
  }

  // if (!isOpen) return null;

  function handleClick(currentVideoId: string, currentPlayerId: string, videoName: string, selectedVideo:VideoTypes) {
    setCurrentVideo({ currentVideoId, currentPlayerId });
    if(currentPlayerId && currentVideoId){
      localStorage.setItem("@myVideoPlayerId", JSON.stringify({currentVideoId,currentPlayerId,videoName}));
      router.push('../editVideo')
    }
  }

  return (
    <>
      {isOpen ? (
        <div className={styles.options}>
          <button
            className={styles.links}
            onClick={() => handleClick(videoId, currentVideoPlayerId,videoName, selectedVideo)}
          >
            <FaRegEdit />
            <span>Editar</span>
          </button>
          <button 
           onClick={onGenerate}
           className={styles.links}
          >
            <HiCodeBracket />
            <span>Incorporar</span>
          </button>
          <button 
            onClick={() =>duplicateVideo(currentVideoPlayerId,videoName)}
            className={styles.links}
          >
            <MdContentCopy />
            <span>Duplicar</span>
          </button>
          <Link href="" className={styles.links}>
            <BsGraphUp />
            <span>Analytics</span>
          </Link>
          <button
            onClick={() => openModal(videoId)}
            className={styles.links}
          >
            <FiTrash />
            <span>Excluir</span>
          </button>
        </div>
      ) : (
        ""
      )}

     <AlertDeleteMessage isOpenModal={isOpenModal} closeModal={closeModal} currentVideoId={deleteVideoId}/>
    </>
  );
}
