import deleteCarHistory from '../../database/cockroach_db/deleteCarHistory'

export default async function handler(req, res) {
  if (req.method === "DELETE") {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ error: "ID is required" });
    }

    try {
      const rowsDeleted = await deleteCarHistory(id);
      if (rowsDeleted > 0) {
        return res.status(200).json({ message: "Record deleted successfully" });
      } else {
        return res.status(404).json({ error: "Record not found" });
      }
    } catch (error) {
      console.error("Error deleting record:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.setHeader("Allow", ["DELETE"]);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}