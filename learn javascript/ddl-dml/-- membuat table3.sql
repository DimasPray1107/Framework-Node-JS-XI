-- membuat table3
CREATE TABLE pegawai(
id_pegawai char(12) not null,
nama varchar(60) not null,
jk char(1) not null,
th_masuk int(10) not null,
alamat varchar(20) not null,
primary key(id_pegawai)
);