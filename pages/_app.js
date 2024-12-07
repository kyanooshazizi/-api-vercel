import Footer from "@/components/modules/Footer/Footer";
import Navbar from "@/components/modules/Navbar/Navbar";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  console.log(process.env.url)
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
