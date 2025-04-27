import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
  connectionString: "postgresql://deividas:fawf6NdDS3nEzmi3aRFyQw@fixtunemotors-10683.j77.aws-eu-west-1.cockroachlabs.cloud:26257/fixtunemotors?sslmode=verify-full",
});

export default async function deleteCarHistory(id) {
  const query = `DELETE FROM car_history.main WHERE id = $1;`; // Parameterized query
  const values = [id]; // Pass the id as a parameter

  try {
    const client = await pool.connect(); // Get a client from the pool
    try {
      const result = await client.query(query, values); // Execute the DELETE query
      return result.rowCount; // Return the number of rows deleted
    } finally {
      client.release(); // Release the client back to the pool
    }
  } catch (err) {
    console.error("Error executing query:", err);
    throw err; // Re-throw the error to handle it in the calling function
  }
}