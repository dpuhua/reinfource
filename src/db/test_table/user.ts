/**
 * schema user
 */
import { Table, Column } from 'sequelize-typescript'
import BaseTable from '../base_table/base_table'

@Table({
  tableName: 'user'
})
export default class User extends BaseTable {
  static async getByMobile<T extends User>(mobile: string) {
    const item = await this.findOne({
      where: {
        mobile
      }
    })
    return item as T
  }

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
