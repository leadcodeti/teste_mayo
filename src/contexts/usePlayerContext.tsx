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
  bigPlay: ControlType;
  nextBtn: ControlType;
  playTime: ControlType;
  prevBtn: ControlType;
  fullScrean: ControlType;
  smalPlay: ControlType;
  volume: ControlType;
  progressBar: ControlType;

  setBigPlay: Dispatch<SetStateAction<ControlType>>;
  setSmalPlay: Dispatch<SetStateAction<ControlType>>;
  setVolume: Dispatch<SetStateAction<ControlType>>;
  setProgessBar: Dispatch<SetStateAction<ControlType>>;
  setPlayTime: Dispatch<SetStateAction<ControlType>>;
  setFullScrean: Dispatch<SetStateAction<ControlType>>;
  setNextBtn: Dispatch<SetStateAction<ControlType>>;
  setPrevBtn: Dispatch<SetStateAction<ControlType>>;

  backgroundColorInsideButton: string | undefined;
  setBackgroundColorInsideButton: Dispatch<SetStateAction<string | undefined>>;
  textInsideButton: string | undefined;
  setTextInsideButton: Dispatch<SetStateAction<string | undefined>>;
  sizeInsideButton: string | undefined;
  setSizeInsideButton: Dispatch<SetStateAction<string | undefined>>;
  textBelowButton: string | undefined;
  startTimerInsideButton: number | undefined;
  setStartTimerInsideButton: Dispatch<SetStateAction<number | undefined>>;
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
  startTimer: number;
  setStartTimer: (value: number) => void;
  endTimer: number;
  setEndTimer: (value: number) => void;
  startTimerSecondsBelow: number;
  setStartTimerSecondsBelow: (value: number) => void;
  endTimerSecondsBelow: number;
  setEndTimerSecondsBelow: (value: number) => void;
  startTimerBelow: number;
  setStartTimerBelow: (value: number) => void;
  endTimerBelow: number;
  setEndTimerBelow: (value: number) => void;
  startTimerSecondsInside: number;
  setStartTimerSecondsInside: (value: number) => void;
  endTimerSecondsInside: number;
  setEndTimerSecondsInside: (value: number) => void;
  startTimerInside: number;
  setStartTimerInside: (value: number) => void;
  endTimerInside: number;
  setEndTimerInside: (value: number) => void;
  propsButtonBelow: string;
  setPropsButtonBelow: (value: string) => void;
  propsButtonInside: string;
  setPropsButtonInside: (value: string) => void;
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
  InsideButtonsValues: { text: string; link: string };
  setInsideButtonsValues: any;
  changeDuration: number;
  setChangeDuration: Dispatch<SetStateAction<number>>;
  sizeBelowButton: string | undefined;
  setSizeBelowButton: Dispatch<SetStateAction<string | undefined>>;
  openModalTimers: () => void;
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

  const [bigPlay, setBigPlay] = useState({} as ControlType);
  const [smalPlay, setSmalPlay] = useState({} as ControlType);
  const [volume, setVolume] = useState({} as ControlType);
  const [progressBar, setProgessBar] = useState({} as ControlType);
  const [playTime, setPlayTime] = useState({} as ControlType);
  const [fullScrean, setFullScrean] = useState({} as ControlType);
  const [nextBtn, setNextBtn] = useState({} as ControlType);
  const [prevBtn, setPrevBtn] = useState({} as ControlType);

  const { data: controll } = useQuery(
    ["controll", videosId.currentVideoId],
    () => getControllers(videosId.currentVideoId)
  );
  const [changeDuration, setChangeDuration] = useState<number>(0);

  const [backgroundColorBelowButton, setBackgroundColorBelowButton] = useState<
    string | undefined
  >("");
  const [textColorBelowButton, setTextColorBelowButton] = useState<
    string | undefined
  >("");
  const [backgroundHoverBelowButton, setBackgroundHoverBelowButton] = useState<
    string | undefined
  >("");
  const [sizeBelowButton, setSizeBelowButton] = useState<string | undefined>(
    ""
  );
  const [textInsideButton, setTextInsideButton] = useState<string | undefined>(
    ""
  );
  const [sizeInsideButton, setSizeInsideButton] = useState<string | undefined>(
    ""
  );
  const [startTimerInsideButton, setStartTimerInsideButton] = useState<
    number | undefined
  >(300);
  const [textBelowButton, setTextBelowButton] = useState<string | undefined>(
    ""
  );
  const [propsButtonBelow, setPropsButtonBelow] = useState("");
  const [propsButtonInside, setPropsButtonInside] = useState("");
  const [startTimer, setStartTimer] = useState(0);
  const [endTimer, setEndTimer] = useState(0);
  const [startTimerBelow, setStartTimerBelow] = useState(0);
  const [startTimerSecondsBelow, setStartTimerSecondsBelow] = useState(0);
  const [endTimerBelow, setEndTimerBelow] = useState(0);
  const [endTimerSecondsBelow, setEndTimerSecondsBelow] = useState(0);
  const [startTimerInside, setStartTimerInside] = useState(183);
  const [startTimerSecondsInside, setStartTimerSecondsInside] = useState(0);
  const [endTimerInside, setEndTimerInside] = useState(0);
  const [endTimerSecondsInside, setEndTimerSecondsInside] = useState(0);

  const [backgroundColorInsideButton, setBackgroundColorInsideButton] =
    useState<string | undefined>("");
  const [textColorInsideButton, setTextColorInsideButton] = useState<
    string | undefined
  >("");

  const [backgroundHoverInsideButton, setBackgroundHoverInsideButton] =
    useState<string | undefined>("");

  const [watchVideoTime, setWatchVideoTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [valueInMinutes, setValueInMinutes] = useState(0);
  const [bellowButtonsValues, setBellowButtonsValues] = useState({
    text: "",
    link: "",
  });
  const [InsideButtonsValues, setInsideButtonsValues] = useState({
    text: "",
    link: "",
  });
  const [startTimerSeconds, setStartTimerSeconds] = useState(0);
  const [endTimerSeconds, setEndTimerSeconds] = useState(0);
  const [resultInsideProps, setResultInsideProps] = useState({
    start: 0,
    end: 0,
  });

  const [htmlCustomTimer, setHtmlCustomTimer] = useState({ start: 0, end: 0 });
  const [htmlCustom, setHtmlCustom] = useState("");
  const [modalTimersIsOpen, setModalTimersIsOpen] = useState(false);

  function openModalTimers() {
    setModalTimersIsOpen(!modalTimersIsOpen);
  }

  function closeModalTimers() {
    setModalTimersIsOpen(false);
  }

  useEffect(() => {
    setBigPlay({ isActive: controll?.has_big_play_button });
    setSmalPlay({ isActive: controll?.has_small_play_button });
    setVolume({ isActive: controll?.has_volume });
    setProgessBar({ isActive: controll?.has_progress_bar });
    setPlayTime({ isActive: controll?.has_video_duration });
    setFullScrean({ isActive: controll?.has_fullscreen });
    setNextBtn({ isActive: controll?.has_foward_10_seconds });
    setPrevBtn({ isActive: controll?.has_back_10_seconds });
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
    };
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
        sizeBelowButton,
        setSizeBelowButton,
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
        startTimerInsideButton,
        setStartTimerInsideButton,
        startTimer,
        setStartTimer,
        endTimer,
        setEndTimer,
        startTimerSecondsBelow,
        setStartTimerSecondsBelow,
        endTimerSecondsBelow,
        setEndTimerSecondsBelow,
        startTimerBelow,
        setStartTimerBelow,
        endTimerBelow,
        setEndTimerBelow,
        startTimerSecondsInside,
        setStartTimerSecondsInside,
        endTimerSecondsInside,
        setEndTimerSecondsInside,
        startTimerInside,
        setStartTimerInside,
        endTimerInside,
        setEndTimerInside,
        propsButtonBelow,
        setPropsButtonBelow,
        openModalTimers,
        propsButtonInside,
        setPropsButtonInside,
        InsideButtonsValues,
        setInsideButtonsValues,
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
