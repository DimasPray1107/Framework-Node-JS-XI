/**raju sedang menunggu HARBONAS Marketplace Shippy sedang
 * membuat diskon besar besaran, Raju membeli barang seperti berikut
 * Mouse sejumlah 10 ($20.000)
 * Ram sejumlah 5 ($100.000)
 * RJ45 sejumlah 100 ($1000)
 * Motherboard sejumlah 3 ($500.000)
 * Aplikasi Shippy memberi diskon 10% jika jumlah item yang dibeli lebih dari 5
 * Berapa nominal yang harus dibayar Raju???
 */

let belanjaraju = [
    { barang: "Mouse", jumlah: 10, harga: 20000 },
    { barang: "Ram", jumlah: 5, harga: 100000 },
    { barang: "RJ45", jumlah: 100, harga: 1000 },
    { barang: "Motherboard", jumlah: 3, harga: 500000 },
]
let nominal = 0
for (let index = 0; index < belanjaraju.length; index++) {
  if (belanjaraju[index].jumlah >5){
    (90/100)*belanjaraju[index].harga
  }
  else {
    nominal = nominal + belanjaraju[index].harga*belanjaraju[index].jumlah
  }
    }
    console.log(nominal);
 