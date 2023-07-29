select k.nama_kelas,k.kode_kelas,count(s.nis) as jumlah_siswa
from siswa s join kelas k 
on s.kode_kelas = k.kode_kelas  
group by k.kode_kelas 