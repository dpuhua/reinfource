/**
 * schema user
 */
import { Table, Column, Model } from 'sequelize-typescript'
import BaseTable from '../base_table/base_table'

@Table({
  tableName: 'user'
})
export default class User extends Model<User> {
  // 通过rid查询
  static async getById(rid: number) {
    const item = await this.findOne({
      raw: true,
      where: {
        rid
      }
    })
    return item
  }
  @Column({
    primaryKey: true,
    allowNull: true,
    autoIncrement: true
  })
  id!: number

  @Column({
    allowNull: true
  })
  nickName!: string

  @Column({
    allowNull: true
  })
  mobile!: string

  @Column({
    allowNull: true
  })
  password!: string

  freezeTableName: boolean = true
}
