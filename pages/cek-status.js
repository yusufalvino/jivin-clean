import { useState } from "react";

export default function CekStatus() {
  const [search, setSearch] = useState(0);
  const [data, setData] = useState([]);
  async function handleSearch(e) {
    let res = await fetch(`/api/cek-status?search=${search}`, {
      method: "GET",
    });
    let hasilCari = await res.json();
    setData(hasilCari);
  }
  return (
    <div className="mx-auto shadow p-4">
      <div className="container">
        <div className="text-center">
          <h2>Cek Status Pemesanan JIVIN CLEAN</h2>
          <p>Cek Status Proses Cuci Sepatu Anda</p>
        </div>
        <div className="input-group mb-3">
          <input
            type="number"
            className="form-control"
            placeholder="Masukan kode pesanan"
            aria-describedby="button-addon2"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className="btn btn-outline-primary"
            type="button"
            id="button-addon2"
            onClick={() => handleSearch(search)}
          >
            Cek Status
          </button>
        </div>
        {data.length === 0 ? (
          <div className="alert alert-danger">Data tidak ditemukan</div>
        ) : (
          <>
            <table className="table table-bordered table-secondary text-center">
              <thead>
                <tr>
                  <th scope="col">Id Pemesanan</th>
                  <th scope="col">Jenis Paket</th>
                  <th scope="col">Tgl Pemesanan</th>
                  <th scope="col">Status Pemesanan</th>
                </tr>
              </thead>
              <tbody>
                {data.map((pms, idx) => (
                  <tr key={idx}>
                    <th scope="row">{pms.id_pemesanan}</th>
                    <td>{pms.jenis_paket}</td>
                    <td>{pms.tgl_pemesanan.substring(0, 10)}</td>
                    <td>{pms.status_pemesanan}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
}
