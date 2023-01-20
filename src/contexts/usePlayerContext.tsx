import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useQuery } from "react-query";
import { embedVideo } from "../components/embedVideo/embed";
import { getControllers } from "../pages/api/get_functions";
import { api } from "../services/api";
import { ControlType } from "../types/types";
import { useVideoContext } from "./useContext";

interface contextProps {
  onGenerate: () => void;
  setBackgroundColor: Dispatch<SetStateAction<string | undefined>>;
  backgroundColor: string | undefined;
  embedString: string;
  bigPlay: ControlType,
  nextBtn:ControlType,
  playTime:ControlType,
  prevBtn:ControlType,
  fullScrean:ControlType,
  smalPlay:ControlType,
  volume:ControlType,
  progressBar:ControlType,

  setBigPlay:Dispatch<SetStateAction<ControlType>>;
  setSmalPlay:Dispatch<SetStateAction<ControlType>>;
  setVolume:Dispatch<SetStateAction<ControlType>>;
  setProgessBar:Dispatch<SetStateAction<ControlType>>;
  setPlayTime:Dispatch<SetStateAction<ControlType>>;
  setFullScrean:Dispatch<SetStateAction<ControlType>>;
  setNextBtn:Dispatch<SetStateAction<ControlType>>;
  setPrevBtn:Dispatch<SetStateAction<ControlType>>;
}

interface ProviderProps {
  children: ReactNode;
}

const context = createContext({} as contextProps);

export function ContextPlayerProvider({ children }: ProviderProps) {
  const { openModal, videosId } = useVideoContext();
  const [embedString, setString] = useState("");
  const [backgroundColor, setBackgroundColor] = useState<string | undefined>(
    ""
  );

  const { data: controll } = useQuery( ["controll", videosId.currentVideoId],() => getControllers(videosId.currentVideoId));

  const [bigPlay, setBigPlay] = useState({} as ControlType);
  const [smalPlay, setSmalPlay] =useState({} as ControlType);
  const [volume, setVolume] =useState({} as ControlType);
  const [progressBar, setProgessBar] =useState({} as ControlType);
  const [playTime, setPlayTime] =useState({} as ControlType);
  const [fullScrean, setFullScrean] =useState({} as ControlType);
  const [nextBtn, setNextBtn] =useState({} as ControlType);
  const [prevBtn, setPrevBtn] =useState({} as ControlType);



  useEffect(() => {
    setBigPlay({ isActive: controll?.has_big_play_button})
    setSmalPlay({ isActive: controll?.has_small_play_button})
    setVolume({ isActive:controll?.has_volume})
    setProgessBar({ isActive: controll?.has_progress_bar})
    setPlayTime({ isActive:controll?.has_video_duration})
    setFullScrean({ isActive:controll?.has_fullscreen})
    setNextBtn({ isActive: controll?.has_foward_10_seconds})
    setPrevBtn({ isActive:controll?.has_back_10_seconds,})
  }, [controll]);

  const onGenerate = () => {
    const controller = {
      bigPlay,
      nextBtn,
      playTime,
      fullScrean,
      prevBtn,
      progressBar,
      volume,
      smalPlay,
    }
    openModal();
    const { jsIframe } = embedVideo({ backgroundColor, controller });
    setString(getHtml(jsIframe));
  };

  const getHtml = (jsIframe: HTMLDivElement) => {
    if (!jsIframe) return "";

    var div,
      element = document.createElement("div");

    element.appendChild(jsIframe);
    div = element.innerHTML;
    return div;
  };

  return (
    <context.Provider
      value={{
        embedString,
        onGenerate,
        backgroundColor,
        setBackgroundColor,
        bigPlay,
        nextBtn,
        playTime,
        fullScrean,
        prevBtn,
        progressBar,
        volume,
        smalPlay,

        setBigPlay,
        setFullScrean,
        setNextBtn,
        setPlayTime,
        setPrevBtn,
        setProgessBar,
        setSmalPlay,
        setVolume
      }}
    >
      {children}
    </context.Provider>
  );
}

export function usePlayeContext() {
  const new_context = useContext(context);
  return new_context;
}
