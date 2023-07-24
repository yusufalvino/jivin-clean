import React from "react";
import Link from "next/link";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dasboard = ({ children }) => {
  return (
    <>
      <Head>
        <link
          href="https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css"
          rel="stylesheet"
        ></link>
      </Head>
      <ToastContainer position="top-center" limit={1} />
      <div className="body">
        <div className="sidebar close">
          <div className="logo-details">
            <a className="title mt-3">
              <img src="../11.png" width={75} />
            </a>
            <span className="logo_name mt-3 ml-2">JIVIN CLEAN</span>
          </div>
          <ul className="nav-links">
            <li>
              <a href="/dashboard">
                <i className="bx bx-grid-alt" />
                <span className="link_name">Dashboard</span>
              </a>
              <ul className="sub-menu blank">
                <li>
                  <a className="link_name" href="/dashboard">
                    Dashboard
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <div className="iocn-link">
                <a href="#">
                  <i className="bx bx-collection" />
                  <span className="link_name">Data</span>
                </a>
                <i className="bx bxs-chevron-down arrow" />
              </div>
              <ul className="sub-menu">
                <li>
                  <a className="link_name" href="#">
                    Data
                  </a>
                </li>
                <li>
                  <Link href="/admin/datacustomer" legacyBehavior id="link">
                    <a>Customer</a>
                  </Link>
                </li>
                <li>
                  <Link href="/admin/daftarpaket" legacyBehavior id="link">
                    <a>Daftar Paket Cuci</a>
                  </Link>
                </li>
                <li>
                  <Link href="/admin/datapemesanan" legacyBehavior id="link">
                    <a>Data Pemesanan Customer</a>
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <div className="iocn-link">
                <a href="#">
                  <i className="bx bx-book-alt" />
                  <span className="link_name">Inputan Data</span>
                </a>
                <i className="bx bxs-chevron-down arrow" />
              </div>
              <ul className="sub-menu">
                <li>
                  <a className="link_name" href="#">
                    Inputan Data
                  </a>
                </li>
                <li>
                  <Link href="/admin/createpemesanan" legacyBehavior id="link">
                    <a>Input Data Pemesanan Customer</a>
                  </Link>
                </li>
                <li>
                  <Link href="/admin/createpaket" legacyBehavior id="link">
                    <a>Input Paket Cuci</a>
                  </Link>
                </li>
                <li>
                  <Link href="../admin/createcustomer" legacyBehavior id="link">
                    <a>Input Data Customer</a>
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <div className="profile-details">
                <div className="profile-content">
                  <img src="/gambar.png" alt="profileImg" />
                </div>
                <div className="name-job">
                  <div className="profile_name">Rizky Fauzi</div>
                  <div className="job">Owner Jivin Clean</div>
                </div>
                <Link href="/logout" legacyBehavior id="link">
                  <i className="bx bx-log-out" />
                </Link>
              </div>
            </li>
          </ul>
        </div>
        <section className="home-section">
          <div className="home-content">
            <i className="bx bx-menu" />
          </div>
          <div className="table-responsive">{children}</div>
        </section>
      </div>
      <script src="/script.js"></script>
    </>
  );
};

export default Dasboard;
