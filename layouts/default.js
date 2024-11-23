import { Navbar } from "../components/navbar";
import { Foot } from "../components/footer";
import { Head } from "../components/head";

export default function DefaultLayout({ children }) {
  return (
    <div>
      <Head />
      <Navbar />
      <main className=" h-screen">{children}</main>
      <Foot />
    </div>
  );
}
