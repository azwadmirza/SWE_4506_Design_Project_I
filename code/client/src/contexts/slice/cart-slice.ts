import { configureStore, createSlice } from '@reduxjs/toolkit'

export interface CartMinimal{
  medicineName:string;
  genericName:string;
  image:string;
  unitPricePcs:number;
  unitPriceStrips:number;
  unitPriceBoxes:number;
  quantityPcs:number;
  quantityStrips:number;
  quantityBoxes:number;
  prescriptionImage:string|undefined;
}

export interface Cart extends CartMinimal{
  index:number;
  price:number;
}