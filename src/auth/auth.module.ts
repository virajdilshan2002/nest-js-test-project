import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';
import { ItemModule } from 'src/item/item.module';
import { OrdersModule } from 'src/orders/orders.module';

@Module({
  imports: [
    UsersModule,
    ItemModule,
    OrdersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '2h' },
    }),
  ],
  providers: [
    AuthService,
  {
    provide: APP_GUARD,
    useClass: AuthGuard,
  }
  ],
  controllers: [AuthController],
})
export class AuthModule {}