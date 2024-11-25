import { Navbar } from "../components/navbar";
import { Navbar_contact } from "../components/navbar_contact";
import { Foot } from "../components/footer";
import { Head } from "../components/head";

export default function DefaultLayout({ children }) {
  return (
    <div>
      <Head />
      <Navbar_contact />
      <Navbar />

      <main>{children}</main>
      <Foot />
    </div>
  );
}
