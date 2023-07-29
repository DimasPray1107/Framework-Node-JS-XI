/**pak ahril mempunyai anak dengan data sebagai berikut
 * john cena,tinggi 1,8,berat 80
 * boby lesley,tinggi 1,6,berat 90
 * undertaker,tinggi 1,76,berat 100
 * khali,tinggi 2,berat 120
 * rey mysterio,tinggi 1,4,berat 30
 * pak sahril ingin mengetahui status body mass index (BMI)
 */
let beratTinggi = [
    { nama: "john cena", tinggi: 1.8, berat: 80 },
    { nama: "boby lesley", tinggi: 1.6, berat: 90 },
    { nama: "undertaker", tinggi: 1.76, berat: 100 },
    { nama: "khali", tinggi: 2, berat: 120 },
    { nama: "rey mysterio", tinggi: 1.4, berat: 30 },
]
let statusBMI = []
for (let index = 0; index < beratTinggi.length; index++) {
    let bmi = beratTinggi[index].berat / (beratTinggi[index].tinggi * beratTinggi[index].tinggi)
    if (bmi < 18.5) {
        statusBMI.push({
            nama: beratTinggi[index].nama,
            hasil: bmi,
            status: "underweight"
        })
    }
    else if (bmi >= 18.5 && bmi < 24.9) {
        statusBMI.push({
            nama: beratTinggi[index].nama,
            hasil: bmi,
            status: "normalweight"
        })
    }
    if (bmi < 18.5) {
        statusBMI.push({
            nama: beratTinggi[index].nama,
            hasil: bmi,
            status: "underweight"
        })
        
    



    }}