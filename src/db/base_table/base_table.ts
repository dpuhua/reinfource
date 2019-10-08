/**
 * 基础table类型，添加公共方法，其它表都继承此类
 */
import { Table, Column, Model } from 'sequelize-typescript'

@Table({
  tableName: 'base_table'
})

export default class BaseTable extends Model<BaseTable> {
  // 添加
  static async createItem<T extends BaseTable>(item: T) {
    console.log(233333333333333);

    return await this.create(item)
  }

  // 删除
  static async deleteById<T extends BaseTable>(rid: number) {
    return await this.destroy({
      where: {
        rid
      }
    })
  }

  // 更新
  static async updateItemById<T extends BaseTable>(item: T, rid: number) {
    const objItem = await this.getById(rid) as T;
    for (const key in item) {
      if (item[key]) {
        objItem[key] = item[key]
      }
    }
    return await objItem.save()
  }

  // 查询所有
  static async getList<T extends BaseTable>() {
    const items = await this.findAll({raw: true});
    return items as T[];
  }

  // 通过rid查询
  static async getById<T extends BaseTable>(rid: number) {
    const item = await this.findOne({
      raw: true,
      where: {
        rid
      }
    })
    return item as T
  }

  @Column({
    primaryKey: true,
    autoIncrement: true
  })
  rid!: number

  // 字符串索引
  [index: string]: any

}
