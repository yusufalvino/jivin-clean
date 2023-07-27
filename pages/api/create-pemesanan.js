import { db } from "../../lib/db";

const handler = async (req, res) => {
  const {
    id_customer,
    jenis_paket,
    tgl_pemesanan,
    status_pemesanan,
    status_pembayaran,
    total_pembayaran,
  } = req.body;
  console.log(req.body);
  try {
    if (
      !id_customer ||
      !jenis_paket ||
      !tgl_pemesanan ||
      !status_pemesanan ||
      !status_pembayaran ||
      !total_pembayaran
    ) {
      return res.status(400).json({ message: "Input harus di isi semua" });
    }
    const results = await db.query(
      `
            INSERT INTO data_pemesanan (id_customer, id_paket, tgl_pemesanan, status_pemesanan,status_pembayaran,total_pembayaran)
            VALUES (?,?,?,?,?,?)`,
      [
        id_customer,
        jenis_paket,
        tgl_pemesanan,
        status_pemesanan,
        status_pembayaran,
        total_pembayaran,
      ]
    );
    await db.end;

    return res.json(results);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
export default handler;
