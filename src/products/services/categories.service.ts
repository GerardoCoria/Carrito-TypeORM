import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/categories.dto';
import { Category } from '../entities/category.entity';

@Injectable()
export class CategoriesService {

  constructor(@InjectRepository(Category) private categories:Repository<Category>){}

  findAll() {
    return this.categories.find();
  }

  async findOne(id: number) {
    const category = await this.categories.findOne({
      relations:['products'],
      where:{id:id}
    });
    if (!category) {
      throw new NotFoundException(`Categoría #${id} no encontrada`);
    }
    return category;
  }

  create(payload: CreateCategoryDto) {
    const newCategory = this.categories.create(payload)
    return this.categories.save(newCategory)
  }

  async update(id: number, payload: UpdateCategoryDto) {
    const category = await this.categories.findOneBy({id:id});
    this.categories.merge(category, payload);
    return this.categories.save(category);
  }

  async remove(id: number) {
    const findCategory = await this.findOne(id)
    if(!findCategory){
      throw new BadRequestException(`Marca #${id} no encontrada`);
    }
    return this.categories.delete({id:id})
  }
}

