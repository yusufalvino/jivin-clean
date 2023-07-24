import React from "react";
import AdminLayout from "../../components/AdminLayout";
import CreatePemesanan from "../../components/CreatePemesanan";

const createpemesanan = () => {
  return (
    <div>
      <AdminLayout>
        <CreatePemesanan />
      </AdminLayout>
    </div>
  );
};

export default createpemesanan;
