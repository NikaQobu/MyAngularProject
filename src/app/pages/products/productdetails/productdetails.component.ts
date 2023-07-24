import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.scss'],
})
export class ProductdetailsComponent implements OnInit {
  itemCount = 1;
  product$ = this.productService.product$;
  status$ = this.productService.productDetailsSpinerStatus$;
  activImg = '';

  constructor(
    private productService: ProductsService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe((response) => {
      let productID = response.get('id');
      if (productID) {
        this.productService.searchProduct(parseInt(productID));
      }
    });
  }

  productTocart(product: any) {
    this.productService.setCartProducts(product, this.itemCount);
    this.itemCount = 0;
  }

  changeImg(img: string) {
    this.activImg = img;
    console.log(img);
  }
}
