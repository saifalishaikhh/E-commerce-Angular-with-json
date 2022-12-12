import { Component, OnInit } from '@angular/core';
import { product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent implements OnInit {

  addProductMessage:string|undefined;
  sucessBar=false;
  constructor(private product:ProductService) { }

  ngOnInit(): void {
  }
  addProducts(data:product){
    console.log(data);
    this.product.addProduct(data).subscribe((result)=>{

      if (result) {
        this.sucessBar=true;
        this.addProductMessage="Product is Sucessfully added";
      }
      setTimeout(()=>{this.addProductMessage=undefined , this.sucessBar=false},3000)
      
    });
   
  }
 
}
