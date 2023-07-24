import Head from "next/head";
import Router, { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const UpdateCustomer = () => {
  const [_nama, setNama] = useState("");
  const [_alamat, setAlamat] = useState("");
  const [_no_hp, setNo_hp] = useState("");
  const [_jumlah_drop_sepatu, setJumlah_drop_sepatu] = useState("");

  const [_id_customer, setId_customer] = useState("");

  const router = useRouter();
  const { nama, alamat, no_hp, jumlah_drop_sepatu, id_customer } = router.query;

  useEffect(() => {
    if (typeof nama == "string") {
      setNama(nama);
    }
    if (typeof alamat == "string") {
      setAlamat(alamat);
    }
    if (typeof no_hp == "string") {
      setNo_hp(no_hp);
    }
    if (typeof jumlah_drop_sepatu == "string") {
      setJumlah_drop_sepatu(jumlah_drop_sepatu);
    }
    if (typeof id_customer == "string") {
      setId_customer(id_customer);
    }
  }, [nama, alamat, no_hp, jumlah_drop_sepatu, id_customer]);

  async function submitHandler(e) {
    e.preventDefault();
    try {
      const res = await fetch("/api/update-customer", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_customer: _id_customer,
          nama: _nama,
          alamat: _alamat,
          no_hp: _no_hp,
          jumlah_drop_sepatu: _jumlah_drop_sepatu,
        }),
      });

      const json = await res.json();
      if (!res.ok) throw Error(json.message);
      alert("Update data sukses");

      Router.push("/admin/datacustomer");
    } catch (e) {
      throw Error(e.message);
    }
  }

  return (
    <>
      <Head>
        <title>Ubah Data Customer</title>
        <link rel="icon" href="/lg.png" />
      </Head>
      <div className=" container mt-6 justify-content-center"></div>
      <form
        className="mx-auto shadow p-4"
        onSubmit={submitHandler}
        style={{ maxWidth: "500px" }}
      >
        <h3 className="display-12 text-center" style={{ color: "black" }}>
          <>Edit Data Customer</>
        </h3>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Nama</label>
          <input
            type="text"
            placeholder="Nama"
            className="form-control"
            id="nama"
            value={_nama}
            onChange={(e) => setNama(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Alamat</label>
          <input
            type="text"
            placeholder="Alamat"
            className="form-control"
            id="alamat"
            value={_alamat}
            onChange={(e) => setAlamat(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">No HP</label>
          <input
            type="text"
            placeholder="No HP"
            className="form-control"
            id="no_hp"
            value={_no_hp}
            onChange={(e) => setNo_hp(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Jumlah Drop Sepatu</label>
          <input
            type="text"
            placeholder="Jumlah Drop Sepatu"
            className="form-control"
            id="jumlah_drop_sepatu"
            value={_jumlah_drop_sepatu}
            onChange={(e) => setJumlah_drop_sepatu(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Update
        </button>
      </form>
    </>
  );
};

export default UpdateCustomer;
