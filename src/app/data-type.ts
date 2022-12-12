export interface signUp {
  name: string;
  email: string;
  password: string;
}
export interface login {
  email: string;
  password: string;
}
export interface product {
  filter(arg0: (item: product) => boolean): any;
  name: string;
  price: string;
  color: string;
  category: string;
  description: string;
  imageUrl: string;
  id: number;
  quantity: undefined | number;
  productId:undefined| number;
}
export interface cart{
  name: string;
  price: string;
  color: string;
  category: string;
  description: string;
  imageUrl: string;
  id: number|undefined;
  quantity: undefined | number;
  userId:number;
  productId:number;
}
export interface priceSummary{
  price:number,
  discount:number,
  tax:number,
  delivary:number,
  total:number

}
export interface order{
  email:string,
  address:string,
  contact:string,
  totalPrice:number,
  userId:number,
  id:number|undefined
}