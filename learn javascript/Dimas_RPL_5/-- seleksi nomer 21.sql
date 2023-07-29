-- seleksi nomer 21
select  s.nis,s.nama,k.nama_kelas
from kelas k join siswa s join guru g join kbm kb
on g.id_guru = kb.id_guru and kb.kode_kelas = s.kode_kelas
and s.kode_kelas = k.kode_kelas
where g.id_guru = "002"