import {
  createContext,
  ReactNode,
  useEffect,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
} from "react";
import { api } from "../services/api";
import Router from "next/router";
import { setCookie, parseCookies } from "nookies";
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { newUserDataProps, VideoTypes } from "../types/types";


type User = {
  email: string;
  avatar?: string;
  name: string;
  lastname?: string;
  phone?: string;
  password?: string;
};

type SignInCredentials = {
  email: string;
  password: string;
};

type newDataUser = {
  name?: string;
  lastname?: string;
  phone?: string;
  password?: string;
  avatar?: FormData;
};

interface CurrentVideoType {
  currentVideoId: string;  
  currentPlayerId:string;
}

interface AuthContextProps {
  signIn(credentials: SignInCredentials): Promise<void>;
  updateUser(newData: newDataUser): Promise<void>;
  openModal: () => void;
  closeModal: () => void;
  modalNewVideoOpen: boolean;
  openModalNewVideo: () => void;
  closeModalNewVideo: () => void;
  user: User | undefined;
  isAuthenticated: boolean;
  setCurrentVideo: Dispatch<SetStateAction<CurrentVideoType>>;
  modalOpen: boolean;
  allVideo:VideoTypes[];
  currentVideo: CurrentVideoType;

}

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>();
  const isAuthenticated = !!user;
  const [modalOpen, setModalOpen] = useState(false);
  const [modalNewVideoOpen, setModalNewVideoOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<CurrentVideoType >({} as CurrentVideoType );
  const [allVideo,setAllVideo] = useState<VideoTypes[]>([])

  function openModal() {
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
  }

  function openModalNewVideo() {
    setModalNewVideoOpen(true);
  }

  function closeModalNewVideo() {
    setModalNewVideoOpen(false);
  }

  const { "mayoPLayer.token": token } = parseCookies();

  useEffect(() => {
    if (token) {
      api("/me").then((response) => {
        const { email, name, phone, avatar, lastname } = response.data;

        setUser({email, name, phone, avatar, lastname});
      });
    }
  }, [token]);

  async function signIn({ email, password }: SignInCredentials) {
    
    const base64TokenPayload = token.split(".")[1];
    const payload = Buffer.from(
      String(base64TokenPayload),
      "base64"
     ).toString();
     const id = JSON.parse(payload).sub;

     try {
      const response = await api.post("/sessions", {
        email,
        password,
      });

      const { token } = response.data;

      setCookie(undefined, "mayoPLayer.token", token, {
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
      });

      api.defaults.headers["Authorization"] = `Bearer ${token}`;

      if (token) {
        api("/me").then((response) => {
          const { email, name, phone, avatar, lastname } = response.data;
          setUser({ email, name, phone, avatar, lastname,...id});
        });
      }

      Router.push("/dashboard");
    } catch (err) {
      console.log(err);
    }
  }

  async function updateUser(newDataUser: newUserDataProps) {
    const base64TokenPayload = token.split(".")[1];
    const payload = Buffer.from(
      String(base64TokenPayload),
      "base64"
    ).toString();
    const id = JSON.parse(payload).sub;

    await api.put(`/users/${id}`, newDataUser);

    const headers = { "Content-Type": "multipart/form-data" };

    await api.patch("/users/avatar", newDataUser.avatar, { headers: headers });

    await api("/me").then((res) => setUser(res.data));
  }
  

  useEffect(() => {
   async function getAllVideos() {

    const base64TokenPayload = token.split(".")[1];
    const payload = Buffer.from(
      String(base64TokenPayload),
      "base64"
    ).toString();
    const id = JSON.parse(payload).sub;

    console.log(id)

     const response = await api.get(`/videos/${id}`);
     const data = response.data.map((res:VideoTypes) => {
      return {
        id: res.id,
        name: res.name,
        view_count: res.view_count,
        youtube_video_id: res.youtube_video_id,
        cover_image: res.cover_image,
        date:  format(
          new Date(res.date),
          'dd/MM/yyyy',
          {
            locale: ptBR,
          }
        ),
        duration: res.duration,
      }
     })
     setAllVideo(data);
   }
   
   getAllVideos()

  },[token])
 
  return (
    <AuthContext.Provider
      value={{
        signIn,
        isAuthenticated,
        setCurrentVideo,
        user,
        allVideo,
        currentVideo,
        updateUser,
        modalOpen,
        closeModal,
        openModal,
        modalNewVideoOpen,
        openModalNewVideo,
        closeModalNewVideo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useVideoContext() {
  const new_context = useContext(AuthContext);
  return new_context;
}
