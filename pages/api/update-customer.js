import { db } from "../../lib/db";

const handler = async (req, res) => {
  const { id_customer, nama, alamat, no_hp, jumlah_drop_sepatu } = req.body;
  try {
    if (!nama || !alamat || !no_hp || !jumlah_drop_sepatu) {
      return res.status(400).json({ message: "Input Harus di isi semua" });
    }

    const results = await db.query(
      `UPDATE data_customer set nama =?,  alamat = ?, no_hp = ?, jumlah_drop_sepatu = ?
    WHERE id_customer = ?`,
      [nama, alamat, no_hp, jumlah_drop_sepatu, id_customer]
    );

    return res.json(results);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export default handler;
