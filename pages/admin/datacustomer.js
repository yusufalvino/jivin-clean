import React from "react";
import AdminLayout from "../../components/AdminLayout";
import Dasboard from "../../components/Dasboard";
import DataCustomer from "../../components/DataCustomer";

const datacustomer = () => {
  return (
    <div>
      <>
        <AdminLayout>
          <DataCustomer />
        </AdminLayout>
      </>
    </div>
  );
};

export default datacustomer;
