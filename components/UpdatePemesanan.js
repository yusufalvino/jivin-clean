import Head from "next/head";
import Router, { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDaftarPaket, useDataCustomer } from "../lib/swr.fetch";
import axios from "axios";
const UpdatePemesanan = () => {
  const [_id_customer, setId_customer] = useState(0);
  const [_jenis_paket, setJenis_paket] = useState(0);
  const [_tgl_pemesanan, setTgl_pemesanan] = useState("");
  const [_status_pemesanan, setStatus_pemesanan] = useState("");
  const [_status_pembayaran, setStatus_pembayaran] = useState(0);
  const [_id_pemesanan, setId_pemesanan] = useState(0);
  const [_total_pembayaran, setTotal_pembayaran] = useState(0);
  const [datacustByID, setDatacustById] = useState([]);
  const [datapaketByID, setDatapaketById] = useState([]);
  const [total_harga, setTotal_harga] = useState(0);

  const { data: dataPack, error: errPacket } = useDaftarPaket();
  const { data: dataCust, error: errCust } = useDataCustomer();

  // if (errCust && errPacket) {
  //   return <div>Error Landing</div>;
  // }
  // if (!dataCust && !dataPack) {
  //   return <div>Loading</div>;
  // }

  const router = useRouter();
  const {
    id_customer,
    jenis_paket,
    tgl_pemesanan,
    status_pemesanan,
    status_pembayaran,
    total_pembayaran,
    jumlah_drop_sepatu,
    id_pemesanan,
    harga_paket_cuci,
  } = router.query;

  useEffect(() => {
    if (typeof id_customer == "number") {
      setId_customer(id_customer);
    }
    if (typeof jenis_paket == "number") {
      setJenis_paket(jenis_paket);
    }
    if (typeof tgl_pemesanan == "string") {
      setTgl_pemesanan(tgl_pemesanan);
    }
    if (typeof status_pemesanan == "string") {
      setStatus_pemesanan(status_pemesanan);
    }
    if (typeof id_pemesanan == "number") {
      setId_pemesanan(id_pemesanan);
    }
    if (typeof status_pembayaran == "number") {
      setId_pemesanan(status_pembayaran);
    }
  }, [
    id_customer,
    jenis_paket,
    tgl_pemesanan,
    status_pemesanan,
    id_pemesanan,
    status_pembayaran,
  ]);

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
      const res = await fetch("/api/update-pemesanan", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_pemesanan: _id_pemesanan,
          id_customer: _id_customer,
          id_paket: _jenis_paket,
          tgl_pemesanan: _tgl_pemesanan,
          status_pemesanan: _status_pemesanan,
        }),
      });

      const json = await res.json();
      if (!res.ok) throw Error(json.message);
      alert("Update data sukses");

      Router.push("/admin/datapemesanan");
    } catch (e) {
      throw Error(e.message);
    }
  }

  return (
    <>
      <Head>
        <title>Ubah Data Pemesanan</title>
        <link rel="icon" href="/lg.png" />
      </Head>
      <div className=" mt-5">
        <div className="text-center"></div>
      </div>
      <form
        className="mx-auto shadow p-4"
        onSubmit={submitHandler}
        style={{ maxWidth: "500px" }}
      >
        <h3 className="display-12" style={{ color: "black" }}>
          <>Edit Data Pemesanan</>
        </h3>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">PIlih Customer</label>
          <select
            className="form-select form-control"
            name=""
            id=""
            value={id_customer}
            onChange={(e) => SelectCustomer(e.target.value)}
          >
            <option>Pilih Customer</option>
            {dataCust?.map((v, id) => {
              return (
                <option key={id} value={v.id_customer}>
                  {v.nama + " " + v.alamat}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Pilih Paket</label>
          <select
            className="form-select form-control"
            name=""
            id=""
            value={jenis_paket}
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
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Jumlah Drop Sepatu</label>
          <input
            type="text"
            disabled
            className="form-control"
            id=""
            value={jumlah_drop_sepatu}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Harga</label>
          <input
            type="text"
            disabled
            className="form-control"
            id=""
            value={harga_paket_cuci}
            // onChange={(e) => setTgl_pemesanan(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Total Pembayaran</label>
          <input
            type="text"
            disabled
            className="form-control"
            id=""
            value={total_pembayaran}
            // onChange={(e) => setTgl_pemesanan(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Tanggal Pemesanan</label>
          <input
            type="date"
            placeholder="Tanggal Pemesanan"
            className="form-control"
            id="tgl_pemesanan"
            value={tgl_pemesanan}
            onChange={(e) => setTgl_pemesanan(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Status Pemesanan</label>
          <select
            className="form-select form-control"
            name=""
            id=""
            value={_status_pemesanan}
            onChange={(e) => setStatus_pemesanan(e.target.value)}
          >
            <option>Pilih status pemesanan</option>
            <option value="Belum Selesai">Belum Selesai</option>
            <option value="On Progress">On Progress</option>
            <option value="Sudah Selesai">Sudah Selesai</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Status Pembayaran</label>
          <select
            className="form-select form-control"
            name=""
            id=""
            value={status_pembayaran}
            onChange={(e) => setStatus_pembayaran(e.target.value)}
          >
            <option defaultValue={"default"}>Pilih status bayar</option>
            <option value="1">Sudah Bayar</option>
            <option value="0">Belum Bayar</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Update
        </button>
      </form>
    </>
  );
};

export default UpdatePemesanan;
