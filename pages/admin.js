import { useState, useEffect } from "react";

import DefaultLayout from "../layouts/default";
import { Permanent_Marker } from "next/font/google";
import { Button } from "@heroui/react";

import "jspdf-autotable";

import CarTable from "../components/admin/table";
import AddData from "../components/admin/addData";

import { defaultData } from "../lib/defaultData";

import Lenis from "lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const marker = Permanent_Marker({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Home() {
  const [isDataFetched, setDataFetched] = useState(false);
  const [siteData, setSiteData] = useState(defaultData);
  const [newEntry, setNewEntry] = useState({ name: "", role: "", label: "" });
  const [tableData, setTableData] = useState([
    { name: "11LH8974", role: "2025/01/20", label: "Service" },
    { name: "22LH1234", role: "2025/02/15", label: "Repair" },
    { name: "33LH5678", role: "2025/03/10", label: "Inspection" },
    { name: "44LH9101", role: "2025/04/05", label: "Maintenance" },
    { name: "11LH8974", role: "2025/01/20", label: "Service" },
    { name: "22LH1234", role: "2025/02/15", label: "Repair" },
    { name: "33LH5678", role: "2025/03/10", label: "Inspection" },
    { name: "44LH9101", role: "2025/04/05", label: "Maintenance" },
    { name: "11LH8974", role: "2025/01/20", label: "Service" },
    { name: "22LH1234", role: "2025/02/15", label: "Repair" },
    { name: "33LH5678", role: "2025/03/10", label: "Inspection" },
    { name: "44LH9101", role: "2025/04/05", label: "Maintenance" },
    { name: "11LH8974", role: "2025/01/20", label: "Service" },
    { name: "22LH1234", role: "2025/02/15", label: "Repair" },
    { name: "33LH5678", role: "2025/03/10", label: "Inspection" },
    { name: "44LH9101", role: "2025/04/05", label: "Maintenance" },
    { name: "11LH8974", role: "2025/01/20", label: "Service" },
    { name: "22LH1234", role: "2025/02/15", label: "Repair" },
    { name: "33LH5678", role: "2025/03/10", label: "Inspection" },
    { name: "44LH9101", role: "2025/04/05", label: "Maintenance" },
    { name: "11LH8974", role: "2025/01/20", label: "Service" },
    { name: "22LH1234", role: "2025/02/15", label: "Repair" },
    { name: "33LH5678", role: "2025/03/10", label: "Inspection" },
    { name: "44LH9101", role: "2025/04/05", label: "Maintenance" },
    { name: "11LH8974", role: "2025/01/20", label: "Service" },
    { name: "22LH1234", role: "2025/02/15", label: "Repair" },
    { name: "33LH5678", role: "2025/03/10", label: "Inspection" },
    { name: "44LH9101", role: "2025/04/05", label: "Maintenance" },
    { name: "11LH8974", role: "2025/01/20", label: "Service" },
    { name: "22LH1234", role: "2025/02/15", label: "Repair" },
    { name: "33LH5678", role: "2025/03/10", label: "Inspection" },
    { name: "44LH9101", role: "2025/04/05", label: "Maintenance" },
  ]);
  const [filter, setFilter] = useState(""); // State for the filter input

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

  /* 

  // Fetch data from the local API

  async function testdb() {
    try {
      const response = await fetch("http://localhost:3000/api/hello");

      const data = await response.json();

      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEntry({ ...newEntry, [name]: value });
  };

  const handleAddEntry = (e) => {
    e.preventDefault();
    if (newEntry.name && newEntry.role && newEntry.status) {
      setTableData([...tableData, newEntry]);
      setNewEntry({ name: "", role: "", status: "" });
    }
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value); // Update the filter state
  };

  const filteredTableData = tableData.filter((row) =>
    row.name.toLowerCase().includes(filter.toLowerCase())
  ); // Filter table data based on the REG field
*/
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
