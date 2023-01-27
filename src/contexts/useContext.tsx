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

import { newUserDataProps, VideoTypes, ThumbnailsProps, User, ThumbnailTypes } from "../types/types";

import moment from "moment";

type SignInCredentials = {
  email: string;
  password: string;
};

interface CurrentVideoType {
  currentVideoId: string;
  currentPlayerId: string;
}

interface videosId {
  currentVideoId: string;
  currentPlayerId: string;
  videoName: string;
}


interface AuthContextProps {
  signIn(credentials: SignInCredentials): Promise<void>;
  updateUser: (newDataUser: newUserDataProps) => Promise<void>;
  openModal: () => void;
  closeModal: () => void;
  modalNewVideoOpen: boolean;
  openModalNewVideo: () => void;
  closeModalNewVideo: () => void;
  user: User | undefined;
  isAuthenticated: boolean;
  setCurrentVideo: Dispatch<SetStateAction<CurrentVideoType>>;
  modalOpen: boolean;
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
  buttonCustom: () => void;
  isVisibleInside: () => void;
  isVisibleCustom: () => void;
  buttonProps: any;
  setButtonProps: any;
  videosId: videosId;
  belowButtonProps: any;
  setBelowButtonProps: any;
  isVisibleBelow: () => void;
  setIsVisibleButtonBelow: (value: boolean) => void;
  isVisibleButtonBelow: boolean;
  fakebarProps: { height: number };
  setfakebarProps: (value: { height: number }) => void;
  autoPLayProps: any;
  setAutoPlayProps: any;
  heightFakeBar: number;
  setHeightFakeBar: (value: number) => void;
  fakeBarData: any;
  setFakeBarData: any;
  videoTime: number;
  setVideoTime: (value: number) => void;
  currentVideoTime: any;
  setCurrentVideoTime: any;
  formatedTime: number;
  setFormatedTime: (value: number) => void;
  pausedVideoThumb: boolean | undefined;
  setPausedVideoThumb: any;
  finalVideoThumb: boolean | undefined;
  setFinalVideoThumb: any;
  startVideoThumb: boolean;
  setStartVideoThumb: any;
  thumbnailsProps: ThumbnailTypes;
  setThumbnailsProps: Dispatch<SetStateAction<ThumbnailTypes>>;
  page: number;
  setPage: (value: number) => void;
  isVisibleButtonInside: boolean;
  isVisibleButtonCustom: boolean;
  setInsideButtonProps: any;
  InsideButtonProps: any;
  getHeight: number;
  setGetHeight: (value: number) => void;
}

type AuthProviderProps = {
  children: ReactNode;
};

type belowButton = {
  background_color: string;
  background_hover: string;
  size: string;
  text: string;
  text_color: string;
  link: string;
  is_visible: boolean;
};

type continuarButtonProps = {
  background_color: string;
  message: string;
  continue_button_text: string;
  restart_button_text: string;
  text_color: string;
};

type fakebarProps = {
  height: number;
};

type AutoPlayProps = {
  text_color: string;
  background_color: string;
  top_text: string;
  bottom_text: string;
};

