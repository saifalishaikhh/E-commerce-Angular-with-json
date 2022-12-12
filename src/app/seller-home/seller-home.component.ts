import { Component, OnInit } from '@angular/core';
import { product } from '../data-type';
import { ProductService } from '../services/product.service';
import { faTrash ,faEdit} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit {

  DeleteMessage:string|undefined;
  productList:undefined|product[];
  fatrash=faTrash;
  Edit=faEdit
  constructor(private product:ProductService) { }
 
  ngOnInit(): void {
    this.ProductList();
  }

  deleteProduct(id:number){
    console.log(id)
    this.product.deleteProduct(id).subscribe((result)=>{

      if (result) {
        this.DeleteMessage="Product deleted successfully";
        this.ProductList();
      }
    })
    setTimeout(()=>{
      this.DeleteMessage=undefined;
    },3000);
  }
  ProductList(){
    this.product.productList().subscribe((result)=>{
      // console.log(result);
      this.productList=result;
    });
  }
}
