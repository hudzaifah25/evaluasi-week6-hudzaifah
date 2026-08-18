// BAGIAN 1 — DATA PRODUK

const produk = [
  { nama: "Buku Tulis", harga: 3000, stok: 50 },
  { nama: "Pulpen", harga: 2000, stok: 40 },
  { nama: "Pensil", harga: 1500, stok: 30 },
  { nama: "Penghapus", harga: 1000, stok: 25 },
  { nama: "Penggaris", harga: 2500, stok: 20 },
];

console.log("DAFTAR PRODUK");
for (let i = 0; i < produk.length; i++) {
  console.log(
    `${i + 1}. ${produk[i].nama} - Rp ${produk[i].harga} (Stok: ${produk[i].stok})`,
  );
}

function cariProduk(namaProduk) {
  const index = produk.findIndex(
    (item) => item.nama.toLowerCase() === namaProduk.toLowerCase(),
  );

  if (index !== -1) {
    return produk[index];
  }

  return null;
}

// BAGIAN 2 — KERANJANG BELANJA

const keranjang = [];

function tambahKeKeranjang(namaProduk, jumlah) {
  const item = cariProduk(namaProduk);

  if (!item) {
    console.log("Produk tidak ditemukan.");
    return;
  }

  if (jumlah > item.stok) {
    console.log("Stok tidak cukup.");
    return;
  }

  keranjang.push({
    nama: item.nama,
    harga: item.harga,
    jumlah: jumlah,
  });

  console.log(`${item.nama} berhasil ditambahkan ke keranjang.`);
}

tambahKeKeranjang("Buku Tulis", 2);
tambahKeKeranjang("Pulpen", 3);
tambahKeKeranjang("Laptop", 1); // gagal

function batalkanItem(namaProduk) {
  const index = keranjang.findIndex(
    (item) => item.nama.toLowerCase() === namaProduk.toLowerCase(),
  );

  if (index !== -1) {
    keranjang.splice(index, 1);
    console.log(`${namaProduk} dihapus dari keranjang.`);
  } else {
    console.log("Item tidak ditemukan di keranjang.");
  }
}

// BAGIAN 3 — PERHITUNGAN TRANSAKSI

// Subtotal
const hitungSubtotal = (harga, jumlah) => harga * jumlah;

// Total Belanja
const hitungTotalBelanja = (keranjang) => {
  let total = 0;

  for (let i = 0; i < keranjang.length; i++) {
    total += hitungSubtotal(keranjang[i].harga, keranjang[i].jumlah);
  }

  return total;
};

function hitungDiskon(total, isMember = false) {
  if (isMember && total > 0) {
    return total * 0.15;
  } else if (!isMember && total > 100000) {
    return total * 0.05;
  }

  return 0;
}

function hitungOngkosTitip(jumlahItem) {
  return Math.floor(jumlahItem / 5) * 1000;
}

// BAGIAN 4 — VALIDASI & PERCABANGAN

function cekMetodePembayaran(metode) {
  switch (metode.toLowerCase()) {
    case "tunai":
      console.log("Pembayaran tunai dipilih.");
      break;

    case "saldo-santri":
      console.log("Pembayaran menggunakan saldo santri.");
      break;

    case "transfer":
      console.log("Pembayaran melalui transfer.");
      break;

    default:
      console.log("Metode pembayaran tidak dikenali.");
  }
}

function validasiKeranjang(keranjang) {
  if (!keranjang.length) {
    console.log("Keranjang masih kosong, tidak bisa checkout.");
    return false;
  }

  return true;
}

// BAGIAN 5 — CHECKOUT

function checkout(keranjang, isMember, metodePembayaran) {
  if (!validasiKeranjang(keranjang)) {
    return;
  }

  let totalItem = 0;

  for (let i = 0; i < keranjang.length; i++) {
    totalItem += keranjang[i].jumlah;
  }

  const subtotal = hitungTotalBelanja(keranjang);
  const diskon = hitungDiskon(subtotal, isMember);
  const ongkosTitip = hitungOngkosTitip(totalItem);
  const totalBayar = subtotal - diskon + ongkosTitip;

  console.log("================================");
  console.log("       STRUK WARUNG PONDOK IT");
  console.log("================================");

  for (let i = 0; i < keranjang.length; i++) {
    const item = keranjang[i];
    const totalItemHarga = hitungSubtotal(item.harga, item.jumlah);

    console.log(`${i + 1}. ${item.nama} x${item.jumlah} Rp ${totalItemHarga}`);
  }

  console.log("--------------------------------");
  console.log(`Subtotal      : Rp ${subtotal}`);
  console.log(`Diskon        : Rp ${diskon}`);
  console.log(`Ongkos Titip  : Rp ${ongkosTitip}`);
  console.log("--------------------------------");
  console.log(`TOTAL BAYAR   : Rp ${totalBayar}`);
  console.log(`Metode Bayar  : ${metodePembayaran}`);
  console.log("================================");

  cekMetodePembayaran(metodePembayaran);
}

// SKENARIO 1
// MEMBER

const keranjangMember = [
  { nama: "Buku Tulis", harga: 3000, jumlah: 10 },
  { nama: "Pulpen", harga: 2000, jumlah: 15 },
  { nama: "Penggaris", harga: 2500, jumlah: 20 },
];

checkout(keranjangMember, true, "saldo-santri");

// SKENARIO 2
// KERANJANG KOSONG

const keranjangKosong = [];

checkout(keranjangKosong, false, "tunai");
