/**Bu Naura adalah guru ilmu ghoib,mempunyai data nilai siswa yang diajar sebagai berikut
 * kaizo,tugas 80,uh 70,uas 98
 * yaya,tugas 90,uh 60,uas 50
 * ciciko,tugas 70,uh 70,uas 85
 * 
 * Bu naura ingin menghitung nilai dari tiap siswanya rumus,(tugas 30%),uh(30%),uas(40%),Bantulah Bu naura untuk Menghitung nilai tersebut
*/
let nilaisiswa = [
    { nama: "kaizo", tugas: 80, uh: 70, uas: 98 },
    { nama: "yaya", tugas: 90, uh: 60, uas: 50 },
    { nama: "ciciko", tugas: 70, uh: 70, uas: 85 }
]
for (let index = 0; index < nilaisiswa.length; index++) {

    let nilaitugas = (30 / 100) * nilaisiswa[index].tugas
    let nilaiuh = (40 / 100) * nilaisiswa[index].uh
    let nilaiuas = (30 / 100) * nilaisiswa[index].uas
    let nilaiakhir = nilaitugas + nilaiuh + nilaiuas
    nilaisiswa[index].na = nilaiakhir
}
console.log(nilaisiswa);