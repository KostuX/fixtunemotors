import { useState, useEffect } from "react";
import Spliter from "../components/spliter";
import DefaultLayout from "../layouts/default";
import { Permanent_Marker } from "next/font/google";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/react";

import ScrollContext from "../components/ScrollContext";
import Intro from "../components/intro";
import Intro2 from "../components/intro2";
import Services_sm from "../components/services_sm";
import WorkingHours from "../components/workingHours";
import Review from "../components/reviews";

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
    const [newEntry, setNewEntry] = useState({ name: "", role: "", status: "" });
    const [tableData, setTableData] = useState([
      { name: "11LH8974", role: "2025/01/20", status: "Service" },
      { name: "22LH1234", role: "2025/02/15", status: "Repair" },
      { name: "33LH5678", role: "2025/03/10", status: "Inspection" },
      { name: "44LH9101", role: "2025/04/05", status: "Maintenance" },
    ]);
    const [filter, setFilter] = useState(""); // State for the filter input
  
    let fonts = {
      marker: marker,
    };
  
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
  
    return (
      <DefaultLayout siteData={siteData} fonts={fonts}>
        <div className="mb-4 flex gap-4 w-full justify-center">
          <input
            type="text"
            placeholder="Filter by REG"
            value={filter}
            onChange={handleFilterChange}
            className="border p-2 rounded w-1/2"
          />
        </div>
  
        <form onSubmit={handleAddEntry} className="mb-4 flex gap-4 w-full justify-center">
          <div>
            <label htmlFor="name">REG</label>
            <input
              type="text"
              id="name"
              name="name"
              value={newEntry.name}
              onChange={handleInputChange}
              className="border p-2 rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="role">DATE</label>
            <input
              type="text"
              id="role"
              name="role"
              value={newEntry.role}
              onChange={handleInputChange}
              className="border p-2 rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="status">JOB</label>
            <input
              type="text"
              id="status"
              name="status"
              value={newEntry.status}
              onChange={handleInputChange}
              className="border p-2 rounded"
              required
            />
          </div>
          <button type="submit" className="bg-red-500 text-white p-2 rounded-xl mt-2">
            Add Entry
          </button>
        </form>
  
        <Table isStriped aria-label="Example static collection table">
          <TableHeader>
            <TableColumn>REG</TableColumn>
            <TableColumn>DATE</TableColumn>
            <TableColumn>JOB</TableColumn>
          </TableHeader>
          <TableBody>
            {filteredTableData.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.role}</TableCell>
                <TableCell>{row.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DefaultLayout>
    );
  }