type TypesFakeBarData = {
  height: number;
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

  const [currentVideo, setCurrentVideo] = useState<CurrentVideoType>(
    {} as CurrentVideoType
  );

  const [buttonPosition, setButtonPosition] = useState("center-center");
  const [buttonOption, setButtonOption] = useState("below");
  const [isVisibleButtonBelow, setIsVisibleButtonBelow] = useState(false);
  const [isVisibleButtonInside, setIsVisibleButtonInside] = useState(false);
  const [isVisibleButtonCustom, setIsVisibleButtonCustom] = useState(false);

  const [videosId, setVideosId] = useState<videosId>({} as videosId);
  const [getHeight, setGetHeight] = useState(0);
  const [videoTime, setVideoTime] = useState(0);
  const [currentVideoTime, setCurrentVideoTime] = useState(0);
  const [formatedTime, setFormatedTime] = useState(0);
  const [pausedVideoThumb, setPausedVideoThumb] = useState(false);
  const [finalVideoThumb, setFinalVideoThumb] = useState(false);
  const [startVideoThumb, setStartVideoThumb] = useState(false);

  const [buttonProps, setButtonProps] = useState({
    background_color: "",
    background_hover: "",
    size: "",
    text: "",
    text_color: "",
    link: "",
    position: "",
  });

  const [belowButtonProps, setBelowButtonProps] = useState<any>({
    background_color: "",
    background_hover: "",
    size: "",
    text: "",
    text_color: "",
    link: "",
    is_visible: isVisibleButtonBelow,
  });


  const [fakebarProps, setfakebarProps] = useState<fakebarProps>({
    height: 0,
  });


  const [autoPLayProps, setAutoPlayProps] = useState<AutoPlayProps>({
    text_color: "",
    background_color: "",
    top_text: "",
    bottom_text: "",
  });





  const [continuarIsVisible, setContinuarIsVisible] = useState(false);
  const [heightFakeBar, setHeightFakeBar] = useState(0);
  const [fakeBarData, setFakeBarData] = useState<TypesFakeBarData>({
    height: 0,
  });
  
  const [thumbnailsProps, setThumbnailsProps] = useState({} as ThumbnailTypes);

  const [InsideButtonProps, setInsideButtonProps] = useState<any>({
    background_color: "",
    background_hover: "",
    size: "",
    text: "",
    text_color: "",
    link: "",
    is_visible: isVisibleButtonInside,
    position: buttonPosition,
  });

  const [page, setPage] = useState(1);




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

  function buttonCustom() {
    setButtonOption("custom");
  }

  async function isVisibleBelow() {
    setIsVisibleButtonBelow(!isVisibleButtonBelow);
    await api.put(
      `/cta_buttons/${videosId.currentVideoId}?type=${buttonOption}`,
      {
        is_visible: isVisibleButtonBelow,
      }
    );
  }

  async function isVisibleInside() {
    setIsVisibleButtonInside(!isVisibleButtonInside);
    await api.put(
      `/cta_buttons/${videosId.currentVideoId}?type=${buttonOption}`,
      {
        is_visible: isVisibleButtonInside,
      }
    );
  }

  async function isVisibleCustom() {
    setIsVisibleButtonCustom(!isVisibleButtonCustom);
    await api.put(
      `/cta_buttons/${videosId.currentVideoId}?type=${buttonOption}`,
      {
        is_visible: isVisibleButtonCustom,
      }
    );
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
    await api.put(`/users/${user?.id}`, newDataUser);

    const headers = { "Content-Type": "multipart/form-data" };

    await api.patch("/users/avatar", newDataUser.avatar, { headers: headers });

    await api("/me").then((res) => setUser(res.data));
  }

  useEffect(() => {
    if (currentVideo) {
      const getIds = JSON.parse(localStorage.getItem("@myVideoPlayerId") || "");
      if (getIds !== null) {
        setVideosId(getIds);
      }
    }
  }, [currentVideo]);

  return (
    <AuthContext.Provider
      value={{
        signIn,
        isAuthenticated,
        setCurrentVideo,
        user,
        videosId,
        currentVideo,
        updateUser,
        modalOpen,
        closeModal,
        openModal,
        modalNewVideoOpen,
        openModalNewVideo,
        closeModalNewVideo,
        buttonCustom,
        isVisibleCustom,
        isVisibleInside,
        getHeight,
        setGetHeight,
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
        belowButtonProps,
        setBelowButtonProps,
        isVisibleBelow,
        setIsVisibleButtonBelow,
        isVisibleButtonBelow,
        isVisibleButtonCustom,
        isVisibleButtonInside,
        setInsideButtonProps,
        InsideButtonProps,


        heightFakeBar,
        setHeightFakeBar,
        fakeBarData,
        setFakeBarData,
        videoTime,
        setVideoTime,
        currentVideoTime,
        setCurrentVideoTime,

        formatedTime,
        setFormatedTime,
        autoPLayProps,
        setAutoPlayProps,
        pausedVideoThumb,
        setPausedVideoThumb,
        finalVideoThumb,
        setFinalVideoThumb,
        thumbnailsProps,
        setThumbnailsProps,
        page,
        setPage,
        startVideoThumb,
        setStartVideoThumb,
        fakebarProps,
        setfakebarProps,
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
