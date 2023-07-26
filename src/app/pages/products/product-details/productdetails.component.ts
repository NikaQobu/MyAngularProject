import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/types/data';

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
  user$ = this.authService.user;

  constructor(
    private productService: ProductsService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe((response) => {
      let productID = response.get('id');
      if (productID) {
        this.productService.searchProduct(parseInt(productID));
      }
    });
  }

  test() {
    console.log('mushaobs');
  }

  productTocart(product: Product) {
    if (this.authService.user$.value) {
      this.productService.setCartProducts(product, this.itemCount);
      this.itemCount = 0;
    } else {
      this.router.navigate(['login']);
    }
  }

  changeImg(img: string) {
    this.activImg = img;
    console.log(img);
  }
}
