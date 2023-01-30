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
import { boolean } from "yup";
import { getAllVideos, getAutoPlayProps, getThumbnails } from "../pages/api/get_functions";
import { ThumbnailDisplayTimeTypes, ThumbnailsTypes, ThumbnailTypes, VideoTypes } from "../types/types";
import { useVideoContext } from "./useContext";

interface LastTimeProps {
  currentTimeVideo:number;
}

interface AccordionProps {
  activeContinue?:boolean;
  activeFakeBar?:boolean;
  activeAutoPlay?:boolean;
  activeThumbNails?:boolean;
}

interface SwitchProps {
  saveContinue?:boolean;
  saveFakeBar?:boolean;
  saveAutoPlay?:boolean;
  saveThumbNails?:boolean;

  isLoading?: {
    Continue?:boolean;
    FakeBar?:boolean;
    AutoPlay?:boolean;
    ThumbNails?:boolean;
  };
}

interface AutoplayerColors {
  autoplayBackgoundColor?:string | undefined;
  autoplayTextColor?:string | undefined;
  topText?:string | undefined;
  bottonText?:string | undefined;
}

interface ContinueColors {
  continueBackgoundColor?:string | undefined;
  continueTextColor?:string | undefined;
  topText?:string | undefined;
  bottonText?:string | undefined;
  message?:string | undefined;
}

interface ThumbnailImageProps {
  startImage?:File | null;
  pauseImage?:File | null;
  finalImage?:File | null;
}

interface AuthContextProps {
  setCurrentTimeVideo:Dispatch<SetStateAction<number>>;
  lastTimeWacth: LastTimeProps ;
  getCurrentVideoTime:() => void,
  restartVideo:() => void,
  autoPlayVideo:() => void,
  playerRef: RefObject<HTMLVmPlayerElement>
  isLoading:boolean,
  totalUserVideos:number;
  page:number;
  currentTimeVideo:number;
  setPage:Dispatch<SetStateAction<number>>,
  setActiveAccordion:Dispatch<SetStateAction<AccordionProps>>,
  setAutoPlayerColors:Dispatch<SetStateAction<AutoplayerColors>>,
  setContinueColors:Dispatch<SetStateAction<ContinueColors>>,
  setThumbnailsProps: Dispatch<SetStateAction<ThumbnailTypes>>;
  setThumbnailsImages: Dispatch<SetStateAction<ThumbnailImageProps>>
  setSaveSwitch: Dispatch<SetStateAction<SwitchProps>>;
  setCheckFakebar: Dispatch<SetStateAction<boolean>>
  thumbnailsProps: ThumbnailTypes;
  thumbnailsImages: ThumbnailImageProps
  activeAccordion: AccordionProps;
  autoPlayerColors: AutoplayerColors;
  saveSwitch:SwitchProps;
  continueColors:ContinueColors;
  checkFakebar:boolean;
  allVideo: VideoTypes[] | undefined,
  allThumbsnails: ThumbnailsTypes[] | undefined
}

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextProps);

export default function SideBarProvider({ children }: AuthProviderProps) {
   
   const { user, videosId } = useVideoContext()
   const playerRef = useRef<HTMLVmPlayerElement>(null);
   const [currentTimeVideo, setCurrentTimeVideo] = useState(1)
   const [lastTimeWacth, setLastWacth] = useLocalStorage<LastTimeProps>('@keepWacth',{currentTimeVideo: 1})
   
   const [allVideo, setAllVideo] = useState<VideoTypes[] | undefined>([]);
   const [page, setPage] = useState(1);
   const [totalUserVideos, setTotalUserVideos] = useState(0);
   const [activeAccordion,setActiveAccordion] = useState({} as AccordionProps);
   const [autoPlayerColors, setAutoPlayerColors] = useState({} as AutoplayerColors)
   const [continueColors, setContinueColors] = useState({} as ContinueColors)
   const [thumbnailsProps, setThumbnailsProps] = useState({} as ThumbnailTypes);
   const [thumbnailsImages, setThumbnailsImages] = useState({} as ThumbnailImageProps);
   const [allThumbsnails, setAllThumbsnails] = useState<ThumbnailsTypes[] | undefined>([]);
   const [checkFakebar,setCheckFakebar] = useState<boolean>(false);
   const [saveSwitch,setSaveSwitch] = useState({} as SwitchProps)

   const { data: videos, isLoading } = useQuery(['videos', user,page],() => getAllVideos(user,page))
   const { data: thumbnails } = useQuery(["thumbnails", videosId.currentVideoId],
   () => getThumbnails(videosId.currentVideoId)
   );
  
   useEffect(() => {

    setAllVideo(videos)
    setAllThumbsnails(thumbnails)
    if(videos){
      setTotalUserVideos(videos[0].total)
    }

   }, [thumbnails, videos]);


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

  const autoPlayVideo = () => {
    playerRef.current?.play()
  };

  return (
    <AuthContext.Provider
      value={{
        getCurrentVideoTime,
        setCurrentTimeVideo,
        setActiveAccordion,
        currentTimeVideo,
        activeAccordion,
        setThumbnailsProps,
        thumbnailsProps,
        allThumbsnails,
        autoPlayVideo,
        playerRef,
        lastTimeWacth,
        autoPlayerColors,
        setAutoPlayerColors,
        setThumbnailsImages,
        saveSwitch,
        setSaveSwitch,
        thumbnailsImages,
        setContinueColors,
        checkFakebar,
        setCheckFakebar,
        continueColors,
        restartVideo,
        allVideo,
        isLoading,
        page,
        totalUserVideos,
        setPage,
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
