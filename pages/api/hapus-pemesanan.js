//@ts-check

import { db } from "../../lib/db";

const handler = async (req, res) => {
  const { id_pemesanan } = req.query;

  try {
    if (!id_pemesanan) {
      return res.status(400).json({ message: "`id_pemesanan` tidak ada" });
    }

    const results = await db.query(
      `DELETE FROM data_pemesanan WHERE id_pemesanan = ?`,
      id_pemesanan
    );
    res.json(results);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export default handler;
