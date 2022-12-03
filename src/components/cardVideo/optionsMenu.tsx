import { FaRegEdit } from "react-icons/fa";
import{ MdContentCopy } from "react-icons/md";
import { HiCodeBracket } from "react-icons/hi2";
import { BsGraphUp, BsYoutube} from "react-icons/bs";
import{ FiTrash } from "react-icons/fi";
import styles from "./styles.module.scss";
import Link from "next/link";
import { useVideoContext } from "../../contexts/useContext";

interface OptionsProps {
  isOpen: boolean;
  videoId: string;
  currentVideoPlayerId:string
}

export function OptionsMenu({ isOpen,videoId, currentVideoPlayerId }: OptionsProps) {

  const { setCurrentVideo} = useVideoContext();
  if (!isOpen) return null;

  function handleClick(currentVideoId:string, currentPlayerId: string) {
    setCurrentVideo({currentVideoId,currentPlayerId});
  }

  return (
    <>
      {isOpen ? (
        <div className={styles.options}>
          <Link href="/editVideo" className={styles.links} onClick={() => handleClick(videoId,currentVideoPlayerId)}>
            <FaRegEdit />
            <span>Editar</span>
          </Link>
          <Link href="" className={styles.links}>
            <HiCodeBracket />
            <span>Incorporar</span>
          </Link>
          <Link href="" className={styles.links}>
            <MdContentCopy />
            <span>Duplicar</span>
          </Link>
          <Link href="" className={styles.links}>
            <BsGraphUp />
            <span>Analytics</span>
            <BsYoutube  className={styles.youtubeIcon}/>
          </Link>
          <Link href="" className={styles.links}>
            <FiTrash />
            <span>Excluir</span>
          </Link>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
