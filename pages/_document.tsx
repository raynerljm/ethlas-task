import Document, { Html, Head, Main, NextScript } from "next/document";
import MyHead from "../components/MyHead";

/**
 * Document page used to import custom Google fonts.
 */

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <MyHead />
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Overpass:wght@100;300;400;500;600;700;800;900&display=swap"
            rel="stylesheet"
          ></link>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
