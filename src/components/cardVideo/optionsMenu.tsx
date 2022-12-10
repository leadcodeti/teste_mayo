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

interface OptionsProps {
  isOpen: boolean;
  videoId: string;
  currentVideoPlayerId: string;
}

export function OptionsMenu({
  isOpen,
  videoId,
  currentVideoPlayerId,
}: OptionsProps) {
  const { setCurrentVideo, user, getAllVideos } = useVideoContext();
  if (!isOpen) return null;

  function handleClick(currentVideoId: string, currentPlayerId: string) {
    setCurrentVideo({ currentVideoId, currentPlayerId });
    
    if(currentPlayerId && currentVideoId){
      localStorage.setItem("@myVideoPlayerId", JSON.stringify({currentVideoId,currentPlayerId}));
    }
  }

  async function deleteCurrentVideo(currentVideoId: string) {
    if (user) {
      await api.delete(`/videos/${currentVideoId}`);
    }
    toast.success("Video Removido!");
    getAllVideos();
  }

  return (
    <>
      {isOpen ? (
        <div className={styles.options}>
          <Link
            href="/editVideo"
            className={styles.links}
            onClick={() => handleClick(videoId, currentVideoPlayerId)}
          >
            <FaRegEdit />
            <span>Editar</span>
          </Link>
          <button className={styles.links}>
            <HiCodeBracket />
            <span>Incorporar</span>
          </button>
          <button className={styles.links}>
            <MdContentCopy />
            <span>Duplicar</span>
          </button>
          <Link href="" className={styles.links}>
            <BsGraphUp />
            <span>Analytics</span>
            <BsYoutube className={styles.youtubeIcon} />
          </Link>
          <button
            onClick={() => deleteCurrentVideo(videoId)}
            className={styles.links}
          >
            <FiTrash />
            <span>Excluir</span>
          </button>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
