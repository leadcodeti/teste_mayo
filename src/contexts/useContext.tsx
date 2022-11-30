import { createContext, Dispatch, ReactNode, SetStateAction, useContext,useState } from "react";
import { embedVideo } from "../components/embedVideo/embed";

interface contextProps {
  modalOpen: boolean;
  openModal:() => void;
  closeModal:() => void;
  setBigPlay:Dispatch<SetStateAction<boolean>>
  setWidth: Dispatch<SetStateAction<string>>;
  setHeight: Dispatch<SetStateAction<string>>;
  setBackgroundColor: Dispatch<SetStateAction<string>>;
  width:string;
  height:string;
  backgroundColor:string;
  bigPlay:boolean;
  embedString: string;
}

interface ProviderProps {
  children:ReactNode;
}

const context = createContext({} as contextProps)

export function ContextProvider({children}: ProviderProps) {
 
  const [modalOpen, setModalOpen] = useState(false);
  const [embedString, setString] = useState("");
  const [bigPlay, setBigPlay] = useState(false);
  const [width, setWidth] = useState("500");
  const [height, setHeight] = useState("300");
  const [backgroundColor, setBackgroundColor] = useState("#ccc");
 
  

  function openModal() {
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
  }
  

  return (
    <context.Provider 
     value={{modalOpen,
       closeModal,embedString,
       height,setHeight,setWidth,bigPlay,setBigPlay,
       width, openModal,backgroundColor,setBackgroundColor
      }}>

      {children}
    </context.Provider>
  )
}


export function useVideoContext() {
  const new_context = useContext(context);
  return new_context;
}