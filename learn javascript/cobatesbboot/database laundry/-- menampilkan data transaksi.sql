-- menampilkan data transaksi 
-- beserta nama petugas dan customernya
select t.waktu, t.id_petugas, p.nama as nama_petugas,
t.diskon, c.nama as nama_customer
from transaksi as t join petugas as p 
on t.id_petugas = p.id
join customer as c
on t.id_customer = c.id;
 