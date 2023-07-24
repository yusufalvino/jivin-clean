import { db } from "../../lib/db";

const handler = async (req, res) => {
  const { id_customer, jenis_paket, tgl_pemesanan, status_pemesanan } =
    req.body;
  try {
    if (!id_customer || !jenis_paket || !tgl_pemesanan || !status_pemesanan) {
      return res.status(400).json({ message: "Input harus di isi semua" });
    }
    const results = await db.query(
      `
            INSERT INTO data_pemesanan (id_customer, jenis_paket, tgl_pemesanan, status_pemesanan)
            VALUES (?,?,?,?)`,
      [id_customer, jenis_paket, tgl_pemesanan, status_pemesanan]
    );
    await db.end;

    return res.json(results);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
export default handler;
