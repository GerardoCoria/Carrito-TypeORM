import { IsNotEmpty } from "class-validator";

import { Customer } from "src/users/entities/customer.entity";
import { User } from "src/users/entities/user.entity";
import { Product } from "../../products/entities/product.entity";

export class Order{
  name:string
  date:Date;
  customer: User;
  products:Product;

}
