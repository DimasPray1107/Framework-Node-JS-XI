-- seleksi nomer 19 
select m.kode_mapel,m.nama_mapel,count(s.nis) as jumlah,k.nama_kelas,k.kode_kelas,count(s.nis) as jumlah_siswa
from nilai n join mapel m join siswa s join kelas k
on n.nis = s.nis and n.kode_mapel = m.kode_mapel and s.kode_kelas = k.kode_kelas  
where n.nilai < m.kkm
group by m.nama_mapel
