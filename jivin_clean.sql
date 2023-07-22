-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 22 Jul 2023 pada 07.26
-- Versi server: 10.4.28-MariaDB
-- Versi PHP: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `jivin_clean`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `admin_login`
--

CREATE TABLE `admin_login` (
  `id_admin` int(5) NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `admin_login`
--

INSERT INTO `admin_login` (`id_admin`, `username`, `password`) VALUES
(1, 'admin', '1234');

-- --------------------------------------------------------

--
-- Struktur dari tabel `daftar_paket`
--

CREATE TABLE `daftar_paket` (
  `id_paket` int(5) NOT NULL,
  `jenis_paket_cuci` text DEFAULT NULL,
  `harga_paket_cuci` int(10) NOT NULL,
  `estimasi_paket` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `daftar_paket`
--

INSERT INTO `daftar_paket` (`id_paket`, `jenis_paket_cuci`, `harga_paket_cuci`, `estimasi_paket`) VALUES
(1, 'Deep Clean', 20000, '3 Hari'),
(2, 'Fast Clean', 18000, '2 Hari'),
(3, 'Unyellow', 20000, '4 Hari'),
(4, 'rewhitening', 25000, '5 Hari'),
(5, 'Repaint', 75000, '8 Hari');

-- --------------------------------------------------------

--
-- Struktur dari tabel `data_customer`
--

CREATE TABLE `data_customer` (
  `id_customer` int(5) NOT NULL,
  `nama` varchar(30) DEFAULT NULL,
  `alamat` varchar(30) DEFAULT NULL,
  `no_hp` text NOT NULL,
  `jumlah_drop_sepatu` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `data_customer`
--

INSERT INTO `data_customer` (`id_customer`, `nama`, `alamat`, `no_hp`, `jumlah_drop_sepatu`) VALUES
(1, 'Gilang', 'Karangrejo', '087655765654', 2),
(2, 'Galuh', 'karangrejo', '089884677477', 3),
(3, 'Alvino', 'Singojuruh', '081928777564', 1),
(4, 'Rizky', 'Kabat', '089766555345', 3),
(5, 'Ferdi', 'Ketapang', '087776554653', 3),
(6, 'alvino', 'Karangrejo', '087666545653', 2);

-- --------------------------------------------------------

--
-- Struktur dari tabel `data_pemesanan`
--

CREATE TABLE `data_pemesanan` (
  `id_pemesanan` int(5) NOT NULL,
  `id_customer` int(5) NOT NULL,
  `jenis_paket` varchar(15) DEFAULT NULL,
  `tgl_pemesanan` date NOT NULL,
  `status_pemesanan` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `data_pemesanan`
--

INSERT INTO `data_pemesanan` (`id_pemesanan`, `id_customer`, `jenis_paket`, `tgl_pemesanan`, `status_pemesanan`) VALUES
(1, 1, 'Deep Clean', '2023-04-30', 'Belom Selesai'),
(2, 2, 'Repaint', '2023-04-29', 'On Progress'),
(3, 3, 'Deep Clean', '2023-06-04', 'SELESAI'),
(4, 4, 'Fast Clean', '2023-07-25', 'Belum Selesai'),
(5, 5, 'Fast Clean', '2023-07-26', 'Belom Selesai'),
(6, 6, 'Deep Clean', '2023-07-15', 'Sudah Selesai');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `admin_login`
--
ALTER TABLE `admin_login`
  ADD PRIMARY KEY (`id_admin`);

--
-- Indeks untuk tabel `daftar_paket`
--
ALTER TABLE `daftar_paket`
  ADD PRIMARY KEY (`id_paket`);

--
-- Indeks untuk tabel `data_customer`
--
ALTER TABLE `data_customer`
  ADD PRIMARY KEY (`id_customer`);

--
-- Indeks untuk tabel `data_pemesanan`
--
ALTER TABLE `data_pemesanan`
  ADD PRIMARY KEY (`id_pemesanan`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `admin_login`
--
ALTER TABLE `admin_login`
  MODIFY `id_admin` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `daftar_paket`
--
ALTER TABLE `daftar_paket`
  MODIFY `id_paket` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT untuk tabel `data_customer`
--
ALTER TABLE `data_customer`
  MODIFY `id_customer` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT untuk tabel `data_pemesanan`
--
ALTER TABLE `data_pemesanan`
  MODIFY `id_pemesanan` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
