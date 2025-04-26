import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]";
import getCarHistory from "../../database/cockroach_db/getCarHistory";

export default async function handler(req, res) {
  // Check if the user is signed in
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    // If no session, return a 401 Unauthorized response
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    // Fetch data from the database
    const db_data = await getCarHistory();
    return res.status(200).json(db_data);
  } catch (error) {
    console.error("Error fetching car history:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}