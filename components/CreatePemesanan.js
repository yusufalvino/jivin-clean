import { useState } from "react";
import { toast } from "react-toastify";
import { useDaftarPaket, useDataCustomer } from "../lib/swr.fetch";

const CreatePemesanan = () => {
  const [id_customer, setId_customer] = useState("");
  const [jenis_paket, setJenis_paket] = useState("");
  const [tgl_pemesanan, setTgl_pemesanan] = useState("");
  const [status_pemesanan, setStatus_pemesanan] = useState("");
  const [status_pembayaran, setStatus_pembayaran] = useState(false);
  const [jumlah_drop_sepatu, setJumlah_drop_sepatu] = useState(0);
  const [total_pembayaran, setTotal_pembayaran] = useState(0);

  const { data: dataPack, error: errPacket } = useDaftarPaket();
  const { data: dataCust, error: errCust } = useDataCustomer();

  if (errCust && errPacket) {
    return <div>Error Landing</div>;
  }
  if (!dataCust && !dataPack) {
    return <div>Loading</div>;
  }
  console.log(dataPack);
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
  return (
    <div className="container justify-content-center">
      <form
        className="mx-auto shadow p-4"
        onSubmit={submitHandler}
        style={{ maxWidth: "500px" }}
      >
        <h2 className="text-center mb-6">Input Data Pemesanan</h2>

        <div className="w-100">
          <select
            className="form-select mb-3"
            aria-label="Default select example"
            defaultValue={"default"}
            onChange={(e) => setId_customer(e.target.value)}
          >
            <option disabled value={"default"}>
              Pilih customer
            </option>
            {dataCust?.map((v, id) => {
              return (
                <option key={id} value={v.id_customer}>
                  {v.nama + " " + v.alamat}
                </option>
              );
            })}
          </select>

          <select
            className="form-select mb-3"
            aria-label="Default select example"
            defaultValue={"default"}
            onChange={(e) => setJenis_paket(e.target.value)}
          >
            <option disabled value={"default"}>
              Pilih Paket
            </option>
            {dataPack?.map((v, id) => {
              return (
                <option key={id} value={v.jenis_paket_cuci}>
                  {v.jenis_paket_cuci}
                </option>
              );
            })}
          </select>
          <div className="form-floating">
            <input
              className="form-control mb-2"
              type="text"
              id="sepatu"
              value={jumlah_drop_sepatu}
              onChange={(e) => setJumlah_drop_sepatu(e.target.value)}
            />
            <label htmlFor="sepatu">Jumlah Drop Sepatu</label>
          </div>
          <div className="form-floating">
            <input
              disabled
              className="form-control mb-2"
              type="text"
              value={total_pembayaran}
              onChange={(e) => setTotal_pembayaran(e.target.value)}
            />
            <label htmlFor="nama">Total Pembayaran</label>
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

          <label htmlFor="nama">Status Pemesanan</label>
          <select
            defaultValue={"default"}
            className="form-select mb-3"
            onChange={(e) => setStatus_pemesanan(e.target.value)}
          >
            <option disabled defaultValue={"default"}>
              Pilih status pemesanan
            </option>
            <option value="Belum Selesai">Belum Selesai</option>
            <option value="On Progress">On Progress</option>
            <option value="Sudah Selesai">Sudah Selesai</option>
          </select>
          <label htmlFor="nama">Status Bayar</label>
          <select
            defaultValue={"default"}
            className="form-select"
            onChange={(e) => setStatus_pembayaran(e.target.value)}
          >
            <option disabled defaultValue={"default"}>
              Pilih status bayar
            </option>
            <option value={true}>Sudah Bayar</option>
            <option value={false}>Belum Bayar</option>
          </select>
        </div>
        <div className="mt-4 d-flex flex-row-reverse">
          <button className="btn btn-primary w-100 " type="submit">
            Simpan
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePemesanan;
