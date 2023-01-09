import type { AppProps } from "next/app";
import { AuthProvider } from "../contexts/useContext";
import { useEffect, useState } from "react";
import { ContextPlayerProvider } from "../contexts/usePlayerContext";
import { ToastContainer } from "react-toastify";
import SideBarProvider from "../contexts/thirdContext";
import {QueryClient,QueryClientProvider} from 'react-query'
import "bootstrap/dist/css/bootstrap.min.css";
import GlobalStyle from "../styles/globalStyles";
import { EmbedModal } from "../components/embedModalVideo/embedModal";


const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {

  const [showCild, setShowChild] = useState(false);
  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showCild) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
       <ToastContainer autoClose={2000} />
        <ContextPlayerProvider>
          <SideBarProvider>
             <GlobalStyle />
             <EmbedModal />
             <Component {...pageProps} />
          </SideBarProvider>
        </ContextPlayerProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
