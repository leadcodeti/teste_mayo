import {
  createContext,
  ReactNode,
  useEffect,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
  useCallback,
} from "react";
import { api } from "../services/api";
import Router from "next/router";

import { setCookie, parseCookies, destroyCookie } from "nookies";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { newUserDataProps, VideoTypes } from "../types/types";
import moment from "moment";

type User = {
  id: string;
  email: string;
  avatar?: string;
  name: string;
  lastname?: string;
  phone?: string;
  password?: string;
  subscription: {
    subscriber_code: string;
    subscription_status: string;
    subscription_plan: string;
  };
};

type SignInCredentials = {
  email: string;
  password: string;
};

type newDataUser = {
  id: string;
  name?: string;
  lastname?: string;
  phone?: string;
  password?: string;
  avatar?: FormData;
};

interface CurrentVideoType {
  currentVideoId: string;
  currentPlayerId: string;
}

interface AuthContextProps {
  signIn(credentials: SignInCredentials): Promise<void>;
  updateUser: (newDataUser: newUserDataProps) => Promise<void>;
  openModal: () => void;
  closeModal: () => void;

  getAllVideos: () => Promise<void>;

  modalNewVideoOpen: boolean;
  openModalNewVideo: () => void;
  closeModalNewVideo: () => void;
  user: User | undefined;
  isAuthenticated: boolean;
  setAllVideo: Dispatch<SetStateAction<VideoTypes[]>>;
  setCurrentVideo: Dispatch<SetStateAction<CurrentVideoType>>;
  modalOpen: boolean;
  allVideo: VideoTypes[];
  currentVideo: CurrentVideoType;
  buttonOption: string;
  setButtonOption: (value: string) => void;
  buttoBelowVideo: () => void;
  buttonInsideVideo: () => void;
  modalNewButtonOpen: boolean;
  openModalNewButton: () => void;
  closeModalNewButton: () => void;
  buttonPosition: string;
  setButtonPosition: (value: string) => void;
  buttonProps: any;
  setButtonProps: any;
}

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextProps);

export function signOut() {
  destroyCookie(undefined, "mayoPLayer.token");
  Router.push("/login");
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>();
  const isAuthenticated = !!user;
  const [modalOpen, setModalOpen] = useState(false);
  const [modalNewButtonOpen, setModalNewButtonOpen] = useState(false);
  const [modalNewVideoOpen, setModalNewVideoOpen] = useState(false);
  const [buttonPosition, setButtonPosition] = useState("center-center");
  const [currentVideo, setCurrentVideo] = useState<CurrentVideoType>(
    {} as CurrentVideoType
  );

  const [allVideo, setAllVideo] = useState<VideoTypes[]>([]);
  const [buttonOption, setButtonOption] = useState("below");
  const [buttonProps, setButtonProps] = useState({
    background_color: "",
    background_hover: "",
    size: "",
    text: "",
    text_color: "",
    link: "",
  });

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

  function buttoBelowVideo() {
    setButtonOption("below");
  }

  function buttonInsideVideo() {
    setButtonOption("inside");
  }

  function openModalNewButton() {
    setModalNewButtonOpen(true);
  }

  function closeModalNewButton() {
    setModalNewButtonOpen(false);
  }

  const { "mayoPLayer.token": token } = parseCookies();

  useEffect(() => {
    if (token) {
      api("/me").then((response) => {
        const { email, name, phone, avatar, lastname, id, subscription } =
          response.data;

        setUser({
          email,
          name,
          phone,
          avatar,
          lastname,
          id,
          subscription,
        });
      });
    }
  }, [token]);

  async function signIn({ email, password }: SignInCredentials) {
    const base64TokenPayload =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzAxMTU2NzQsImV4cCI6MTY3MDIwMjA3NCwic3ViIjoiYTc5N2U5YmEtNmU4My00ZTVlLTg0ZmMtNzM2MzMxN2IxMTRmIn0.qmF5mdP1b3PqBL4ycq2YHFjEqyFBv92B2isQB2coXwE".split(
        "."
      )[1];
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
          const { email, name, phone, avatar, lastname, id, subscription } =
            response.data;
          setUser({ email, name, phone, avatar, lastname, id, subscription });
        });
      }

      Router.push("/dashboard");
    } catch (err) {
      console.log(err);
    }
  }

  async function updateUser(newDataUser: newUserDataProps) {
    const base64TokenPayload =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzAxMTU2NzQsImV4cCI6MTY3MDIwMjA3NCwic3ViIjoiYTc5N2U5YmEtNmU4My00ZTVlLTg0ZmMtNzM2MzMxN2IxMTRmIn0.qmF5mdP1b3PqBL4ycq2YHFjEqyFBv92B2isQB2coXwE".split(
        "."
      )[1];
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

  const getAllVideos = useCallback(async () => {
    if (user) {
      const response = await api.get(`/videos/${user?.id}`);
      const data = response.data.map((res: VideoTypes) => {
        return {
          id: res.id,
          name: res.name,
          view_count: res.view_count,
          youtube_video_id: res.youtube_video_id.slice(0, 11),
          cover_image: res.cover_image,
          date: format(new Date(res.date), "dd/MM/yyyy", {
            locale: ptBR,
          }),
          duration: moment.duration(`${res.duration}`).asMilliseconds(),
        };
      });
      setAllVideo(data);
    }
  }, [user]);

  useEffect(() => {
    getAllVideos();
  }, [getAllVideos, user]);

  return (
    <AuthContext.Provider
      value={{
        signIn,
        isAuthenticated,
        setCurrentVideo,
        user,
        allVideo,
        setAllVideo,
        currentVideo,
        getAllVideos,
        updateUser,
        modalOpen,
        closeModal,
        openModal,
        modalNewVideoOpen,
        openModalNewVideo,
        closeModalNewVideo,

        buttonOption,
        setButtonOption,
        buttoBelowVideo,
        buttonInsideVideo,
        modalNewButtonOpen,
        openModalNewButton,
        closeModalNewButton,
        buttonPosition,
        setButtonPosition,
        buttonProps,
        setButtonProps,
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
