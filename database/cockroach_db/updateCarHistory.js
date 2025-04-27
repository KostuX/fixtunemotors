import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
  connectionString: "postgresql://deividas:fawf6NdDS3nEzmi3aRFyQw@fixtunemotors-10683.j77.aws-eu-west-1.cockroachlabs.cloud:26257/fixtunemotors?sslmode=verify-full",
});

export default async function updateCarHistory(data) {

  console.log(data)
  const query = `
    UPDATE car_history.main
    SET reg = $1, date = $2, job = $3, description = $4, carmodel = $5, mileage = $6, clientname = $7, phone = $8, price = $9
    WHERE id = $10
    RETURNING *;
  `;
  const values = [
    data.reg,
    data.date,
    data.job,
    data.description,
    data.carmodel,
    data.mileage,
    data.clientname,
    data.phone,
    data.price,
    data.id,
  ];

  try {
    const client = await pool.connect();
    try {
      const result = await client.query(query, values);
      return result.rows[0]; // Return the updated row
    } finally {
      client.release();
    }
  } catch (err) {
    console.error("Error updating record:", err);
    throw err;
  }
}