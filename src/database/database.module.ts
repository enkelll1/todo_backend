import {Module} from '@nestjs/common';
import {databaseProviders} from "./database.providers";
import {userProviders} from "./user/user.provider";
import {ConfigModule} from "@nestjs/config";

@Module({
    imports: [
        ConfigModule.forRoot(),
    ],
    providers: [...databaseProviders,...userProviders],
    exports: [...databaseProviders, ...userProviders]
})
export class DatabaseModule {
}
