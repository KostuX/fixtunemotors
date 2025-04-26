import { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { getSession } from "next-auth/react";
import DefaultLayout from "../layouts/default";
import { Permanent_Marker } from "next/font/google";
import { Button } from "@heroui/react";

import "jspdf-autotable";

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

export default function Home() {

  const [siteData, setSiteData] = useState(defaultData);  
  const [tableData, setTableData] = useState([]);
  const { data: sessionData } = useSession();

  console.log(sessionData);

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
 <Button
            color="success"
            onPress={() => signIn()} // No callbackUrl here
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Sign In
          </Button>
      </DefaultLayout>
    );
  }

  
  return (
    <DefaultLayout siteData={siteData} fonts={fonts}>
      <div className="mb-4 flex gap-4 justify-center">
        <Button
          color="danger"
          onPress={handleExportCSV}
          className=" text-white "
        >
          Export as CSV
        </Button>
        <AddData />
      </div>
      <CarTable tableData={tableData} />
    </DefaultLayout>
  );
}
