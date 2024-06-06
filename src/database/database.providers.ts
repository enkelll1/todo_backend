import {Sequelize} from 'sequelize-typescript';
import {User} from "./user/user.entity";
import * as process from "process";

export const databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async () => {
            const sequelize = new Sequelize({
                dialect: 'postgres',
                host: process.env.HOST,
                port: Number(process.env.PORT),
                username: 'postgres',
                password: process.env.PASSWORD,
                database: process.env.DATABASE
            });
            sequelize.addModels([User]);
            await sequelize.sync();
            return sequelize;
        },
    },
];