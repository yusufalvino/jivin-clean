import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useDaftarPaket, useDataCustomer } from "../lib/swr.fetch";
import axios from "axios";

const CreatePemesanan = () => {
  const [id_customer, setId_customer] = useState("");
  const [jenis_paket, setJenis_paket] = useState();
  const [tgl_pemesanan, setTgl_pemesanan] = useState("");
  const [status_pemesanan, setStatus_pemesanan] = useState("");
  const [status_pembayaran, setStatus_pembayaran] = useState(0);
  const [datacustByID, setDatacustById] = useState([]);
  const [datapaketByID, setDatapaketById] = useState([]);
  const [total_pembayaran, setTotal_pembayaran] = useState(0);
  const [total_harga, setTotal_harga] = useState(0);

  const { data: dataPack, error: errPacket } = useDaftarPaket();
  const { data: dataCust, error: errCust } = useDataCustomer();

  if (errCust && errPacket) {
    return <div>Error Landing</div>;
  }
  if (!dataCust && !dataPack) {
    return <div>Loading</div>;
  }

  const SelectCustomer = async (idcust) => {
    setId_customer(idcust);
    var custId = await axios.get(
      `http://localhost:3000/api/datacustomer/byID?id=${idcust}`
    );

    setDatacustById(custId.data.data);
  };

  const SelectPaket = async (idpaket) => {
    setJenis_paket(idpaket);
    var paketID = await axios.get(
      `http://localhost:3000/api/daftarpaket/byID?id=${idpaket}`
    );

    setDatapaketById(paketID.data.data);

    let totalbayar =
      datacustByID[0]?.jumlah_drop_sepatu *
      parseInt(paketID.data.data[0].harga_paket_cuci);

    setTotal_pembayaran(totalbayar);
  };

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
          status_pembayaran,
          total_pembayaran,
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
    <div className="container justify-content-center ">
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
            onChange={(e) => SelectCustomer(e.target.value)}
          >
            <option>Pilih customer</option>
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
            onChange={(e) => SelectPaket(e.target.value)}
          >
            <option>Pilih Paket</option>
            {dataPack?.map((v, id) => {
              return (
                <option key={id} value={v.id_paket}>
                  {v.jenis_paket_cuci}
                </option>
              );
            })}
          </select>
          <div className="form-floating">
            <input
              className="form-control mb-2"
              disabled
              type="text"
              id="sepatu"
              value={
                datacustByID.map((v) => v.jumlah_drop_sepatu) == 0
                  ? 0
                  : datacustByID.map((v) => v.jumlah_drop_sepatu)
              }
            />
            <label htmlFor="sepatu">Jumlah Drop Sepatu</label>
          </div>
          <div className="form-floating">
            <input
              disabled
              className="form-control mb-2"
              type="number"
              value={
                datapaketByID != 0
                  ? datapaketByID.map((v) => v.harga_paket_cuci)
                  : 0
              }
              onChange={(e) => setTotal_harga(e.target.value)}
            />
            <label htmlFor="nama">Harga</label>
          </div>
          <div className="form-floating">
            <input
              disabled
              className="form-control mb-2"
              type="text"
              value={total_pembayaran}
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
            <option>Pilih status pemesanan</option>
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
            <option defaultValue={"default"}>Pilih status bayar</option>
            <option value="1">Sudah Bayar</option>
            <option value="0">Belum Bayar</option>
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
