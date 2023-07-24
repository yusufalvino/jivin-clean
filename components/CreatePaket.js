import react from "react";
import { useState } from "react";
import { toast } from "react-toastify";

const CreatePaket = () => {
  const [jenis_paket_cuci, setJenis_paket_cuci] = useState("");
  const [harga_paket_cuci, setHarga_paket_cuci] = useState("");
  const [estimasi_paket, setEstimasi_paket] = useState("");

  async function submitHandler(e) {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/api/create-paket", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jenis_paket_cuci,
          harga_paket_cuci,
          estimasi_paket,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw Error(json.message);
      toast.success("Penambahan Data Sukses");
    } catch (e) {
      throw Error(e.message);
    }
  }
  return (
    <div>
      <div className="container mt-5 justify-content-center">
        <form
          className="mx-auto shadow p-4"
          onSubmit={submitHandler}
          style={{ maxWidth: "500px" }}
        >
          <h2 className="text-center mb-4">Input Daftar Paket</h2>

          <div className="w-100">
            <div className="form-floating">
              <label htmlFor="nama">Jenis Paket Cuci</label>
              <input
                className="form-control mb-2"
                id="Jenis Paket Cuci"
                type="text"
                placeholder="Jenis Paket Cuci"
                value={jenis_paket_cuci}
                onChange={(e) => setJenis_paket_cuci(e.target.value)}
              />
            </div>

            <div className="form-floating">
              <label htmlFor="nama">Harga Paket Cuci</label>
              <input
                className="form-control mb-2"
                id="Harga Paket Cuci"
                type="text"
                placeholder="Harga Paket Cuci"
                value={harga_paket_cuci}
                onChange={(e) => setHarga_paket_cuci(e.target.value)}
              />
            </div>

            <div className="form-floating">
              <label htmlFor="nama">Estimasi Paket</label>
              <input
                className="form-control mb-2"
                id="Estimasi Paket"
                type="text"
                placeholder="Estimasi Paket"
                value={estimasi_paket}
                onChange={(e) => setEstimasi_paket(e.target.value)}
              />
            </div>
          </div>
          <div className="mt-4 d-flex flex-row-reverse">
            <button className="btn btn-primary w-100 " type="submit">
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePaket;
