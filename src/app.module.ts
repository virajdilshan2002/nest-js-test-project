import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ItemModule } from './item/item.module';
import { Item } from './entities/item.entity';
import { OrdersModule } from './orders/orders.module';
import { Orders } from './entities/orders.entity';
import { InvoiceModule } from './invoice/invoice.module';
import { BullModule } from '@nestjs/bullmq';
import { Invoice } from './entities/invoice.entity';
import { EmailModule } from './email/email.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Viraj@2002',
      database: 'nestjstest',
      entities: [User, Item, Orders, Invoice],
      synchronize: true,
      autoLoadEntities: true,
    }),
    BullModule.forRoot({
      connection: {
        host: 'localhost',
        port: 6379,
      },
    }),
    ScheduleModule.forRoot(),
    AuthModule, 
    UsersModule,
    ItemModule,
    OrdersModule,
    InvoiceModule,
    EmailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
