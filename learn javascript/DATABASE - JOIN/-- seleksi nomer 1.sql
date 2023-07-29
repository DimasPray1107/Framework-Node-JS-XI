-- seleksi nomer 1
select distinct m.nim,m.nama from mahasiswa1 m join ambil_mk a
on m.nim = a.nim

select k.kode_kelas,k.nama_kelas from kelas k join siswa s
on k.nama_kelas = s.nama