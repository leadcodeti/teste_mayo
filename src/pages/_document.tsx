import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            rel="shortcut icon"
            href="/mayo-player-icon.png"
            type="image/png"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Epilogue:wght@400;500;600;700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <title>Mayo Player</title>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
