'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transaksi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // mendefinisikan relasi transaksi -> meja
      // ralasi: 1 to 1 (hasOne atau belongsTo)
      // parent: meja, child: transaksi
      this.belongsTo(models.meja, {
        foreignKey: `id_meja`, as: `meja`
      })

      // mendefinisikan relasi transaksi -> user
      // ralasi: 1 to 1 (hasOne atau belongsTo)
      // parent: meja, child: transaksi
      this.belongsTo(models.user, {
        foreignKey: `id_user`, as: `user`
      })

      // mendefinisikan relasi dari transaksi ke detail
      // relasi : 1 to many
      // transaksi: parent -> detail_transaksi:child
      this.hasMany(models.detail_transaksi, {
        foreignKey: 'id_transaksi', as: 'detail_transaksi'
      })
    }
  }

  transaksi.init({
    id_transaksi: {
      primaryKey: true,
      autoIncrement: true,
      type : DataTypes.INTEGER

    },
    tgl_transaksi: DataTypes.DATE,
    id_user: DataTypes.INTEGER,
    id_meja: DataTypes.INTEGER,
    nama_pelanggan: DataTypes.STRING,
    status: DataTypes.ENUM('belum_bayar', 'lunas')
  }, {
    sequelize,
    modelName: 'transaksi',
    tableName: `transaksi`
  });
  return transaksi;
};