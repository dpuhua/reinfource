/**
 * schema user
 */
import { Table, Column, Model } from 'sequelize-typescript'
import baseTable from '../base_table/base_table'

@Table({
  tableName: 'user'
})
export default class User extends baseTable {

  static async getByMobile<T extends User>(mobile: string) {
    const item = await this.findOne({
      where: {
        mobile
      }
    })
    return item as T
  }

  static async getByNickName<T extends User>(nickName: string) {
    const item = await this.findOne({
      where: {
        nickName
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
