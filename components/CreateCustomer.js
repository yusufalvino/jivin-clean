import react from "react";
import { useState } from "react";
import { toast } from "react-toastify";

const CreateCustomer = () => {
  const [nama, setNama] = useState("");
  const [alamat, setAlamat] = useState("");
  const [no_hp, setNo_hp] = useState("");
  const [jumlah_drop_sepatu, setJumlah_drop_sepatu] = useState("");

  async function submitHandler(e) {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/api/create-customer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nama,
          alamat,
          no_hp,
          jumlah_drop_sepatu,
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
          <h2 className="text-center mb-4">Input Data Customer</h2>

          <div className="w-100">
            <div className="form-floating">
              <label htmlFor="nama">Nama</label>
              <input
                className="form-control mb-2"
                id="Nama"
                type="text"
                placeholder="Nama"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
              />
            </div>

            <div className="form-floating">
              <label htmlFor="nama">Alamat</label>
              <input
                className="form-control mb-2"
                id="Alamat"
                type="text"
                placeholder="Alamat"
                value={alamat}
                onChange={(e) => setAlamat(e.target.value)}
              />
            </div>

            <div className="form-floating">
              <label htmlFor="nama">No HP</label>
              <input
                className="form-control mb-2"
                id="No HP"
                type="text"
                placeholder="No HP"
                value={no_hp}
                onChange={(e) => setNo_hp(e.target.value)}
              />
            </div>

            <div className="form-floating">
              <label htmlFor="nama">Jumlah Drop Sepatu</label>
              <input
                className="form-control mb-2"
                id="Jumlah Drop Sepatu"
                type="text"
                placeholder="Jumlah Drop Sepatu"
                value={jumlah_drop_sepatu}
                onChange={(e) => setJumlah_drop_sepatu(e.target.value)}
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

export default CreateCustomer;
