import {
  createContext,
  ReactNode,
  useEffect,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useRef,
  RefObject,
  use,
} from "react";
import { useQuery } from "react-query";
import { useLocalStorage } from "usehooks-ts";
import { boolean } from "yup";
import { getAllVideos, getAutoPlayProps } from "../pages/api/get_functions";
import { VideoTypes } from "../types/types";
import { useVideoContext } from "./useContext";

interface LastTimeProps {
  currentTimeVideo: number;
}

interface AccordionProps {
  activeContinue?: boolean;
  activeFakeBar?: boolean;
  activeAutoPlay?: boolean;
  activeThumbNails?: boolean;
}

interface AutoplayerColors {
  autoplayBackgoundColor?: string | undefined;
  autoplayTextColor?: string | undefined;
  topText?: string | undefined;
  bottonText?: string | undefined;
}

interface AuthContextProps {
  setCurrentTimeVideo: Dispatch<SetStateAction<number>>;
  lastTimeWacth: LastTimeProps;
  getCurrentVideoTime: () => void;
  restartVideo: () => void;
  autoPlayVideo: () => void;
  playerRef: RefObject<HTMLVmPlayerElement>;
  isLoading: boolean;
  totalUserVideos: number;
  page: number;
  currentTimeVideo: number;
  setPage: Dispatch<SetStateAction<number>>;
  setActiveAccordion: Dispatch<SetStateAction<AccordionProps>>;
  setAutoPlayerColors: Dispatch<SetStateAction<AutoplayerColors>>;
  activeAccordion: AccordionProps;
  autoPlayerColors: AutoplayerColors;
  allVideo: VideoTypes[] | undefined;
  checkFakebar: boolean;
  setCheckFakebar: (value: boolean) => void;
}

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextProps);

export default function SideBarProvider({ children }: AuthProviderProps) {
  const { user, videosId } = useVideoContext();
  const playerRef = useRef<HTMLVmPlayerElement>(null);
  const [currentTimeVideo, setCurrentTimeVideo] = useState(1);
  const [lastTimeWacth, setLastWacth] = useLocalStorage<LastTimeProps>(
    "@keepWacth",
    { currentTimeVideo: 1 }
  );
  const [allVideo, setAllVideo] = useState<VideoTypes[] | undefined>([]);
  const [page, setPage] = useState(1);
  const [totalUserVideos, setTotalUserVideos] = useState(0);
  const [activeAccordion, setActiveAccordion] = useState({} as AccordionProps);
  const [autoPlayerColors, setAutoPlayerColors] = useState(
    {} as AutoplayerColors
  );
  const [checkFakebar, setCheckFakebar] = useState(false);

  const { data: videos, isLoading } = useQuery(["videos", user, page], () =>
    getAllVideos(user, page)
  );

  useEffect(() => {
    setAllVideo(videos);
    if (videos) {
      setTotalUserVideos(videos[0].total);
    }
  }, [videos]);

  function getCurrentVideoTime() {
    if (currentTimeVideo === 0) {
      setLastWacth(lastTimeWacth);
    } else {
      setLastWacth({ currentTimeVideo });
    }
  }

  const restartVideo = () => {
    const currentTimeVideo = 1;
    setLastWacth({ currentTimeVideo });
  };

  const autoPlayVideo = () => {
    playerRef.current?.play();
  };

  return (
    <AuthContext.Provider
      value={{
        getCurrentVideoTime,
        setCurrentTimeVideo,
        setActiveAccordion,
        currentTimeVideo,
        activeAccordion,
        autoPlayVideo,
        playerRef,
        lastTimeWacth,
        autoPlayerColors,
        setAutoPlayerColors,
        restartVideo,
        allVideo,
        isLoading,
        page,
        totalUserVideos,
        setPage,
        checkFakebar,
        setCheckFakebar,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useSideBarContext() {
  const new_context = useContext(AuthContext);
  return new_context;
}
