/**di indonesia terdapat mata uang  pecahan
 * (100,200,500,100,2000,5000,10000,20000,50000,75000,100000)
 * 
 * mbak salsa membeli makan siang untuk teman temanya sejumlah 1.340.800
 * (satu juta tigaratus empatpuluh lapanratus rupiah), 
 * Berapa jumlah uang yang harus disiapkan oleh mbak salsa?
 * 
 * pecahan -> jumlah
 * 100k ->      3
 * 20k  ->      2
 * 500  ->      1
 * 200  ->      1
 * 100  ->      1
 */
let pecahan = [100000, 75000, 50000, 20000, 10000, 5000, 2000, 1000, 500, 200, 100]

let nominal = 1340800
let hasil = []
for (let index = 0; index < pecahan.length; index++) {
    /**cek nominal dengan pecahan*/
    if (nominal >= pecahan[index]) {
        /**mengetahui jumlah uang*/
        /**math.floor = pembulatan ke bawh */
        let jumlahUang = Math.floor(nominal / pecahan[index])
        /**mengetahui nominal sisa*/
        nominal = nominal % pecahan[index]
        /**dimasukkan wadah hasil */
        hasil.push({
            pecahan: pecahan[index],
            jumlahUang: jumlahUang
        })


    }
}
console.log(hasil);
