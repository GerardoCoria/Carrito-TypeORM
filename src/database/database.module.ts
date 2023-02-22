import { Module, Global} from '@nestjs/common';
import { HttpModule, HttpService } from "@nestjs/axios";
import { ConfigType } from "@nestjs/config";
import { firstValueFrom } from 'rxjs';
import { Client } from "pg";
import { TypeOrmModule } from "@nestjs/typeorm";

import config from "../config";

@Global()
@Module({
  imports:[
    HttpModule,
    TypeOrmModule.forRootAsync({
      inject:[config.KEY],
      useFactory: (configService:ConfigType<typeof config>)=>{
        const { user, host, dbName, password, port } = configService.postgres;
        return {
          type: 'postgres',
          host: host,
          port: port,
          username: user,
          password: password,
          database: dbName,
          synchronize: true,
          autoLoadEntities: true
        }
      },
    }),
  ],
  providers:[
    {
      provide: 'dolar',
      useFactory:async(http:HttpService)=>{
        const datos = await firstValueFrom(http.get('https://www.dolarsi.com/api/api.php?type=valoresprincipales'))
        return datos.data[1].casa
      },
      inject:[HttpService]
    },
    {
      provide: 'PG',
      useFactory: (configService:ConfigType<typeof config>)=>{
        const { user, host, dbName, password, port } = configService.postgres
        const client = new Client({
          host: host,
          port: port,
          user: user,
          password: password,
          database: dbName,
        });
        client.connect();
        return client;
      },
      inject: [config.KEY]
    }
  ],

  exports:['dolar', 'PG', TypeOrmModule]
})

export class DatabaseModule {}
