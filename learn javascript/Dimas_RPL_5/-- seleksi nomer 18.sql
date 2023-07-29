-- seleksi nomer 18
select s.nis,s.nama,m.nama_mapel,m.kkm,n.nilai
from siswa s join mapel m join nilai n
on s.nis = n.nis and n.kode_mapel = m.kode_mapel
where n.nilai < m.kkm and m.nama_mapel = "matematika"