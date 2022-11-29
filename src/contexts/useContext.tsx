import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../services/api";
import Router from "next/router";
import { setCookie, parseCookies } from "nookies";
import { newUserDataProps } from "../types/types";

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
  avatar?: string;
};

type AuthContextData = {
  signIn(credentials: SignInCredentials): Promise<void>;
  updateUser(newData: newDataUser): Promise<void>;
  user: User | undefined;
  isAuthenticated: boolean;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>();
  const isAuthenticated = !!user;

  const { "mayoPLayer.token": token } = parseCookies();

  useEffect(() => {
    if (token) {
      api("/me").then((response) => {
        const { email, name, phone, avatar, lastname } = response.data;

        setUser({ email, name, phone, avatar, lastname });
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

      api.defaults.headers["Authorization"] = `Baerer ${token}`;

      if (token) {
        api("/me").then((response) => {
          const { email, name, phone, avatar, lastname } = response.data;
          setUser({ email, name, phone, avatar, lastname });
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

  return (
    <AuthContext.Provider value={{ signIn, isAuthenticated, user, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}
