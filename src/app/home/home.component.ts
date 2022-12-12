import { Component, OnInit } from '@angular/core';
import { product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  popularProduct:undefined|product[];
  ProductList:undefined|product[];
  constructor(private product:ProductService) { }

  ngOnInit(): void {
    this.product.popularProduct().subscribe((data)=>{
      this.popularProduct=data;
    });
    this.product.productList().subscribe((data)=>{

      this.ProductList=data;
    })
  }

}
