import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { cart, order } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  totalPrice:number|undefined;
  cardData:cart[]|undefined;
  orderMsg:string|undefined;
  constructor(private product:ProductService,private router:Router) { }

  ngOnInit(): void {
    this.product.currentCart().subscribe((result) => {
     
      let price = 0;
      this.cardData=result;
      result.forEach((item) => {
        if (item.quantity) {
          price = price + (+item.price * +item.quantity);
        }
        
      });
      this.totalPrice=price+(price/10)+100-(price/10);;
      console.log( this.totalPrice)
    });
  }
  orderNow(data:{email:string,address:string,contact:string}){
    let user =localStorage.getItem('user');
    let userId= user &&JSON.parse(user).id;

    if (this.totalPrice) {
      let orderData:order={
        ...data,
        totalPrice:this.totalPrice,
        userId,
        id:undefined
      }

      this.cardData?.forEach((item)=>{
        setTimeout(() => {
          item.id &&  this.product.deleteCartItems(item.id)
        }, 800);
       

      });
      this.product.orderNow(orderData).subscribe((result)=>{
        if (result) {
          alert('Order Placed')
          this.orderMsg="Your order has been placed"
          setTimeout(() => {
            this.router.navigate(['my-orders'])
            this.orderMsg=undefined;
          }, 4000);
        
        }
      });
    }

  
  }

}
