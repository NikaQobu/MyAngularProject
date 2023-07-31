import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GetProductsResponse, Product } from '../types/data';
import { ENVINROMENT } from 'src/environment/environment';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  baseUrl = ENVINROMENT.baseUrl;
  cartProducts: any = [];
  cartItemCount$ = new BehaviorSubject(0);
  productDetailsSpinerStatus$ = new BehaviorSubject<boolean>(false);

  constructor(private router: Router, private http: HttpClient) {}

  getAllProducts() {
    this.productDetailsSpinerStatus$.next(false);
    return this.http.get<GetProductsResponse>(`${this.baseUrl}/products`);
  }

  setCartProducts(product: any, newCount: number) {
    let isIn = -1;
    isIn = this.cartProducts.findIndex((item: any) => item.id === product.id);
    if (isIn >= 0) {
      this.cartProducts[isIn].itemCount += newCount;
    } else {
      product.itemCount = newCount;
      this.cartProducts.push(product);
      this.cartItemCount$.next(this.cartItemCount$.value + 1);
    }
  }

  removeCartProduct(id: number) {
    this.cartProducts = this.cartProducts.filter((e: any) => e.id != id);
    this.cartItemCount$.next(this.cartItemCount$.value - 1);
  }

  getCartsProducts() {
    return this.cartProducts;
  }

  setProductDetailsParam(id: number) {
    this.router.navigate(['products/details'], {
      queryParams: {
        id: id,
      },
    });
  }

  searchProduct(id: number) {
    return this.http.get<Product>(`${this.baseUrl}/products/${id}`);
  }

  setSearchParam(searchText: string, sorting: string) {
    this.router.navigate(['products'], {
      queryParams: {
        search: searchText,
        sort: sorting,
      },
    });
  }
}
