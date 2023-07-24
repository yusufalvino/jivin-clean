import React from "react";
import { useDaftarPaket } from "../lib/swr.fetch";
import Link from "next/link";
import { mutate } from "swr";
import Router from "next/router";
const DaftarPaket = () => {
  const { data, error } = useDaftarPaket();

  if (error) {
    return <div>Error Landing</div>;
  }
  if (!data) {
    return <div>Loading</div>;
  }
  async function hapuspaket(id_paket) {
    let res = await fetch(`/api/hapus-paket?id_paket=${id_paket}`, {
      method: "DELETE",
    });
    let json = await res.json();
    if (!res.ok) throw Error(json.message);
    mutate("/api/hapus-paket");

    alert("Daftar Paket Telah Dihapus");
    Router.push("/admin/daftarpaket");
  }
  console.log(data);
  return (
    <>
      <div className="container">
        <table className="table table-bordered table-secondary text-center">
          <thead>
            <tr>
              <th scope="col">Id Paket</th>
              <th scope="col">Jenis Paket</th>
              <th scope="col">Harga Paket</th>
              <th scope="col">Estimasi Paket</th>
              <th scope="col">Opsi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((pkt) => (
              <tr key={pkt}>
                <th scope="row">{pkt.id_paket}</th>
                <td>{pkt.jenis_paket_cuci}</td>
                <td>{pkt.harga_paket_cuci}</td>
                <td>{pkt.estimasi_paket}</td>
                <td>
                  <div className="justify-content-between">
                    <Link
                      href={`/admin/updatepaket?id_paket=${pkt.id_paket}&jenis_paket_cuci=${pkt.jenis_paket_cuci}&harga_paket_cuci=${pkt.harga_paket_cuci}&estimasi_paket=${pkt.estimasi_paket}`}
                      legacyBehavior
                      id="link"
                    >
                      <button className="btn-editpk">Edit</button>
                    </Link>
                    <button
                      className="btn-hapuspk text-white "
                      type="submit"
                      value={pkt.id_paket}
                      onClick={(e) => hapuspaket(e.target.value)}
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

export default DaftarPaket;
