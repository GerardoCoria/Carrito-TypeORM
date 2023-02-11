import { registerAs } from "@nestjs/config";

export default registerAs('config', ()=> {
  return{
    db:{
    },
    jwtSecret: process.env.JWT_SECRET,
    jwtExpires : process.env.JWT_EXPIRES
  };
});
