import { db } from "../../lib/db";

const handler = async (req, res) => {
  const { search } = req.query;
  try {
    const results = await db.query(
      `SELECT * FROM data_pemesanan WHERE id_pemesanan = ?`,
      search
    );
    console.log(results);
    return res.json(results);
    await db.end;
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export default handler;
