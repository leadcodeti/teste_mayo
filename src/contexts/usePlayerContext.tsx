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
import { ControolerTypes } from "../types/types";
import { useVideoContext } from "./useContext";

interface contextProps {
  onGenerate: () => void;
  setBackgroundColor: Dispatch<SetStateAction<string | undefined>>;
  backgroundColor: string | undefined;
  embedString: string;
  setController: Dispatch<SetStateAction<ControolerTypes>>;
  controller:ControolerTypes;
}

interface ProviderProps {
  children: ReactNode;
}

const context = createContext({} as contextProps);

export function ContextPlayerProvider({ children }: ProviderProps) {
  const { openModal, videosId } = useVideoContext();
  const [embedString, setString] = useState("");
  const [backgroundColor, setBackgroundColor] = useState<string | undefined>("");

  const { data: controll } = useQuery(['controll', videosId.currentVideoId],() => getControllers(videosId.currentVideoId))

  const [controller, setController] = useState({} as ControolerTypes);

  console.log("NEW CONTROLLER_TESTE", controller);

  useEffect(() => {
    setController( {
      bigPlay: controll?.has_big_play_button,
      nextBtn: controll?.has_foward_10_seconds, 
      playTime: controll?.has_video_duration, 
      prevBtn: controll?.has_back_10_seconds, 
      fullScrean: controll?.has_fullscreen, 
      smalPlay: controll?.has_small_play_button,
      volume: controll?.has_volume,
      progressBar: controll?.has_progress_bar, 
    })

},[controll, setController])

  const onGenerate = () => {
    openModal();
    const { jsIframe } = embedVideo({ backgroundColor,controller});
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
        setController,
        controller,
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
