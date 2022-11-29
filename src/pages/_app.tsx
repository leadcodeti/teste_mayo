import GlobalStyle from "../styles/globalStyles";
import type { AppProps } from "next/app";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider } from "../contexts/useContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <AuthProvider>
        <GlobalStyle />
        <Component {...pageProps} />
      </AuthProvider>
    </>
  );
}
