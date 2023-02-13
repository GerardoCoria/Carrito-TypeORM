import { IsNotEmpty } from "class-validator";

import { User } from "src/users/entities/user.entity";
import { Product } from "../../products/entities/product.entity";

export class Order{
  id:number;
  name:string;
  //date:Date;
  //customer: User;
  //products:Product;
  //BORRAR LO DE ABAJO
  date?:any;
  customer?:any;
  products?:any;

}
