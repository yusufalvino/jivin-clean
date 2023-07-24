import { useRouter } from "next/router";

export default function DetailPage() {
  const router = useRouter();
  const { primaryKey } = router.query; // Mendapatkan primary key dari parameter URL

  // Contoh fungsi untuk mendapatkan data berdasarkan primary key
  const getDataByPK = (primaryKey) => {
    // Logika untuk mendapatkan data berdasarkan primary key dari sumber data Anda
    // Misalnya, jika menggunakan database, Anda bisa mengirim permintaan ke server untuk mendapatkan data dengan primary key yang cocok.
    // Contoh:
    // const data = fetch(`https://api.example.com/data/${primaryKey}`)
    //   .then(response => response.json())
    //   .catch(error => console.log(error));

    // Mengembalikan data yang didapatkan
    // return data;
    return {
      id: primaryKey,
      name: "Contoh Data",
      description: "Ini adalah contoh data",
    };
  };

  // Mendapatkan data berdasarkan primary key
  const data = getDataByPK(primaryKey);

  if (!data) {
    return <div>Data tidak ditemukan</div>;
  }

  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.description}</p>
    </div>
  );
}
