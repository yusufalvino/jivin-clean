import React from "react";
import Dasboard from "./Dasboard";

const AdminLayout = ({ children }) => {
  return (
    <div>
      <Dasboard>{children}</Dasboard>
    </div>
  );
};

export default AdminLayout;
