import getCarHistory from '../../database/cockroach_db/getCarHistory';

export default async function handler(req, res) {


  let db_data = await getCarHistory()

  return res.status(200).json(db_data)
}