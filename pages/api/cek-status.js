import { db } from "../../lib/db";

const handler = async (req, res) => {
  const { search } = req.query;
  try {
    const results = await db.query(
      `SELECT data_pemesanan.id_pemesanan,daftar_paket.harga_paket_cuci, data_customer.id_customer,data_customer.nama,data_customer.jumlah_drop_sepatu, daftar_paket.id_paket,daftar_paket.jenis_paket_cuci,data_pemesanan.tgl_pemesanan,data_pemesanan.status_pemesanan,data_pemesanan.status_pembayaran,data_pemesanan.total_pembayaran FROM ((data_pemesanan INNER JOIN data_customer ON data_pemesanan.id_customer = data_customer.id_customer) INNER JOIN daftar_paket ON data_pemesanan.id_paket = daftar_paket.id_paket) WHERE id_pemesanan = ?`,
      search
    );

    return res.json(results);
    await db.end;
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export default handler;
