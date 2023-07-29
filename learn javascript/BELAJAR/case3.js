/** 
 * case3: Bu Gaul mempunyai data berat badan siswa
 * seperti berikut ini
 * 90,31,55,70,80,40,30
 * 
 * Bu Gaul ingin mengetahu jumlah siswa yang berat
 * badanya diatas rata rata . Please help Bu Gaul 
 * 
 */
let Berat = [90, 31, 55, 70, 80, 40, 30]
let jumlahBeratBadan = 0

for (let index = 0; index < Berat.length; index++) {
    jumlahBeratBadan = jumlahBeratBadan + Berat[index]
}

let rataRata = jumlahBeratBadan / Berat.length
let lebihBeratBadan = 0

for (let index = 0; index < Berat.length; index++) {
    if (Berat[index] > rataRata) {

    }

}


console.log("Berat Badan siswa diatas rata rata adalah " + lebihBeratBadan);