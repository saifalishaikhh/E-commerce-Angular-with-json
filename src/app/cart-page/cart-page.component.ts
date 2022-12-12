import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { cart, priceSummary } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
})
export class CartPageComponent implements OnInit {
  cartData: cart[] | undefined;
  pricesummary: priceSummary = {
    price: 0,
    discount: 0,
    tax: 0,
    delivary: 0,
    total: 0,
  };

  constructor(private product: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.loadDetails();
  }

  loadDetails() {
    this.product.currentCart().subscribe((result) => {
      this.cartData = result;
      let price = 0;
      result.forEach((item) => {
        if (item.quantity) {
          price = price + +item.price * +item.quantity;
        }
      });
      this.pricesummary.price = price;
      this.pricesummary.discount = price / 10;
      this.pricesummary.tax = price / 10;
      this.pricesummary.delivary = 100;
      this.pricesummary.total = price + price / 10 + 100 - price / 10;
      if (!this.cartData.length) {
        this.router.navigate(['/']);
      }
      // console.log(this.pricesummary)
    });
  }
  checkOut() {
    this.router.navigate(['checkout']);
  }
  removeToCart(cartId: number | undefined) {
    console.log("cartId is:",cartId)
    cartId &&
      this.cartData &&
      this.product.removeToCart(cartId).subscribe((result) => {
        if (result) {
          this.loadDetails();
        }
      });
  }
}
