import Head from "next/head";
import AdminLayout from "../components/AdminLayout";
import React, { useState } from "react";
import { useDataPemesanan, useDataCustomer } from "../lib/swr.fetch";
import Link from "next/link";

const dashboard = () => {
  const { data: customer, errCust } = useDataCustomer();
  const { data: pemesanan, errPems } = useDataPemesanan();
  if (errCust && errPems) {
    return <div>Error Landing</div>;
  }
  if (!customer && !pemesanan) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Head>
        <title>Dashboard Admin</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AdminLayout>
        <div className="container">
          <div
            className="container shadow d-flex align-items-center justify-content-center px-3 mb-3 bg-light py-5 rounded"
            style={{
              backgroundImage:
                "url(https://awsimages.detik.net.id/community/media/visual/2021/02/26/bisnis-laundry-sepatu_169.jpeg?w=700&q=90)",
            }}
            id="pagetop"
          >
            <div className="align-items-center justify-content-center">
              <h1
                className="text-light text-center"
                style={{ fontSize: "3rem" }}
              >
                SELAMAT DATANG ADMIN JIVIN CLEAN
              </h1>
            </div>
          </div>
          <div className=" container-fluid my-5 justify-content-center d-flex gap-3 flex-row mb-3">
            <div className="row w-100">
              <div className="col-sm-6 mb-3 mb-sm-0">
                <div className="card shadow-lg">
                  <div className="card-body">
                    <h5 className="card-title">Data Customer</h5>
                    <p className="card-text">Total Customer hari ini</p>
                    <div className="p-2 w-50 bg-dark text-white text-center rounded">
                      {customer ? customer.length : 0}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="card shadow-lg">
                  <div className="card-body">
                    <h5 className="card-title">Data Pemesanan</h5>
                    <p className="card-text">Total Pemesanan hari ini</p>
                    <div className="p-2 w-50 bg-dark text-white text-center rounded">
                      {pemesanan ? pemesanan.length : 0}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    </>
  );
};

export default dashboard;
