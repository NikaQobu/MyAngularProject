import {
  Component,
  EventEmitter,
  Input,
  Output,
  HostListener,
} from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { User } from 'src/app/types/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() user: User | null = null;
  @Output() logout = new EventEmitter<void>();
  menuStatus = false;
  logInStart = false;
  count$ = this.productService.cartItemCount$;

  constructor(private productService: ProductsService) {}

  @HostListener('window:scroll', ['$event'])
  windowScroll(event: Event) {
    this.menuStatus = false;
  }

  openMenu() {
    this.menuStatus = !this.menuStatus;
  }
}
