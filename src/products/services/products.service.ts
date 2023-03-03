import { BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";

import { Product } from '../entities/product.entity'
import { CreateProductDto, UpdateProductDto, FilterProductsDto } from '../dtos/products.dto';
import { Category } from '../entities/category.entity';
import { Brand } from '../entities/brand.entity';

@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository(Product) private products:Repository<Product>,
    @InjectRepository(Brand) private brands:Repository<Brand>,
    @InjectRepository(Category) private categories:Repository<Category>
  ){}

  findAll() {
    return this.products.find();
  }

  async findOne(id: number) {
    const product = await this.products.findOne({
      relations:['brand', 'category'],
      where:{id:id}
    });
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  async create(payload: CreateProductDto) {
    const newProduct = this.products.create(payload)
    if(payload.brandId){
      const brand = await this.brands.findOne({
        where:{id:payload.brandId}
      })
      newProduct.brand = brand;
    }
    if(payload.categoriesId){
      const categories = await this.categories.findBy({
        id: In(payload.categoriesId)
      });
      newProduct.category = categories;
    }
    return this.products.save(newProduct)
  }

  async update(id: number, payload: UpdateProductDto) {
    const product = await this.products.findOneBy({id:id});
    if(payload.brandId){
      const brand = await this.brands.findOne({
        where:{id:payload.brandId}
      })
      product.brand = brand;
    }
    if(payload.categoriesId){
      const categories = await this.categories.findBy({
        id: In(payload.categoriesId)
      });
      product.category = categories;
    }
    this.products.merge(product, payload);
    return this.products.save(product);
  }

  async addCategory(productId:number, categoryId:number){
    const product = await this.products.findOne({
      relations:['category'],
      where:{id:productId}
    });
    if (!product) {
      throw new BadRequestException(`Producto # ${productId} no encontrado`);
    }
    const category = await this.categories.findOne({
      where:{id:categoryId}
    });
    if (!category) {
      throw new BadRequestException(`Categoría # ${categoryId} no encontrada`);
    }
    else if(product.category.find((item)=>item.id == categoryId)){
      throw new BadRequestException(`Categoría #${categoryId} ya existe en el producto #${productId}`)
    }
    product.category.push(category)
    return this.products.save(product);
  }

  async removeCategory (productId:number, categoryId:number){
    const product = await this.products.findOne({
      relations:['category'],
      where:{id:productId}
    });
    if (!product) {
      throw new BadRequestException(`Producto # ${productId} no encontrado`);
    }
    product.category = product.category.filter((item)=>item.id !== categoryId);
    return this.products.save(product);
  }

  async remove(id: number) {
    const existProduct = await this.findOne(id)
    if(!existProduct){
      throw new BadRequestException(`Product #${id} not found`);
    }
    return this.products.delete({id:id})
  }
}
