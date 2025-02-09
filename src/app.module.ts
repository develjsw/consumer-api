import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BullModule } from '@nestjs/bull';
import { MemberModule } from './member/member.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: '127.0.0.1',
            port: 3306,
            username: 'root',
            password: 'develjsw1993!@',
            database: 'queue',
            entities: [__dirname + '/**/mysql/*.entity{.ts,.js}'],
            synchronize: false,
            logging: 'all'
        }),
        BullModule.forRoot({
            redis: {
                host: '127.0.0.1',
                port: 6379
            }
        }),
        MemberModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
