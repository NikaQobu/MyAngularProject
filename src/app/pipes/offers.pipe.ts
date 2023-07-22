import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../types/data';

@Pipe({
  name: 'offers'
})
export class OffersPipe implements PipeTransform {

  transform(products: Product[]): Product[] {
    return products.filter(
      (product) =>
        product.rating > 4.8
    );
  }
  }


