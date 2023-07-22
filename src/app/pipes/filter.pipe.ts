import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../types/data';

@Pipe({
  name: 'productFilter',
})
export class FilterPipe implements PipeTransform {
  transform(products: Product[], searchText: string, sortBy: string): Product[] {
    if (sortBy == 'up') {
      products.sort((a, b) => a.price - b.price)
    } else if((sortBy == 'down')) {
      products.sort((a, b) => b.price - a.price)
    }
    
    return products.filter(
      (product) =>
        product.title
          .toLocaleLowerCase()
          .includes(searchText.toLocaleLowerCase())
    );
    
  }

  
}
