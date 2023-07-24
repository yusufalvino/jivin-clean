import React from "react";
import AdminLayout from "../../components/AdminLayout";
import Dasboard from "../../components/Dasboard";
import DataPemesanan from "../../components/DataPemesanan";

const datapemesanan = () => {
  return (
    <div>
      <>
        <AdminLayout>
          <DataPemesanan />
        </AdminLayout>
      </>
    </div>
  );
};

export default datapemesanan;
