import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartProducts: any = [];
  itemCount = 1;
  total = 0;

  constructor(private produdctService: ProductsService) {}

  ngOnInit(): void {
    this.cartProducts = this.produdctService.getCartsProducts();
    this.total = this.total = this.cartProducts.reduce(
      (sum: any, item: any) => sum + item.itemCount * item.price,
      0
    );
  }

  sumTotalPrice() {
    this.total = this.cartProducts.reduce(
      (sum: any, item: any) => sum + item.itemCount * item.price,
      0
    );
  }

  removeItem(id: number) {
    this.produdctService.removeCartProduct(id);
    this.cartProducts = this.produdctService.getCartsProducts();
    this.total = this.total = this.cartProducts.reduce(
      (sum: any, item: any) => sum + item.itemCount * item.price,
      0
    );
    console.log('removed');
  }
}
