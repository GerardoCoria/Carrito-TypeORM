import { forwardRef, Module } from '@nestjs/common';
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { ConfigType } from "@nestjs/config";

import { AuthService } from './services/auth.service';
import { UsersModule } from "./../users/users.module";
import { LocalStrategy } from "./strategies/local.strategy";
import { AuthController } from './controllers/auth.controller';
import config from "./../config";
import { JwtStrategy } from "./strategies/jwt.strategy";

@Module({
  imports: [
    forwardRef(()=> UsersModule),
    PassportModule,
    JwtModule.registerAsync({
      inject: [config.KEY],
      useFactory:(configService:ConfigType<typeof config>)=>{
        return {
          secret: configService.jwtSecret,
          signOptions: {
            expiresIn: configService.jwtExpires
          },
        };
      },
    })
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  exports:[AuthService]
})
export class AuthModule {}
