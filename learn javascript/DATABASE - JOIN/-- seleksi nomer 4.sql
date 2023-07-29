-- seleksi nomer 4
select m.nim,m.nama, sum(mk.sks) as total_sks
from mahasiswa1 m join ambil_mk a join matakuliah2 mk
on m.nim = a.nim and a.kode_mk = mk.kode_mk
group by m.nim
having total_sks>=4 and total_sks<=10