import { useState } from "react";
import { useSession, signOut } from "next-auth/react";

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

export default function Admin() {
  const { data: sessionData } = useSession();
  const [siteData, setSiteData] = useState(defaultData);
  const [tableData, setTableData] = useState([]);

  let user = {
    write: false,
    edit: false,
  };

  if (sessionData) {
    user.write = sessionData.user.write;
    user.edit = sessionData.user.edit;
  }

  let fonts = {
    marker: marker,
  };

  const handleExportCSV = async () => {
    try {
      // Fetch data from the API
      const response = await fetch("/api/getCarHistory");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
  
      // Prepare CSV rows
      const csvRows = [
        ["REG", "DATE", "JOB", "Car Model", "Description", "Mileage", "Client Name", "Phone", "Price"], // Header row
        ...data.map((row) => [
          row.reg,
          row.date,
          row.job,
          row.carmodel || "-",
          row.description || "-",
          row.mileage || "-",
          row.clientname || "-",
          row.phone || "-",
          row.price || "-",
          row.id || "-",
        ]), // Data rows
      ];
  
      // Convert rows to CSV content
      const csvContent =
        "data:text/csv;charset=utf-8," +
        csvRows.map((e) => e.join(",")).join("\n");
  
      // Create a downloadable link
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "car_history_data.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error exporting CSV:", error);
    }
  };

 

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
          isDisabled={!user?.write}
        >
          Export as CSV
        </Button>
        <AddData user={user} setTableData={setTableData}/>
      </div>
      <CarTable tableData={tableData} />
    </DefaultLayout>
  );
}