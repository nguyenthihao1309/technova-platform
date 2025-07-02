import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './schemas/product.schema';

@Injectable()
export class ProductsService {
  constructor(
    //@InjectModel(Product.name): This decorator will inject the Mongoose Model for Product into the service.
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}

  //CREATE
  async create(createProductDto: CreateProductDto): Promise<Product> {
    const newProduct = new this.productModel(createProductDto);
    return newProduct.save();
  }

  //READ (all)
  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  //READ (One)
  async findOne(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException(`Product with ID "${id}" does not exist.`);
    }
    return product;
  }

  //UPDATE
  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const updatedProduct = await this.productModel
      .findByIdAndUpdate(id, updateProductDto, { new: true })
      .exec();
    if (!updatedProduct) {
      throw new NotFoundException(`Product with ID "${id}" does not exist.`);
    }
    return updatedProduct;
  }

  //DELETE
  async remove(id: string): Promise<any> {
    const result = await this.productModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Product with ID "${id}" does not exist.`);
    }
    return { message: `The product with ID "${id}" has been removed.` };
  }
}
