//@ts-check

import { db } from "../../lib/db";

const handler = async (req, res) => {
  const { id_paket } = req.query;

  try {
    if (!id_paket) {
      return res.status(400).json({ message: "`id_paket` tidak ada" });
    }

    const results = await db.query(
      `DELETE FROM daftar_paket WHERE id_paket = ?`,
      id_paket
    );
    res.json(results);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export default handler;
