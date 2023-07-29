
    /**nama barang */
    let barang=[
        {nama: "Beras Muntari", harga: 10000, jumlah: 100},
        {nama: "Minyak freshcare", harga: 15000, jumlah: 5},
        {nama: "Gulamu", harga: 20000, jumlah: 20}
    ]

 let totalharga = 0
 for (let index= 0; index < barang.length; index++) {
    totalharga = totalharga + (barang[index].harga * barang[index].jumlah)
 }
 console.log("total harga belanja pak krisna sebesar Rp "+totalharga);


''