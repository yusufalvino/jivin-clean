import { db } from "../../../lib/db";

const handler = async (req, res) => {
  const { id } = req.query;
  try {
    const result = await db.query(
      `SELECT * FROM data_customer where id_customer = ?`,
      id
    );
    await db.end;

    return res.json({
      data: result,
      message: "Berhasil Medapatkan Data",
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
export default handler;
