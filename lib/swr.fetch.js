import useSWR from "swr";

async function fetcher(url) {
  const res = await fetch(url);
  return res.json();
}
export const useDaftarPaket = () => {
  //url
  const url = "http://localhost:3000/api/daftarpaket.js/daftarpaket";
  //data dan error
  const { data, error } = useSWR(url, fetcher);

  return { data, error };
};
export const useDataCustomer = () => {
  //url
  const url = "http://localhost:3000/api/datacustomer.js/datacustomer";
  //data dan error
  const { data, error } = useSWR(url, fetcher);

  return { data, error };
};
export const useDataPemesanan = () => {
  //url
  const url = "http://localhost:3000/api/datapemesanan";
  //data dan error
  const { data, error } = useSWR(url, fetcher);

  return { data, error };
};
