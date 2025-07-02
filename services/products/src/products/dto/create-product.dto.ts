import { IsNotEmpty, IsNumber, IsString, IsUrl, Min } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsUrl()
  imageUrl: string;

  @IsNumber()
  @Min(0)
  stock: number;
}
