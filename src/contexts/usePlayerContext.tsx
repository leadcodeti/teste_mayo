import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { embedVideo } from "../components/embedVideo/embed";
import { api } from "../services/api";
import { useVideoContext } from "./useContext";

interface contextProps {
  onGenerate: () => void;
  setBigPlay: Dispatch<SetStateAction<boolean>>;
  setSmalPlay: Dispatch<SetStateAction<boolean>>;
  setVolume: Dispatch<SetStateAction<boolean>>;
  setProgessBar: Dispatch<SetStateAction<boolean>>;
  setPlayTime: Dispatch<SetStateAction<boolean>>;
  setFullScrean: Dispatch<SetStateAction<boolean>>;
  setNextBtn: Dispatch<SetStateAction<boolean>>;
  setPrevBtn: Dispatch<SetStateAction<boolean>>;
  setBackgroundColor: Dispatch<SetStateAction<string>>;
  backgroundColor: string;
  bigPlay: boolean;
  smalPlay: boolean;
  volume: boolean;
  progressBar: boolean;
  nextBtn: boolean;
  prevBtn: boolean;
  playTime: boolean;
  fullScrean: boolean;
  embedString: string;
}

interface ProviderProps {
  children: ReactNode;
}

const context = createContext({} as contextProps);

export function ContextPlayerProvider({ children }: ProviderProps) {
  const { openModal, videosId } = useVideoContext();
  const [embedString, setString] = useState("");
  const [bigPlay, setBigPlay] = useState(true);
  const [smalPlay, setSmalPlay] = useState(true);
  const [volume, setVolume] = useState(true);
  const [progressBar, setProgessBar] = useState(true);
  const [playTime, setPlayTime] = useState(true);
  const [fullScrean, setFullScrean] = useState(true);
  const [nextBtn, setNextBtn] = useState(true);
  const [prevBtn, setPrevBtn] = useState(true);
  const [backgroundColor, setBackgroundColor] = useState("#ccc");

  const onGenerate = () => {
    openModal();
    const { jsIframe } = embedVideo({
      backgroundColor,
      bigPlay,
      smalPlay,
      volume,
      progressBar,
      playTime,
      fullScrean,
    });

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

  useEffect(() => {
    if (!videosId.currentVideoId) {
      return;
    }

    async function getDesign() {
      const response = await api.get(`/designs/${videosId.currentVideoId}`);
      setBackgroundColor(response.data.background_color);
    }

    async function getControls() {
      const response = await api.get(`/controls/${videosId.currentVideoId}`);
      setBigPlay(response.data.has_big_play_button);
      setSmalPlay(response.data.has_small_play_button);
      setVolume(response.data.has_volume);
      setFullScrean(response.data.has_fullscreen);
      setProgessBar(response.data.has_progress_bar);
      setPlayTime(response.data.has_video_duration);
      setNextBtn(response.data.has_foward_10_seconds);
      setPrevBtn(response.data.has_back_10_seconds);
    }
    getControls();
    getDesign();
  }, [videosId.currentVideoId, setBackgroundColor]);

  return (
    <context.Provider
      value={{
        embedString,
        onGenerate,
        bigPlay,
        setBigPlay,
        backgroundColor,
        setBackgroundColor,
        fullScrean,
        playTime,
        progressBar,
        setFullScrean,
        setPlayTime,
        setProgessBar,
        setNextBtn,
        setPrevBtn,
        setSmalPlay,
        setVolume,
        smalPlay,
        volume,
        nextBtn,
        prevBtn,
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
