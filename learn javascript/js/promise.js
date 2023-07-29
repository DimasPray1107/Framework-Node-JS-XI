/**topik: volume of cube 
 * jika sisinya minus,maka akan muncul error
*/
let volumeCube = (sisi) =>{
return new Promise((resolve, rejected) => {
    if (sisi < 0) {
        rejected(`invalid side`)
        
    }
    let result = sisi*sisi*sisi
    resolve(result)
})
}

volumeCube(10)
// then(dijalankan jika sukses)
// menangkap data dari resolve
.then(result => {
    console.log(`Volume of cube is ${result}`);
})

// catch dijalankan jika ada error
// menangkap data dari rejected
.catch(error => {
    console.log(`Error: ${error}`);
})
