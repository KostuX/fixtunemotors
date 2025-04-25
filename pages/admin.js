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
    { name: "11LH8974", role: "2025/01/20", status: "Service" },
    { name: "11LH8974", role: "2025/01/20", status: "Service" },
    { name: "11LH8974", role: "2025/01/20", status: "Service" },
  ]);

  let fonts = {
    marker: marker,
  };

  useEffect(() => {
    let endpoint = "/api/googleInfo";
    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          setSiteData({
            ...siteData,
            online: true,
            phone: [data.data["international_phone_number"]] || siteData.phone,
            address: data.data["address_components"] || siteData.address,
            opening_hours: data.data["opening_hours"] || siteData.opening_hours,
            reviews: data.data["reviews"] || siteData.reviews,
            rating: data.data["rating"] || siteData.rating,
          });
          setDataFetched(true);
        }
      });
  }, []);

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

  return (
    <DefaultLayout siteData={siteData} fonts={fonts}>
      <form onSubmit={handleAddEntry} className="mb-4 flex gap-4 w-full  justify-center">
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
        <button type="submit" className="bg-red-500 flex text-white p-2 rounded-xl mt-2 justify-center flex">
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
          {tableData.map((row, index) => (
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