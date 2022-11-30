import GlobalStyle from "../styles/globalStyles";
import type { AppProps } from "next/app";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { ContextProvider } from "../contexts/useContext";
import { ContextPlayerProvider } from "../contexts/usePlayerContext";

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
      <ContextProvider>
        <ContextPlayerProvider>
          <GlobalStyle />
          <Component {...pageProps} />
        </ContextPlayerProvider>
      </ContextProvider>
    </>
  );
}
