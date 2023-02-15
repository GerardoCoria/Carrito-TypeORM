import { registerAs } from "@nestjs/config";

export default registerAs('config', ()=> {
  return{
    postgres:{
      user: process.env.POSTGRES_USER,
      dbName: process.env.POSTGRES_DB,
      password: process.env.POSTGRES_PASSWORD,
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
    },
    mysql:{
      user:process.env.MYSQL_USER,
      dbName:process.env.MYSQL_DATABASE,
      password:process.env.MYSQL_ROOT_PASSWORD,
      port:Number(process.env.MYSQL_PORT),
      host:process.env.MYSQL_HOST
    },
    jwtSecret: process.env.JWT_SECRET,
    jwtExpires : process.env.JWT_EXPIRES
  };
});
