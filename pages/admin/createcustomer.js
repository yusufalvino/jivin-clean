import React from "react";
import AdminLayout from "../../components/AdminLayout";
import CreateCustomer from "../../components/CreateCustomer";

const createcustomer = () => {
  return (
    <div>
      <AdminLayout>
        <CreateCustomer />
      </AdminLayout>
    </div>
  );
};

export default createcustomer;
