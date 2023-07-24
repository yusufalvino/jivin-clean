import { db } from "../../lib/db";

const handler = async (req, res) => {
  const {
    id_pemesanan,
    id_customer,
    jenis_paket,
    tgl_pemesanan,
    status_pemesanan,
  } = req.body;
  try {
    if (
      !id_pemesanan ||
      !id_customer ||
      !jenis_paket ||
      !tgl_pemesanan ||
      !status_pemesanan
    ) {
      return res.status(400).json({ message: "Input Harus di isi semua" });
    }

    const results = await db.query(
      `UPDATE data_pemesanan set id_customer =? ,jenis_paket =?,  tgl_pemesanan = ?, status_pemesanan = ? 
    WHERE id_pemesanan = ?`,
      [id_customer, jenis_paket, tgl_pemesanan, status_pemesanan, id_pemesanan]
    );

    return res.json(results);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export default handler;
