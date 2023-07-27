import React from "react";
import { useDataCustomer } from "../lib/swr.fetch";
import Link from "next/link";
import { mutate } from "swr";
import Router from "next/router";
const DataCustomer = () => {
  const { data, error } = useDataCustomer();
  if (error) {
    return <div>Error Landing</div>;
  }
  if (!data) {
    return <div>Loading</div>;
  }
  async function hapuscustomer(id_customer) {
    let res = await fetch(`/api/hapus-customer?id_customer=${id_customer}`, {
      method: "DELETE",
    });
    let json = await res.json();
    if (!res.ok) throw Error(json.message);
    mutate("/api/hapus-customer");

    alert("Data Customer Telah Dihapus");
    Router.push("/admin/datacustomer");
  }
  console.log(data);
  return (
    <>
      <div className="container">
        <h3 className="text-uppercase py-3">Data Customer</h3>
        <table className="table table-bordered table-secondary text-center">
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Nama</th>
              <th scope="col">Alamat</th>
              <th scope="col">No HP</th>
              <th scope="col">Jumlah sepatu</th>
              <th scope="col">Opsi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((ctr, idx) => (
              <tr key={idx}>
                <th scope="row">{idx + 1}</th>
                <td>{ctr.nama}</td>
                <td>{ctr.alamat}</td>
                <td>{ctr.no_hp}</td>
                <td>{ctr.jumlah_drop_sepatu}</td>
                <td>
                  <div className="justify-content-between">
                    <Link
                      href={`/admin/updatecustomer?id_customer=${ctr.id_customer}&nama=${ctr.nama}&alamat=${ctr.alamat}&no_hp=${ctr.no_hp}&jumlah_drop_sepatu=${ctr.jumlah_drop_sepatu}`}
                      legacyBehavior
                      id="link"
                    >
                      <button className="btn-editc">Edit</button>
                    </Link>

                    <button
                      className="btn-hapusc text-white "
                      type="submit"
                      value={ctr.id_customer}
                      onClick={(e) => hapuscustomer(e.target.value)}
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

export default DataCustomer;
