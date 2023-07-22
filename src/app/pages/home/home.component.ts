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
    'https://alta.ge/images/promo/289/ac_web_m3lt-ot.png',
    'https://alta.ge/images/promo/293/galaxy_cashback_web.png',
    'https://alta.ge/images/promo/293/iphone14pro1_gift_web_en.png',
    'https://alta.ge/images/promo/289/samsung_ok_2.png',
    'https://alta.ge/images/promo/292/asus_notebooks_web_32ee-fj.png',
    'https://alta.ge/images/promo/289/aseries_web_6hlw-7m.png',
    'https://alta.ge/images/promo/292/samsung_tv1_web.png',
    'https://alta.ge/images/promo/292/macbook_air15_ava_price_web_en.png',
    'https://alta.ge/images/promo/289/tcl_web.png',
    'https://alta.ge/images/promo/292/apple_watch_se_web_en.png',
    'https://alta.ge/images/promo/289/lg_mon_web.png',
  ];
  products:Product[] = [];
  moveStyle = { transform: `translateX(${0}%)` };
  statusSpiner = true;
  statusSlideSelected = this.imgs[0];
  updateSlide(index: number) {
    this.moveStyle = { transform: `translateX(${index * -100}%)` };
    this.statusSlideSelected = this.imgs[index];
  }

  updateProductDetailsParam(id: number) {
    this.productsService.setProductDetailsParam(this.products[id]);
  }

  

  ngOnInit(): void {
    this.productsService.getAllProducts().subscribe((response) => {
      this.products = response.products;
      this.statusSpiner = false;
    })

    
    
  }
}
