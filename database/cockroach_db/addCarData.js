import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
  connectionString: "postgresql://deividas:fawf6NdDS3nEzmi3aRFyQw@fixtunemotors-10683.j77.aws-eu-west-1.cockroachlabs.cloud:26257/fixtunemotors?sslmode=verify-full",
});

export default async function addCarData(params) {
  const query = `
    INSERT INTO car_history.main 
    (reg, date, job, description, carModel, mileage, clientName, phone, price) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
  `;

  const values = [
    params.reg,
    params.date,
    params.job,
    params.description,
    params.carModel,
    params.mileage,
    params.clientName,
    params.phone,
    params.price,
  ];

  try {
    const client = await pool.connect(); // Get a client from the pool
    try {
      const results = await client.query(query, values);
      console.log("Insert successful:", results.rowCount);
      return results.rowCount; // Return the number of rows inserted
    } finally {
      client.release(); // Release the client back to the pool
    }
  } catch (err) {
    console.error("Error executing query:", err);
    throw err; // Re-throw the error to handle it in the calling function
  }
}