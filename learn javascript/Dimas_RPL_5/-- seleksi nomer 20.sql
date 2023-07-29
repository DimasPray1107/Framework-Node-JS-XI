-- seleksi nomer 20
select m.nama_mapel,n.nilai
from siswa s join mapel m join nilai n
on s.nis = n.nis and n.kode_mapel = m.kode_mapel
where s.nis = "111"