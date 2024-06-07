import {
  Table,
  Column,
  Model,
  BelongsTo,
  DataType,
  ForeignKey,
} from 'sequelize-typescript'
import { User } from '../user/user.entity'

@Table
export class Todo extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  })
  id: number

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number

  @BelongsTo(() => User)
  user: User

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string
}
