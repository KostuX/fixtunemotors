// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  let endpoint = "https://maps.googleapis.com/maps/api/place/details/json?reference=ChIJ4RVcCAANXkgRZhQOVDyUKgA&key=AIzaSyBL8eEeLOenEzeDk_4jMUx-C45KGtNrDfM"
  let data = {}
  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    
    const res  = await response.json();
     data = res.result.reviews

  
  
  } catch (error) {
    console.error(error);
  }
  res.status(200).json({reviews:data});
}
