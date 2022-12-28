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


interface AuthContextProps {
  setCurrentTimeVideo:Dispatch<SetStateAction<number>>;
  lastTimeWacth: number;
  getCurrentVideoTime:() => void,
  keepWatching:() => void,
  restartVideo:()=> void,
  playerRef: RefObject<HTMLVmPlayerElement>
}

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextProps);

export default function SideBarProvider({ children }: AuthProviderProps) {
   const playerRef = useRef<HTMLVmPlayerElement>(null);
   const [lastTimeWacth, setLastWacth] = useState(0)
   const [currentTimeVideo, setCurrentTimeVideo] = useState(0)

   console.log('TEMPO', lastTimeWacth)
   
  function getCurrentVideoTime() {
    if(currentTimeVideo === 0) {
      localStorage.setItem("@keepWacth", JSON.stringify({lastTimeWacth}));
    } else {
      localStorage.setItem("@keepWacth", JSON.stringify({currentTimeVideo}));
    }
  }

  function keepWatching() {
    const lastTimeWatch = JSON.parse(localStorage.getItem("@keepWacth") || "");
    setLastWacth(lastTimeWatch.currentTimeVideo)
  }

  function restartVideo() {
    setLastWacth(0)
  }

  return (
    <AuthContext.Provider
      value={{
        getCurrentVideoTime,
        setCurrentTimeVideo,
        playerRef,
        lastTimeWacth,
        keepWatching,
        restartVideo
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
