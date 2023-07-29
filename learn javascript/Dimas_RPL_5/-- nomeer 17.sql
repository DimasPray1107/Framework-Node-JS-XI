-- nomeer 17
select k.kode_kelas,k.nama_kelas, m.nama_mapel
from kelas k join mapel m join kbm kb on k.kode_kelas = kb.kode_kelas
 and m.kode_mapel = kb.kode_mapel
 where m.nama_mapel = "Kimia" or m.nama_mapel = "Bahasa Indonesia"
 
 

