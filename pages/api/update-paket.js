import { db } from "../../lib/db";

const handler = async (req, res) => {
  const { id_paket, jenis_paket_cuci, harga_paket_cuci } = req.body;
  try {
    if (!id_paket || !jenis_paket_cuci || !harga_paket_cuci) {
      return res.status(400).json({ message: "Input Harus di isi semua" });
    }

    const results = await db.query(
      `UPDATE daftar_paket set jenis_paket_cuci =?,  harga_paket_cuci = ?
    WHERE id_paket = ?`,
      [jenis_paket_cuci, harga_paket_cuci, id_paket]
    );

    return res.json(results);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export default handler;
