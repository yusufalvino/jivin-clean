import react from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDataCustomer } from "../lib/swr.fetch";

const CreatePemesanan = () => {
  const { dataCust, errorCust } = useDataCustomer();

  const [id_customer, setId_customer] = useState("");
  const [jenis_paket, setJenis_paket] = useState("");
  const [tgl_pemesanan, setTgl_pemesanan] = useState("");
  const [status_pemesanan, setStatus_pemesanan] = useState("");

  async function submitHandler(e) {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/api/create-pemesanan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_customer,
          jenis_paket,
          tgl_pemesanan,
          status_pemesanan,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw Error(json.message);
      toast.success("Penambahan Data Sukses");
    } catch (e) {
      throw Error(e.message);
    }
  }
  if (errorCust) {
    return <div>Error Landing</div>;
  }
  if (!dataCust) {
    return <div>Loading</div>;
  }
  return (
    <div>
      <div className="container justify-content-center">
        <form
          className="mx-auto shadow p-4"
          onSubmit={submitHandler}
          style={{ maxWidth: "500px" }}
        >
          <h2 className="text-center mb-6">Input Data Pemesanan</h2>

          <div className="w-100">
            <div className="form-floating">
              <label htmlFor="nama">Status Pemesanan</label>
              <select
                className="form-select"
                onChange={(e) => setStatus_pemesanan(e.target.value)}
              >
                {dataCust.map((v) => {
                  return <option value={v.id_customer}>{v.nama}</option>;
                })}
              </select>
            </div>

            <div className="form-floating">
              <input
                className="form-control"
                id="paket"
                type="text"
                placeholder="Jenis Paket"
                value={jenis_paket}
                onChange={(e) => setJenis_paket(e.target.value)}
              />
              <label htmlFor="paket">Jenis Paket</label>
            </div>

            <div className="">
              <label htmlFor="nama">Tanggal Pemesanan</label>
              <input
                className="form-control mb-3"
                id="Tanggal Pemesanan"
                type="date"
                placeholder="Tanggal Pemesanan"
                value={tgl_pemesanan}
                onChange={(e) => setTgl_pemesanan(e.target.value)}
              />
            </div>

            <div className="">
              <label htmlFor="nama">Status Pemesanan</label>
              <select
                className="form-select"
                onChange={(e) => setStatus_pemesanan(e.target.value)}
              >
                <option value="1">Belum Selesai</option>
                <option value="2">On Progress</option>
                <option value="3">Sudah Selesai</option>
              </select>
              {/* <input
                className="form-control mb-3"
                id="Status Pemesanan"
                type="text"
                placeholder="Status Pemesanan"
                value={status_pemesanan}
                onChange={(e) => setStatus_pemesanan(e.target.value)}
              /> */}
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

export default CreatePemesanan;
