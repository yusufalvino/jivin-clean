import { db } from "../../lib/db";

export default async (req, res) => {
  // Cek apakah request merupakan POST request
  if (req.method === "POST") {
    // Ambil data username dan password dari request body
    const { username, password } = req.body;

    // Lakukan query untuk mencari admin dengan username dan password yang sesuai
    const result = await db.query(
      `SELECT * FROM admin_login WHERE username = ? AND password = ?`,
      [username, password]
    );

    // Cek apakah ada admin yang ditemukan
    if (result.length > 0) {
      // Jika ada, set status code ke 200 (OK) dan kirimkan data admin ke client
      res.status(200).json(result[0]);
    } else {
      // Jika tidak ada, set status code ke 401 (Unauthorized) dan kirimkan pesan error ke client
      res.status(401).json({ message: "Invalid username or password" });
    }
  } else {
    // Jika request bukan POST request, set status code ke 405 (Method Not Allowed) dan kirimkan header yang sesuai
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
