import Head from "next/head";
import Router, { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const UpdatePemesanan = () => {
  const [_id_customer, setId_customer] = useState("");
  const [_jenis_paket, setJenis_paket] = useState("");
  const [_tgl_pemesanan, setTgl_pemesanan] = useState("");
  const [_status_pemesanan, setStatus_pemesanan] = useState("");
  const [_id_pemesanan, setId_pemesanan] = useState("");

  const router = useRouter();
  const {
    id_customer,
    jenis_paket,
    tgl_pemesanan,
    status_pemesanan,
    id_pemesanan,
  } = router.query;

  useEffect(() => {
    if (typeof id_customer == "string") {
      setId_customer(id_customer);
    }
    if (typeof jenis_paket == "string") {
      setJenis_paket(jenis_paket);
    }
    if (typeof tgl_pemesanan == "string") {
      setTgl_pemesanan(tgl_pemesanan);
    }
    if (typeof status_pemesanan == "string") {
      setStatus_pemesanan(status_pemesanan);
    }
    if (typeof id_pemesanan == "string") {
      setId_pemesanan(id_pemesanan);
    }
  }, [id_customer, jenis_paket, tgl_pemesanan, status_pemesanan, id_pemesanan]);

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
          jenis_paket: _jenis_paket,
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
          <label htmlFor="exampleInputPassword1">Id Customer</label>
          <input
            type="text"
            placeholder="Id Customer"
            className="form-control"
            id="id_customer"
            value={_id_customer}
            onChange={(e) => setId_customer(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Jenis Paket</label>
          <input
            type="text"
            placeholder="Jenis Paket"
            className="form-control"
            id="jenis_paket"
            value={_jenis_paket}
            onChange={(e) => setJenis_paket(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Tanggal Pemesanan</label>
          <input
            type="text"
            placeholder="Tanggal Pemesanan"
            className="form-control"
            id="tgl_pemesanan"
            value={_tgl_pemesanan}
            onChange={(e) => setTgl_pemesanan(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Status Pemesanan</label>
          <input
            type="text"
            placeholder="Status Pemesanan"
            className="form-control"
            id="status_pemesanan"
            value={_status_pemesanan}
            onChange={(e) => setStatus_pemesanan(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Update
        </button>
      </form>
    </>
  );
};

export default UpdatePemesanan;
