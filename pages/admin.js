import { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { getSession } from "next-auth/react";
import DefaultLayout from "../layouts/default";
import { Permanent_Marker } from "next/font/google";
import { Button } from "@heroui/react";
import SignIn from "./auth/signin";



import CarTable from "../components/admin/table";
import AddData from "../components/admin/addData";

import { defaultData } from "../lib/defaultData";


import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const marker = Permanent_Marker({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Admin({ session }) {
  const { data: sessionData } = useSession();
  const [siteData, setSiteData] = useState(defaultData);  
  const [tableData, setTableData] = useState([]);




  let fonts = {
    marker: marker,
  };

  
  const handleExportCSV = () => {
    const csvRows = [
      ["REG", "DATE", "JOB"], // Header row
      ...tableData.map((row) => [row.name, row.role, row.label]), // Data rows
    ];

    const csvContent =
      "data:text/csv;charset=utf-8," +
      csvRows.map((e) => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "table_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  if (!sessionData) {
    return (
      <DefaultLayout siteData={siteData} fonts={fonts}>
 <SignIn/>
      </DefaultLayout>
    );
  }

  
  return (
    <DefaultLayout siteData={siteData} fonts={fonts}>
      <div className="mb-4 flex gap-4 justify-center ">
      <Button
          color="danger"
          onPress={signOut}
          className=" text-white "
          size="sm"
        >
          SignOut
        </Button>
        <Button
          color="danger"
          onPress={handleExportCSV}
          className=" text-white "
          size="sm"
        >
          Export as CSV
        </Button>
        <AddData />
      </div>
      <CarTable tableData={tableData} />
    </DefaultLayout>
  );
}
// Protect the page with server-side authentication
export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}