let nilai = [58, 40, 99, 78, 95, 85, 63]
let kurangKKM = 0

for (let index = 0; index < nilai.length; index++) {
   if(nilai[index] < 75) {
    kurangKKM++
   }

}

console.log("jumlah nilai dari kkm sebanyak "+kurangKKM);