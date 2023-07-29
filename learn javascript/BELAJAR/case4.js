/**
 *  coding4:
 * Bu tiara mempunyai harta kekayaan yaitu, mobil seharga
 *  3,000,000,000 lahan seharga 10,000,000,000
 * dan kos kosan seharga 500,000,000
 * 
 * Bu Aurel mempunyai harta kekayaan yaitu mobil seharaga
 *  4,000,000,000 lahan seharga 5,000,000,000
 * dan kos kosan sseharga 800,000,000
 */

let tiara = {
    /** key: value seperti label  */
    mobil: 10000000,
    lahan: 30000000,
    kos: 50000000
}

let aurel = {
    /** key: value seperti label  */
    mobil: 40000000,
    lahan: 50000000,
    kos: 80000000
}
/**count harga tiara*/
let hartatiara = tiara.mobil + tiara.lahan + tiara.kos

/**count aurel*/
let hartaaurel = aurel.mobil + aurel.lahan + aurel.kos

/**count tax of tiara*/
let pajaktiara = (20 / 100) * hartaaurel

let pajakaurel = (20 / 100) * hartatiara


let selisih = pajakaurel - pajaktiara

if (selisih < 0) {
    /**dikali -1 biar hasil positif */
    selisih = selisih *-1
}

console.log("Selisih pajak Aurel dan Tiara adalah " +selisih);