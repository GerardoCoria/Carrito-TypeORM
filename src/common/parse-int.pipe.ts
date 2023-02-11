import { ArgumentMetadata, Injectable, PipeTransform, BadRequestException} from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    const data = Number(value)
    if(isNaN(data)){
      throw new BadRequestException(`EL valor ${value} no es un número.`)
    }
    return data;
  }
}
