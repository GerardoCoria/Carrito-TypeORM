import { BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Product } from '../entities/product.entity'
import { CreateProductDto, UpdateProductDto, FilterProductsDto } from '../dtos/products.dto';
import { BrandsService } from "../services/brands.service";

@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository(Product) private products:Repository<Product>,
    private brandServices:BrandsService
  ){}

  findAll() {
    return this.products.find();
  }

  async findOne(id: number) {
    const product = await this.products.findOne({
      relations:['brand'],
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
      const brand = await this.brandServices.findOne(payload.brandId)
      newProduct.brand = brand;
    }
    return this.products.save(newProduct)
  }

  async update(id: number, payload: UpdateProductDto) {
    const product = await this.products.findOneBy({id:id});
    if(payload.brandId){
      const brand = await this.brandServices.findOne(payload.brandId)
      product.brand = brand;
    }
    this.products.merge(product, payload);
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
