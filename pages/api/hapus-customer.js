//@ts-check

import { db } from "../../lib/db";

const handler = async (req, res) => {
  const { id_customer } = req.query;

  try {
    if (!id_customer) {
      return res.status(400).json({ message: "`id_customer` tidak ada" });
    }

    const results = await db.query(
      `DELETE FROM data_customer WHERE id_customer = ?`,
      id_customer
    );
    res.json(results);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export default handler;
