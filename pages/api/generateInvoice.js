import { cfg_site } from "/config/cfg_site";
import { ToWords } from "to-words";

export default async function handler(req, res) {
  const toWords = new ToWords();

  function parseJobs(formData) {
    const jobs = [];
    const entries = Object.entries(formData);

    entries.forEach(([key, value]) => {
      const match = key.match(/^(jobDone|price)_(\d+)$/); // Match keys like jobDone_0, price_0
      if (match) {
        const [, field, index] = match;
        const jobIndex = Number(index);

        // Ensure the job exists in the array
        if (!jobs[jobIndex]) {
          jobs[jobIndex] = { job: "", price: "" };
        }

        // Assign the value to the correct field
        jobs[jobIndex][field === "jobDone" ? "job" : "price"] = value;
      }
    });

    return jobs;
  }

  if (req.method === "POST") {
    const data = req.body;
    let invoiceData = parseJobs(data.invoiceData);
    const companyInfo = data.companyInfo;
    const jobs = data.jobs;
    const sum = jobs.reduce(
      (acc, job) => acc + (parseFloat(job.price) || 0),
      0
    );

    invoiceData.price = sum;

    function capitalizeAllWords(str) {
      return str
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    }

    // Generate HTML for the invoice
    const invoiceHTML = `
    <html>
      <head>
        <title>Invoice</title>
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
      </head>
      <body>
        <div class="inv-container">
          <div class="inv-header">
            <div class="inv-bold">
              <img src="https://www.fixtunemotors.ie/logo/logo_black.png" alt="logo" class="inv-logo" />
              <br>${companyInfo.www || ""}
              <br>${companyInfo.email || ""}
            </div>
            <div>
              <div class="inv-title">INVOICE</div>
              <div class="inv-bold">
                <br>${companyInfo.companyName || ""}
                <br>${companyInfo.phone || ""}
                <br>${companyInfo.address[0].long_name || ""}, ${
      companyInfo.address[1].long_name || ""
    }
                <br>${companyInfo.address[2].long_name || ""}
                <br>${companyInfo.address[3].long_name || ""}
                ${companyInfo.address[4].long_name || ""}
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
                    <td>${
                      job.price ? Number(job.price).toFixed(2) : "0.00"
                    }</td>
                  </tr>
                `
                )
                .join("")}
            </tbody>
            <tfoot>
              <tr>
                <td style="text-align:right;">TOTAL</td>
                <td>${
                  invoiceData.price
                    ? Number(invoiceData.price).toFixed(2)
                    : "0.00"
                } €</td>
              </tr>
              <tr>
                <td class="inv-price-words" colspan="2">
                  ${(() => {
                    const price = Number(invoiceData.price || 0).toFixed(2);
                    const [euros, cents] = price.split(".");
                    let words = toWords.convert(Number(euros)) + " euro";
                    if (Number(cents) > 0) {
                      words +=
                        " and " + toWords.convert(Number(cents)) + " cents";
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
      </body>
    </html>
    `;

    // Send HTML to client
    res.setHeader("Content-Type", "text/html");
    res.send(invoiceHTML);
  } else {
    res.status(405).send({ message: "Method not allowed" });
  }
}
