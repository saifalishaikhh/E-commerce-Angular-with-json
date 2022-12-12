import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent implements OnInit {

  productData: undefined | product;
  constructor(private route: ActivatedRoute, private product: ProductService) { }
  productMessage:undefined|string;
  sucessBar=false;
  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('id');
    productId && this.product.getProduct(productId).subscribe((data) => {

      this.productData = data;
      console.log(data);
    })
  }

  updateProducts(data: product) {

    if (this.productData) {
      data.id=this.productData.id;
    }
    this.product.updateProduct(data).subscribe((result)=>{
      if (result) {
        this.sucessBar=true;
        this.productMessage="Product has updated";
      }
    });
    setTimeout(()=>{
      this.productMessage=undefined,this.sucessBar=false;
    },3000);
  }
}
