import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
  connectionString: "postgresql://deividas:fawf6NdDS3nEzmi3aRFyQw@fixtunemotors-10683.j77.aws-eu-west-1.cockroachlabs.cloud:26257/fixtunemotors?sslmode=verify-full",
});

export default async function getUser(username) {
  const sanitizedUsername = username.replace(/[^a-zA-Z0-9_]/g, ""); // Sanitize the username to prevent SQL injection
  if (sanitizedUsername.length < 3 || sanitizedUsername.length > 20) {
    throw new Error("Invalid username length");
  }

  let user = sanitizedUsername.toLowerCase(); // Convert username to lowercase
  const query = `SELECT * FROM car_history.user WHERE username ILIKE $1;`; // Use a parameterized query
  const values = [user]; // Pass the username as a parameter

  try {
    const client = await pool.connect(); // Get a client from the pool
    try {
      const results = await client.query(query, values); // Use the prepared statement
      return results.rows; // Return the rows from the query
    } finally {
      client.release(); // Release the client back to the pool
    }
  } catch (err) {
    console.error("Error executing query:", err);
    throw err; // Re-throw the error to handle it in the calling function
  }
}