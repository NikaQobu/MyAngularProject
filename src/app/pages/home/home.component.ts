import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/types/data';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private productsService: ProductsService) {}
  imgs = [
    'https://alta.ge/images/promo/289/summer_web_en.png',
    'https://alta.ge/images/promo/295/galaxy_zfold5_soon_web.png',
    'https://alta.ge/images/promo/296/ac_web.png',
    'https://alta.ge/images/promo/294/tradein_web_g90c-m6.png',
    'https://alta.ge/images/promo/295/iphone14pro_sale_web_en.png',
    'https://alta.ge/images/promo/293/bang_web_en.png',
    'https://alta.ge/images/promo/294/samsung_ha.png',
    'https://alta.ge/images/promo/294/macbook_air_web_en.png',
    'https://alta.ge/images/promo/292/samsung_tv1_web.png',
    'https://alta.ge/images/promo/292/asus_notebooks_web_32ee-fj.png',
    'https://alta.ge/images/promo/292/lenovo_v14_web.png',
    'https://alta.ge/images/promo/295/tcl_tv_web.png',
    'https://alta.ge/images/promo/295/aeg_sale_web.png',
    'https://alta.ge/images/promo/296/apple_watch_se_web_en.png',
    'https://alta.ge/images/promo/289/lg_mon_web.png',
  ];
  products: Product[] = [];
  moveStyle = { transform: `translateX(${0}%)` };
  statusSpiner = true;
  statusSlideSelected = this.imgs[0];
  updateSlide(index: number) {
    this.moveStyle = { transform: `translateX(${index * -100}%)` };
    this.statusSlideSelected = this.imgs[index];
  }

  updateProductDetailsParam(id: number) {
    this.productsService.setProductDetailsParam(id);
  }

  ngOnInit(): void {
    this.productsService.getAllProducts().subscribe((response) => {
      this.products = response.products;
      this.statusSpiner = false;
    });
  }
}
