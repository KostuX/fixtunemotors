import pg from "pg";
const { Pool, Client } = pg;


const connection = "postgresql://deividas:fawf6NdDS3nEzmi3aRFyQw@fixtunemotors-10683.j77.aws-eu-west-1.cockroachlabs.cloud:26257/fixtunemotors?sslmode=verify-full"


const client = new Client(connection);

export default async function test(){
  await client.connect();
  try {
    const results = await client.query("INSERT INTO car_history.main (reg, date, job) VALUES ('nbn', '2025-04-11', 'dfdsf');");
    console.log(results);
  } catch (err) {
    console.error("error executing query:", err);
  } finally {
    client.end();
  }
}