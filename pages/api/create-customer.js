import { db } from "../../lib/db";

const handler = async (req, res) => {
  const { nama, alamat, no_hp, jumlah_drop_sepatu } = req.body;
  try {
    if (!nama || !alamat || !no_hp || !jumlah_drop_sepatu) {
      return res.status(400).json({ message: "Input harus di isi semua" });
    }
    const results = await db.query(
      `
            INSERT INTO data_customer (nama, alamat, no_hp, jumlah_drop_sepatu)
            VALUES (?,?,?,?)`,
      [nama, alamat, no_hp, jumlah_drop_sepatu]
    );
    await db.end;

    return res.json(results);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
export default handler;
