import React, { useState } from "react";
import { useDataPemesanan } from "../lib/swr.fetch";
import Link from "next/link";
import { mutate } from "swr";
import Router from "next/router";

const DataPemesanan = () => {
  const { data, error } = useDataPemesanan();

  if (error) {
    return <div>Error Landing</div>;
  }
  if (!data) {
    return <div>Loading</div>;
  }
  async function hapuspemesanan(id_pemesanan) {
    let res = await fetch(`/api/hapus-pemesanan?id_pemesanan=${id_pemesanan}`, {
      method: "DELETE",
    });
    let json = await res.json();
    if (!res.ok) throw Error(json.message);
    mutate("/api/hapus-pemesanan");

    alert("Data Pemesanan Telah Dihapus");
    Router.push("/admin/datapemesanan");
  }
  return (
    <>
      <div className="container">
        <h3 className="text-uppercase py-3">Data Pemesan</h3>
        <table className="table table-bordered table-secondary text-center">
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Kode Status</th>
              <th scope="col">Nama</th>
              <th scope="col">Jenis Paket</th>
              <th scope="col">Tgl Pemesanan</th>
              <th scope="col">Status Pemesanan</th>
              <th scope="col">Status Pembayaran</th>
              <th scope="col">Total Pembayaran</th>
              <th scope="col">Jumlah Drop Sepatu</th>
              <th scope="col">Opsi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((pms, idx) => (
              <tr key={idx}>
                <th scope="row">{idx + 1}</th>
                <th scope="row">{pms.id_pemesanan}</th>
                <td>{pms.nama}</td>
                <td>{pms.jenis_paket_cuci}</td>
                <td>{pms.tgl_pemesanan.substring(0, 10)}</td>
                <td>{pms.status_pemesanan}</td>
                <td>
                  {pms.status_pembayaran == 1 ? "Sudah Bayar" : "Belum Bayar"}
                </td>
                <td>{pms.total_pembayaran}</td>
                <td>{pms.jumlah_drop_sepatu}</td>
                <td>
                  <div className="justify-content-between">
                    <Link
                      href={`/admin/updatepemesanan?id_pemesanan=${pms.id_pemesanan}&id_customer=${pms.id_customer}&jenis_paket=${pms.id_paket}&tgl_pemesanan=${pms.tgl_pemesanan}&status_pemesanan=${pms.status_pemesanan}&status_pembayaran=${pms.status_pembayaran}&total_pembayaran=${pms.total_pembayaran}&jumlah_drop_sepatu=${pms.jumlah_drop_sepatu}&harga_paket_cuci=${pms.harga_paket_cuci}`}
                      legacyBehavior
                      id="link"
                    >
                      <button className="btn-editp mr-2">Edit</button>
                    </Link>

                    <button
                      className="btn-hapusp text-white "
                      type="submit"
                      value={pms.id_pemesanan}
                      onClick={(e) => hapuspemesanan(e.target.value)}
                    >
                      Hapus
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DataPemesanan;
