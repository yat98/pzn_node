import {getAllProduct,getProductId} from './database';

export class ProductService{
  static findById(id){
    return getProductId(id);
  }

  static findAll(){
    return getAllProduct();
  }
}