-- seleksi nomer2
select m.jenis_kelamin, count(m.nim) as jumlah
from mahasiswa1 m left join ambil_mk a
on m.nim = a.nim
where a.nim is null
group by
