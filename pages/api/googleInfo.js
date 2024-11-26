// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  const api_key = process.env.GOOGLE_MAP_API;
  const company_reference = process.env.COMPANY_REFERENCE;
  let endpoint = `https://maps.googleapis.com/maps/api/place/details/json?reference=${company_reference}&key=${api_key}`;

  let data = {};
  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const res = await response.json();

    data = res.result;
   
  } catch (error) {
    console.error(error);
  }
  res.status(200).json({ data: data });
}
