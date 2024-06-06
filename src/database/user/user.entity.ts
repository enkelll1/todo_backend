import {Table, Column, Model} from 'sequelize-typescript';

@Table
export class User extends Model {

    @Column({
        primaryKey: true,
        autoIncrement: true,
        unique: true
    })
    id: number;

    @Column
    username: string;

    @Column
    email: string;

    @Column
    password: string;
}