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

  backgroundColorInsideButton: string | undefined;
  setBackgroundColorInsideButton: Dispatch<SetStateAction<string | undefined>>;
  textInsideButton: string | undefined;
  setTextInsideButton: Dispatch<SetStateAction<string | undefined>>;
  sizeInsideButton: string | undefined;
  setSizeInsideButton: Dispatch<SetStateAction<string | undefined>>;
  textBelowButton: string | undefined;
  setTextBelowButton: Dispatch<SetStateAction<string | undefined>>;
  textColorInsideButton: string | undefined;
  backgroundHoverInsideButton: string | undefined;
  setBackgroundHoverInsideButton: Dispatch<SetStateAction<string | undefined>>;
  setTextColorInsideButton: Dispatch<SetStateAction<string | undefined>>;
  backgroundColorBelowButton: string | undefined;
  setBackgroundColorBelowButton: Dispatch<SetStateAction<string | undefined>>;
  textColorBelowButton: string | undefined;
  backgroundHoverBelowButton: string | undefined;
  setBackgroundHoverBelowButton: Dispatch<SetStateAction<string | undefined>>;
  setTextColorBelowButton: Dispatch<SetStateAction<string | undefined>>;

  watchVideoTime: number | undefined;
  setWatchVideoTime: any;
  totalDuration: number;
  setTotalDuration: any;
  htmlCustom: string;
  setHtmlCustom: (value: string) => void;
  htmlCustomTimer: { start: number; end: number };
  setHtmlCustomTimer: (value: { start: number; end: number }) => void;
  valueInMinutes: number;
  setValueInMinutes: (value: number) => void;
  resultInsideProps: { start: number; end: number };
  setResultInsideProps: (value: { start: number; end: number }) => void;
  startTimerSeconds: number;
  setStartTimerSeconds: (value: number) => void;
  endTimerSeconds: number;
  setEndTimerSeconds: (value: number) => void;
  bellowButtonsValues: { text: string; link: string };
  setBellowButtonsValues: any;
  changeDuration: number;
  setChangeDuration: Dispatch<SetStateAction<number>>;
}

interface ProviderProps {
  children: ReactNode;
}

const context = createContext({} as contextProps);

export function ContextPlayerProvider({ children }: ProviderProps) {
  const { openModal, videosId } = useVideoContext();
  const [embedString, setString] = useState("");
  const [backgroundColor, setBackgroundColor] = useState<string | undefined>("");

  const [bigPlay, setBigPlay] = useState({} as ControlType);
  const [smalPlay, setSmalPlay] =useState({} as ControlType);
  const [volume, setVolume] =useState({} as ControlType);
  const [progressBar, setProgessBar] =useState({} as ControlType);
  const [playTime, setPlayTime] =useState({} as ControlType);
  const [fullScrean, setFullScrean] =useState({} as ControlType);
  const [nextBtn, setNextBtn] =useState({} as ControlType);
  const [prevBtn, setPrevBtn] =useState({} as ControlType);

  const { data: controll } = useQuery( ["controll", videosId.currentVideoId],() => getControllers(videosId.currentVideoId));
  const [changeDuration, setChangeDuration] = useState<number>(0);

  const [backgroundColorBelowButton, setBackgroundColorBelowButton] = useState<string | undefined>("");
  const [textColorBelowButton, setTextColorBelowButton] = useState<string | undefined>("");
  const [backgroundHoverBelowButton, setBackgroundHoverBelowButton] = useState<string | undefined>("");

  const [textInsideButton, setTextInsideButton] = useState<string | undefined>("");
  const [sizeInsideButton, setSizeInsideButton] = useState<string | undefined>("");
  const [textBelowButton, setTextBelowButton] = useState<string | undefined>("");

  const [backgroundColorInsideButton, setBackgroundColorInsideButton] =useState<string | undefined>("");
  const [textColorInsideButton, setTextColorInsideButton] = useState<string | undefined>("");
  const [backgroundHoverInsideButton, setBackgroundHoverInsideButton] = useState<string | undefined>("");

  const [watchVideoTime, setWatchVideoTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [valueInMinutes, setValueInMinutes] = useState(0);
  const [bellowButtonsValues, setBellowButtonsValues] = useState({text: "",link: "",});
  const [startTimerSeconds, setStartTimerSeconds] = useState(0);
  const [endTimerSeconds, setEndTimerSeconds] = useState(0);
  const [resultInsideProps, setResultInsideProps] = useState({start: 0,end: 0});

  const [htmlCustomTimer, setHtmlCustomTimer] = useState({start: 0,end: 0});
  const [htmlCustom, setHtmlCustom] = useState("");


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
        setVolume,

        watchVideoTime,
        setWatchVideoTime,
        totalDuration,
        setTotalDuration,
        htmlCustom,
        setHtmlCustom,
        htmlCustomTimer,
        setHtmlCustomTimer,
        bellowButtonsValues,
        setBellowButtonsValues,
        valueInMinutes,
        setValueInMinutes,
        resultInsideProps,
        setResultInsideProps,
        startTimerSeconds,
        setStartTimerSeconds,
        endTimerSeconds,
        setEndTimerSeconds,
        backgroundColorInsideButton,
        setBackgroundColorInsideButton,
        textColorInsideButton,
        setTextColorInsideButton,
        backgroundHoverInsideButton,
        setBackgroundHoverInsideButton,
        backgroundColorBelowButton,
        setBackgroundColorBelowButton,
        backgroundHoverBelowButton,
        setBackgroundHoverBelowButton,
        textColorBelowButton,
        setTextColorBelowButton,
        textInsideButton,
        setTextInsideButton,
        changeDuration,
        setChangeDuration,
        textBelowButton,
        setTextBelowButton,
        setSizeInsideButton,
        sizeInsideButton,
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
