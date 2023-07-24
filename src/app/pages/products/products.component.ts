import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/types/data';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  status = true;
  search = '';
  selectValue = 'choose';
  products: Product[] = [];

  constructor(
    private productService: ProductsService,
    private activatedRoute: ActivatedRoute
  ) {}

  updateProductDetailsParam(id: number) {
    this.productService.setProductDetailsParam(id);
  }

  searchProduct() {
    this.productService.setSearchParam(this.search, this.selectValue);
  }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((response) => {
      this.products = response.products;
      this.status = false;
    });

    this.activatedRoute.queryParamMap.subscribe((param) => {
      let searchText = param.get('search');
      let selectText = param.get('sort');
      if (searchText) {
        this.search = searchText;
      }
      if (selectText) {
        this.selectValue = selectText;
      }
    });
  }
}
