import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs';
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
  status = true;
  activImg = '';
  user$ = this.authService.user;
  product$ = this.activatedRoute.queryParams.pipe(
    switchMap((params) => {
      return this.productService.searchProduct(params['id']);
    }),
    tap(() => (this.status = false))
  );

  constructor(
    private productService: ProductsService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

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
