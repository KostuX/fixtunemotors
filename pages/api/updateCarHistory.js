import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import updateCarHistory from "../../database/cockroach_db/updateCarHistory";

export default async function handler(req, res) {
  // Check if the user is signed in
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    // If no session, return a 401 Unauthorized response
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.method !== "PUT") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const data = req.body;

console.log(data)
 
 
  let date_str = data.date;
  const toDateString = ({ year, month, day }) => {
    const pad = (n) => n.toString().padStart(2, "0");
    return `${year}-${pad(month)}-${pad(day)}`;
  };


  if (typeof date_str !== "string") {
    date_str =  toDateString(date_str);
  }
 
  data.mileage = parseInt(data.mileage);
  data.price = parseFloat(data.price);

  // Input validation
  const errors = [];

  if (!data.reg || typeof data.reg !== "string" || data.reg.length > 20) {
    errors.push("Invalid REG: must be a string with a maximum length of 20.");
  }

  if (!date_str || typeof date_str !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(date_str)) {
    errors.push("Invalid DATE: must be a string in the format YYYY-MM-DD.");
  }

  if (!data.job || typeof data.job !== "string" || data.job.length > 50) {
    errors.push("Invalid JOB: must be a string with a maximum length of 50.");
  }

  if (data.description && (typeof data.description !== "string" || data.description.length > 1000)) {
    errors.push("Invalid DESCRIPTION: must be a string with a maximum length of 1000.");
  }

  if (!data.carmodel) {data.carmodel = ''}
  if ( data.carmodel && (typeof data.carmodel !== "string" || data.carmodel.length > 20)) {
    errors.push("Invalid CAR MODEL: must be a string with a maximum length of 20.");
  }

  if (
    data.mileage === undefined ||
    typeof data.mileage !== "number" ||
    data.mileage < 0 ||
    data.mileage > 10000000
  ) {
    errors.push("Invalid MILEAGE: must be a number between 0 and 10000000.");
  }
  if (!data.clientname) {data.clientname = ''}
  if (typeof data.clientname !== "string" || data.clientname.length > 50) {
    errors.push("Invalid CLIENT NAME: must be a string with a maximum length of 50.");
  }
  if (!data.phone) {data.phone = ''}
  if (typeof data.phone !== "string" || data.phone.length > 20) {
    errors.push("Invalid CLIENT PHONE: must be a string with a maximum length of 20.");
  }

  if (
    data.price === undefined ||
    typeof data.price !== "number" ||
    data.price < 0 ||
    data.price > 100000
  ) {
    errors.push("Invalid PRICE: must be a number between 0 and 100000.");
  }

  // If there are validation errors, return them
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  // If validation passes, proceed with the database operation
  try {
    const updatedRow = await updateCarHistory(data); // Call your database function

    console.log("Updated row:", updatedRow);
    res.status(200).json(updatedRow); // Return the updated row
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}