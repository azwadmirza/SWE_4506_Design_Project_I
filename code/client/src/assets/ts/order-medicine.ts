import medicine from "./medicine";

interface amountPurchased{
  quantityPcs:number;
  quantityStrips:number;
  quantityBoxes:number;
}

export interface orderMedicine extends medicine{
  amount:amountPurchased|undefined;
  price:number;
  prescription:string|undefined;
}