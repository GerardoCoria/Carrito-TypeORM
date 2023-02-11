import { Module, Global} from '@nestjs/common';
import { HttpModule, HttpService } from "@nestjs/axios";
import { ConfigType } from "@nestjs/config";
import { firstValueFrom } from 'rxjs';

import config from "../config";

@Global()
@Module({
  imports:[
    HttpModule,
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
  ],

  exports:['dolar']
})

export class DatabaseModule {}
