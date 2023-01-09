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
import { useLocalStorage } from 'usehooks-ts'
import { getAllVideos } from "../pages/api/get_functions";
import { VideoTypes } from "../types/types";
import { useVideoContext } from "./useContext";

interface LastTimeProps {
  currentTimeVideo:number;
}

interface AuthContextProps {
  setCurrentTimeVideo:Dispatch<SetStateAction<number>>;
  lastTimeWacth: LastTimeProps ;
  getCurrentVideoTime:() => void,
  restartVideo:() => void,
  playerRef: RefObject<HTMLVmPlayerElement>
  isLoading:boolean,
  totalUserVideos:number;
  page:number;
  setPage:Dispatch<SetStateAction<number>>,
  allVideo: VideoTypes[] | undefined,
}

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextProps);

export default function SideBarProvider({ children }: AuthProviderProps) {
   
   const { user } = useVideoContext()
   const playerRef = useRef<HTMLVmPlayerElement>(null);
   const [currentTimeVideo, setCurrentTimeVideo] = useState(1)
   const [lastTimeWacth, setLastWacth] = useLocalStorage<LastTimeProps>('@keepWacth',{currentTimeVideo: 1})
   const [allVideo, setAllVideo] = useState<VideoTypes[] | undefined>([]);
   const [page, setPage] = useState(1);
   const [totalUserVideos, setTotalUserVideos] = useState(0);

   const { data: videos, isLoading } = useQuery(['videos', user,page],() => getAllVideos(user,page))
   
   useEffect(() => {
    setAllVideo(videos)
    if(videos){
      setTotalUserVideos(videos[0].total)
    }
   }, [videos]);
 
  function getCurrentVideoTime() {
    if(currentTimeVideo === 0) {
      setLastWacth(lastTimeWacth)
    } else {
      setLastWacth({currentTimeVideo})
    }
  }

  const restartVideo = () => {
    const currentTimeVideo = 1
    setLastWacth({currentTimeVideo})
  };

  return (
    <AuthContext.Provider
      value={{
        getCurrentVideoTime,
        setCurrentTimeVideo,
        playerRef,
        lastTimeWacth,
        restartVideo,
        allVideo,
        isLoading,
        page,
        totalUserVideos,
        setPage
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
