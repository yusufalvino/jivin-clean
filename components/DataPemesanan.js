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
        <table className="table table-bordered table-secondary text-center">
          <thead>
            <tr>
              <th scope="col">Id Pemesanan</th>
              <th scope="col">Jenis Paket</th>
              <th scope="col">Tgl Pemesanan</th>
              <th scope="col">Status Pemesanan</th>
              <th scope="col">Opsi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((pms, idx) => (
              <tr key={idx}>
                <th scope="row">{pms.id_pemesanan}</th>
                <td>{pms.jenis_paket}</td>
                <td>{pms.tgl_pemesanan.substring(0, 10)}</td>
                <td>{pms.status_pemesanan}</td>
                <td>
                  <div className="justify-content-between">
                    <Link
                      href={`/admin/updatepemesanan?id_pemesanan=${pms.id_pemesanan}&id_customer=${pms.id_customer}&jenis_paket=${pms.jenis_paket}&tgl_pemesanan=${pms.tgl_pemesanan}&status_pemesanan=${pms.status_pemesanan}`}
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
