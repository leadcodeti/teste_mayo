import GlobalStyle from "../styles/globalStyles";
import type { AppProps } from "next/app";
import "bootstrap/dist/css/bootstrap.min.css";

import { AuthProvider } from "../contexts/useContext";

import { useEffect, useState } from "react";
import { ContextPlayerProvider } from "../contexts/usePlayerContext";
import { ToastContainer } from "react-toastify";
import SideBarProvider from "../contexts/thirdContext";


export default function App({ Component, pageProps }: AppProps) {

  const [showCild, setShowChild] = useState(false);
  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showCild) {
    return null;
  }

  return (
    <>
      <AuthProvider>
       <ToastContainer 
         autoClose={2000}
       />
        <ContextPlayerProvider>
          <SideBarProvider>
             <GlobalStyle />
             <Component {...pageProps} />
          </SideBarProvider>
        </ContextPlayerProvider>
      </AuthProvider>
    </>
  );
}
