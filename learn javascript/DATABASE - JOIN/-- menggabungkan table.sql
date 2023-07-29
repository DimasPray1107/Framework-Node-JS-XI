-- menggabungkan table
INSERT INTO mahasiswa1 (nim, nama, jenis_kelamin, alamat)
VALUES 
("101", "Arif", "L", "jl.kenangan"),
("102", "Budi", "L", "jl.jombang"),
("103", "Wati", "P", "jl.surabaya"),
("104", "Ika", "P", "jl.kediri"),
("105", "Tono", "L", "jl.blitar"),
("106", "Iwan", "L", "jl.malang"),
("107", "Sari", "P", "jl..tuban");

INSERT INTO ambil_mk (nim, kode_mk)
VALUES 
(101,"PT1447"),
(103,"TIK332"),
(104,"PTI333"),
(105,"TIK123"),
(111,"TIK333"),
(123,"PTI123");

INSERT INTO matakuliah2 (kode_mk, nama_mk, sks, semester)
VALUES 
("PT1427", "Praktikum Basis Data", 1, 3),
("TIK342", "Praktikum Basis Data", 1, 3),
("PTI333", "Basis Data Terdistribusi", 3, 5),
("TIK123", "Jaringan Komputer", 2, 5),
("TIK333", "Sistem Operasi", 3, 5),
("PTI123", "Grafika Komputer", 3, 5),
("PT1777", "Sistem Informasi", 2, 3);