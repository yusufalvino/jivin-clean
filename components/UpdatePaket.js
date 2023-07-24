import Head from "next/head";
import Router, { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const UpdatePaket = () => {
  const [_jenis_paket_cuci, setJenis_paket_cuci] = useState("");
  const [_harga_paket_cuci, setHarga_paket_cuci] = useState("");
  const [_estimasi_paket, setEstimasi_paket] = useState("");
  const [_id_paket, setId_paket] = useState("");

  const router = useRouter();
  const { jenis_paket_cuci, harga_paket_cuci, estimasi_paket, id_paket } =
    router.query;

  useEffect(() => {
    if (typeof jenis_paket_cuci == "string") {
      setJenis_paket_cuci(jenis_paket_cuci);
    }
    if (typeof harga_paket_cuci == "string") {
      setHarga_paket_cuci(harga_paket_cuci);
    }
    if (typeof estimasi_paket == "string") {
      setEstimasi_paket(estimasi_paket);
    }
    if (typeof id_paket == "string") {
      setId_paket(id_paket);
    }
  }, [jenis_paket_cuci, harga_paket_cuci, estimasi_paket, id_paket]);

  async function submitHandler(e) {
    e.preventDefault();
    try {
      const res = await fetch("/api/update-paket", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_paket: _id_paket,
          jenis_paket_cuci: _jenis_paket_cuci,
          harga_paket_cuci: _harga_paket_cuci,
          estimasi_paket: _estimasi_paket,
        }),
      });

      const json = await res.json();
      if (!res.ok) throw Error(json.message);
      alert("Update data sukses");

      Router.push("/admin/daftarpaket");
    } catch (e) {
      throw Error(e.message);
    }
  }

  return (
    <>
      <Head>
        <title>Ubah Daftar Paket </title>
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
        <h3 className="display-12 text-center" style={{ color: "black" }}>
          <>Edit Daftar Paket</>
        </h3>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Jenis Paket Cuci</label>
          <input
            type="text"
            placeholder="Jenis Paket Cuci"
            className="form-control"
            id="jenis_paket_cuci"
            value={_jenis_paket_cuci}
            onChange={(e) => setJenis_paket_cuci(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Harga Paket Cuci</label>
          <input
            type="text"
            placeholder="Harga Paket Cuci"
            className="form-control"
            id="harga_paket_cuci"
            value={_harga_paket_cuci}
            onChange={(e) => setHarga_paket_cuci(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Estimasi Paket</label>
          <input
            type="text"
            placeholder="Estimasi Paket"
            className="form-control"
            id="estimasi_paket"
            value={_estimasi_paket}
            onChange={(e) => setEstimasi_paket(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Update
        </button>
      </form>
    </>
  );
};

export default UpdatePaket;
