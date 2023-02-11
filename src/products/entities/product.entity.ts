import { Brand } from "../entities/brand.entity";
import { Category } from "../entities/category.entity";

export class Product{
  id:number;
  name: string;
  description: string;
  price: number;
  stock:number;
  //category: Category;
  //brand: Brand;
  //expires:Date;
  batch:string;
  keys:string
}
