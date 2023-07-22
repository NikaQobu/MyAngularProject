import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.scss'],
})
export class ProductdetailsComponent implements OnInit {
  product: any = {};
  itemCount = 1;

  constructor(
    private productService: ProductsService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe((response) => {
      this.product = {
        id: response.get('id'),
        title: response.get('title'),
        price: response.get('price'),
        description: response.get('description'),
        imgs: response.get('imgs'),
        rating: response.get('rating'),
        stock: response.get('stock'),
        brand: response.get('brand'),
        category: response.get('category'),
        discountPercentage: response.get('discountPercentage'),
        itemCount: 0,
      };
    });
  }

  productTocart(product: any) {
    this.productService.setCartProducts(product, this.itemCount);
  }
}
