"use client";
import { useState, useRef } from "react";
import { useSession, signOut } from "next-auth/react";
import { ToWords } from "to-words";
import DefaultLayout from "../layouts/default";
import { Permanent_Marker } from "next/font/google";
import { Button } from "@heroui/react";
import SignIn from "./auth/signin";
import {
  Tabs,
  Tab,
  Form,
  Input,
  Accordion,
  AccordionItem,
} from "@heroui/react";
import CarTable from "../components/admin/table";
import AddDataForm from "../components/admin/addDataForm";

import { defaultData } from "../lib/defaultData";
import { cfg_site } from "../config/cfg_site";

const marker = Permanent_Marker({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Admin() {
  const toWords = new ToWords();
  const { data: sessionData } = useSession();
  const [siteData, setSiteData] = useState(defaultData);
  const [tableData, setTableData] = useState([]);
  const [action, setAction] = useState(null);
  const [invoiceData, setInvoiceData] = useState(null);
  const [showInvoice, setShowInvoice] = useState(false);
  const [jobs, setJobs] = useState([{ job: "", price: "" }]);
  const [companyInfo, setCompanyInfo] = useState({
    companyName: cfg_site.title || "Fix Tune Motors",
    postcode: cfg_site.postCode || "H12 A8X2",
    address: cfg_site.address || [
      { long_name: "Latt" },
      { long_name: "Cavan" },
      { long_name: "Co. Cavan" },
      { long_name: "Ireland" },
      { long_name: "H12 A8X2" },
    ],
    phone: cfg_site.phone[0] || "+353 87 466 3350",
    email: cfg_site.email[0] || "fixtunemotors@gmail.com",
    www: cfg_site.www || "www.fixtunemotors.ie",
  });

  const invoiceRef = useRef();

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

  const handleAddJob = () => {
    setJobs([...jobs, { job: "", price: "" }]);
  };

  function capitalizeAllWords(str) {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  function createInvoice(
    jobDone,
    reg,
    carmodel,
    description,
    mileage,
    clientname,
    phone,
    price
  ) {
    setInvoiceData({
      jobDone,
      reg,
      carmodel,
      description,
      mileage,
      clientname,
      phone,
      price,
    });
    setShowInvoice(true);
  }
  async function handlePrintInvoice(invoiceData, companyInfo) {
    console.log("Generating invoice on server");
    try {
      const response = await fetch("/api/generateInvoice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ invoiceData, companyInfo, jobs }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate invoice");
      }

      const invoiceHTML = await response.text();

      // Open the invoice in a new tab
      const newWindow = window.open("", "_blank");
      newWindow.document.write(invoiceHTML);
      newWindow.document.close();

      // Trigger the print dialog
      newWindow.onload = () => {
        newWindow.print();
      };
    } catch (error) {
      console.error("Error generating invoice:", error);
    }
  }

  function handlePrintInvoiceClient(invoiceData, companyInfo) {
    console.log("Generating invoice on client");
    // Ensure invoiceData is initialized
    if (!invoiceData) {
      invoiceData = {};
    }

    // Calculate total price
    let priceSum = jobs.reduce((sum, job) => sum + Number(job.price || 0), 0);
    invoiceData.price = priceSum.toFixed(2);

    setInvoiceData(invoiceData);

    if (invoiceData) {
      const win = window.open("", "", "height=900,width=700");

      win.document.write("<html><head><title>Invoice</title></head><body>");
      win.document.write(getInvoiceHTML(invoiceData, companyInfo));
      win.document.write("</body></html>");
      win.document.close();

      win.onload = () => {
        win.print();
      };
    }
  }

  function getInvoiceHTML(invoiceData, companyInfo) {
    return `
    <link href="https://fonts.googleapis.com/css?family=Permanent+Marker&display=swap" rel="stylesheet">
    <style>
      body { font-family: 'Segoe UI', Arial, sans-serif; background: #fff; margin: 0; padding: 40px; }
      .inv-container { max-width: 700px; margin: 0 auto; background: #fff; padding: 40px; border-radius: 8px; }
      .inv-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 52px; }
      .inv-title { color: #1a3365; margin-bottom: 0; font-size: 2.5em; }
      .inv-logo { width: 150px; margin-top: 10px; }
      .inv-bill-row { display: flex; justify-content: space-between; margin-top: 32px; }
      .inv-bill-col { min-width: 120px; }
      .inv-label { font-size: 12px; color: #888; }
      .inv-bold { font-weight: bold; }
      .inv-table { width: 100%; margin-top: 32px; border-collapse: collapse; }
      .inv-table th { text-align: left; color: #1a3365; border-bottom: 2px solid #e74c3c; padding-bottom: 8px; }
      .inv-table th:last-child, .inv-table td:last-child { text-align: right; }
      .inv-table td { padding: 12px 0; }
      .inv-table tfoot td { font-weight: bold; color: #1a3365; border-top: 2px solid #eee; padding-top: 16px; }
      .inv-footer { display: flex; justify-content: space-between; align-items: flex-center; margin-top: 24px; }
      .inv-thank { font-size: 1.5em; color: #1a3365; font-family: 'Permanent Marker', cursive; }
      .inv-price-words { font-size: 1em; color:rgba(22, 27, 36, 0.56); font-family: 'Permanent Marker' }
      .inv-terms { color: #e74c3c; font-weight: bold; }
      .inv-terms-desc { font-size: 12px; color: #888; }
    </style>
    <div class="inv-container">
      <div class="inv-header">
        <div class="inv-bold">
          <img src="./logo/logo_black.png" alt="logo" class="inv-logo" />
          <br>${companyInfo.www || ""}
          <br>${companyInfo.email || ""}
        </div>
        <div>
          <div class="inv-title">INVOICE</div>
          <div class="inv-bold">
            <br>${companyInfo.companyName || ""}
            <br>${companyInfo.phone || ""}
            <br>${companyInfo.address.map((addr) => addr.long_name).join(", ")}
          </div>
        </div>
      </div>
      <div class="inv-bill-row">
        <div class="inv-bill-col">
          ${
            invoiceData.clientName
              ? `<div class="inv-label">BILL TO</div>
                 <div class="inv-bold">${capitalizeAllWords(
                   invoiceData.clientName
                 )}</div>`
              : ""
          }
        </div>
        <div class="inv-bill-col">
          ${
            invoiceData.reg
              ? `<div class="inv-label">REG</div>
                 <div class="inv-bold">${String(
                   invoiceData.reg
                 ).toUpperCase()}</div>`
              : ""
          }
        </div>
        <div class="inv-bill-col">
          <div class="inv-label">INVOICE DATE</div>
          <div class="inv-bold">${new Date().toLocaleDateString()}</div>
        </div>
      </div>
      <table class="inv-table">
        <thead>
          <tr>
            <th>DESCRIPTION</th>
            <th>AMOUNT</th>
          </tr>
        </thead>
        <tbody>
          ${jobs
            .map(
              (job) => `
              <tr>
                <td>${capitalizeAllWords(job.job)}</td>
                <td>${job.price ? Number(job.price).toFixed(2) : "0.00"}</td>
              </tr>
            `
            )
            .join("")}
        </tbody>
        <tfoot>
          <tr>
            <td style="text-align:right;">TOTAL</td>
            <td>${
              invoiceData.price ? Number(invoiceData.price).toFixed(2) : "0.00"
            } €</td>
          </tr>
          <tr>
            <td class="inv-price-words" colspan="2">
              ${(() => {
                const price = Number(invoiceData.price || 0).toFixed(2);
                const [euros, cents] = price.split(".");
                let words = toWords.convert(Number(euros)) + " euro";
                if (Number(cents) > 0) {
                  words += " and " + toWords.convert(Number(cents)) + " cents";
                }
                return words.charAt(0).toUpperCase() + words.slice(1);
              })()}
            </td>
          </tr>
        </tfoot>
      </table>
      <div style="font-weight: bold;text-align: center; margin: 0px 16px 20px;">
        Thank you for your business.
      </div>
      
     <div style="font-size: 12px;">
    
     <span style="font-weight: bold;">IBAN:</span> ${
       cfg_site.bankDetails?.iban || "IE12AIBK93205148495099"
     }
     <div>
     <div>
     <span style="font-weight: bold;"> BIC: </span>${
       cfg_site.bankDetails?.bic || "AIBKIE2D"
     }
     <div>
     <div><span style="font-weight: bold;">Account Number:</span> ${
       cfg_site.bankDetails?.accountNumber || "48495099"
     }
     </div>
     <div>
     <span style="font-weight: bold;">NSC:</span> ${
       cfg_site.bankDetails?.nsc || "932051"
     }
     </div>
     </div>
    </div>
  `;
  }

  const handleExportCSV = async () => {
    try {
      const response = await fetch("/api/getCarHistory");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();

      const csvRows = [
        [
          "REG",
          "DATE",
          "JOB",
          "Car Model",
          "Description",
          "Mileage",
          "Client Name",
          "Phone",
          "Price",
        ],
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
        ]),
      ];

      const csvContent =
        "data:text/csv;charset=utf-8," +
        csvRows.map((e) => e.join(",")).join("\n");

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
      <div className="flex items-center justify-center p-4 sm:p-12 max-w-4xl mx-auto">
        <div className="w-full">
          <Tabs aria-label="Options">
            <Tab key="invoice" title="Invoice">
              <div className="mb-4 flex justify-center gap-4 m-8 min-h-screen">
                <Form
                  className="w-full max-w-md flex flex-col gap-4"
                  onReset={() => setAction("reset")}
                  onSubmit={(e) => {
                    e.preventDefault();
                    let data = Object.fromEntries(
                      new FormData(e.currentTarget)
                    );
                    setAction(`submit ${JSON.stringify(data)}`);
                    handlePrintInvoice(data, companyInfo);
                  }}
                >
                  <Accordion className="mb-8">
                    <AccordionItem
                      key="1"
                      aria-label="Company Information"
                      title="Company Information"
                    >
                      <Input
                        label="Company Name"
                        labelPlacement="outside"
                        name="companyName"
                        placeholder="Enter company name"
                        defaultValue="Fix Tune Motors"
                        type="text"
                        className="mb-12"
                        onChange={(e) =>
                          setCompanyInfo({
                            ...companyInfo,
                            companyName: e.target.value,
                          })
                        }
                      />
                      <Input
                        label="Phone"
                        labelPlacement="outside"
                        name="phone"
                        placeholder="Enter phone number"
                        defaultValue="+353 87 466 3350"
                        type="text"
                        className="mb-12"
                        onChange={(e) =>
                          setCompanyInfo({
                            ...companyInfo,
                            phone: e.target.value,
                          })
                        }
                      />
                      <Input
                        label="Email"
                        labelPlacement="outside"
                        name="email"
                        placeholder="Enter email"
                        defaultValue="fixtunemotors@gmail.com"
                        type="text"
                        className="mb-12"
                        onChange={(e) =>
                          setCompanyInfo({
                            ...companyInfo,
                            email: e.target.value,
                          })
                        }
                      />
                    </AccordionItem>
                  </Accordion>

                  <Input
                    label="Client Name"
                    labelPlacement="outside"
                    name="clientName"
                    placeholder="Enter client name"
                    type="text"
                  />
                  <Input
                    errorMessage="Please enter Registration Number"
                    label="REG"
                    labelPlacement="outside"
                    name="reg"
                    placeholder="Enter registration number"
                    type="text"
                  />
                  {jobs.map((job, index) => (
                    <div
                      className="grid grid-cols-8 gap-2 items-end"
                      key={index}
                    >
                      <Input
                        label="JOB"
                        labelPlacement="outside"
                        name={`jobDone_${index}`}
                        placeholder="Enter job"
                        type="text"
                        className="col-span-5"
                        value={job.job}
                        onChange={(e) => {
                          const newJobs = [...jobs];
                          newJobs[index].job = e.target.value;
                          setJobs(newJobs);
                        }}
                      />
                      <Input
                        label="(€)"
                        labelPlacement="outside"
                        name={`price_${index}`}
                        placeholder="€"
                        type="number"
                        step="0.01"
                        className="col-span-2"
                        value={job.price}
                        onChange={(e) => {
                          const newJobs = [...jobs];
                          newJobs[index].price = e.target.value;
                          setJobs(newJobs);
                        }}
                      />
                      {jobs.length > 1 && (
                        <div className="col-span-1 flex justify-end">
                          <Button
                            size="sm"
                            color="danger"
                            className="w-7 min-w-0 mt-6"
                            style={{ fontSize: "0.9rem", lineHeight: 1 }}
                            onPress={() => {
                              const newJobs = [...jobs];
                              newJobs.splice(index, 1);
                              setJobs(newJobs);
                            }}
                          >
                            X
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                  <div className="flex justify-start my-4">
                    <Button size="sm" color="success" onPress={handleAddJob}>
                      Add more
                    </Button>
                  </div>

                  <div className="flex gap-2 justify-end w-full">
                    <Button type="reset" variant="flat" size="sm">
                      Reset
                    </Button>
                    <Button
                      color="danger"
                      type="submit"
                      size="sm"
                      className="text-white"
                    >
                      Invoice (Sever)
                    </Button>
                    <Button
                      color="danger"
                      type="button"
                      size="sm"
                      className="text-white"
                      onPress={() =>
                        handlePrintInvoiceClient(invoiceData, companyInfo)
                      }
                    >
                      Invoice (Client)
                    </Button>
                  </div>
                </Form>
              </div>
            </Tab>
            <Tab key="Add_Machine" title="Add Machine">
              <div>
                <AddDataForm user={user} setTableData={setTableData} />
              </div>
            </Tab>
            <Tab key="read" title="Read Database">
              <div>
                <CarTable
                  user={user}
                  tableData={tableData}
                  setTableData={setTableData}
                />
              </div>
            </Tab>

            <Tab key="select" title="Options">
              <div className="mb-4 flex justify-center gap-4 m-8 min-h-screen">
                <Button
                  color="danger"
                  onPress={signOut}
                  className="text-white"
                  size="sm"
                >
                  SignOut
                </Button>
                <Button
                  color="danger"
                  onPress={handleExportCSV}
                  className="text-white"
                  size="sm"
                  isDisabled={!user?.write}
                >
                  Export as CSV
                </Button>
                <Button
                  color="danger"
                  onPress={() =>
                    createInvoice(
                      "Example Job",
                      "ABC123",
                      "Toyota",
                      "Oil change",
                      123456,
                      "John Doe",
                      "+123456789",
                      100
                    )
                  }
                  className="text-white"
                  size="sm"
                  isDisabled={!user?.write}
                >
                  Create Invoice
                </Button>
              </div>
            </Tab>
          </Tabs>
        </div>
        {showInvoice && invoiceData && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded shadow-lg w-full max-w-lg relative">
              <button
                className="absolute top-2 right-2 text-red-500"
                onClick={() => setShowInvoice(false)}
              >
                ✕
              </button>
              <div ref={invoiceRef}>
                <h2 className="text-2xl font-bold mb-4">Invoice</h2>
                <table>
                  <tbody>
                    <tr>
                      <th>Job</th>
                      <td>{invoiceData.jobDone}</td>
                    </tr>
                    <tr>
                      <th>Reg</th>
                      <td>{invoiceData.reg}</td>
                    </tr>
                    <tr>
                      <th>Car Model</th>
                      <td>{invoiceData.carmodel}</td>
                    </tr>
                    <tr>
                      <th>Description</th>
                      <td>{invoiceData.description}</td>
                    </tr>
                    <tr>
                      <th>Mileage</th>
                      <td>{invoiceData.mileage}</td>
                    </tr>
                    <tr>
                      <th>Client Name</th>
                      <td>{invoiceData.clientname}</td>
                    </tr>
                    <tr>
                      <th>Phone</th>
                      <td>{invoiceData.phone}</td>
                    </tr>
                    <tr>
                      <th>Price</th>
                      <td>{invoiceData.price} €</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <button
                className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
                onClick={handlePrintInvoice}
              >
                Print as PDF
              </button>
            </div>
          </div>
        )}
      </div>
    </DefaultLayout>
  );
}
