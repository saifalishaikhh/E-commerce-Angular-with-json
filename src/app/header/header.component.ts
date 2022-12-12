import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { product } from '../data-type';
import { ProductService } from '../services/product.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  menuType: string = 'deafult';
  sellerName: string ="";
  userName:string="";
  searchResult: undefined | product[];
  cartItem=0;
  constructor(private router: Router, private product: ProductService) {}

  ngOnInit(): void {
    this.router.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          
          // if (localStorage.getItem('seller')) {
            let sellerStore = localStorage.getItem('seller');
            let sellerData = sellerStore && JSON.parse(sellerStore)[0];
            this.menuType = 'seller';
            // this.sellerName = sellerData.name;
            // console.log(sellerData.name);
          // }
        }else if (localStorage.getItem('user')) {
          let userStore=localStorage.getItem('user');
          let userData=userStore &&  JSON.parse(userStore);
          this.userName=userData.name;
          this.menuType='user';
          this.product.getCartList(userData.id);
        } else {
          this.menuType = 'deafult';
        }
      }
    });
    let cartData=localStorage.getItem('localCart');
    if (cartData) {
      this.cartItem=JSON.parse(cartData).length;
      
    }
    this.product.cartData.subscribe((items)=>{

      this.cartItem=items.length;
    });
  }

  sellerLogout() {
    localStorage.removeItem('seller');
    this.router.navigate(['/']);
  }
  userLogout(){
    localStorage.removeItem('user');
    this.router.navigate(['/user-auth']);
    this.product.cartData.emit([]);
  }
  searchProduct(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement;
      this.product.searchProduct(element.value).subscribe((data) => {
        if (data.length > 5) {
          data.length = 5;
        }
        this.searchResult = data;
    
      });
  
    }
  }
  hideSearch() {
    this.searchResult = undefined;
  }
  submitSearch(val: string) {
    this.router.navigate([`search/${val}`]);
    // console.log(val);
  }
  redirectTodetails(id: number) {
    this.router.navigate(['/product-details/' + id]);
  }
}
