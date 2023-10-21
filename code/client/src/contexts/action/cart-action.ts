import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { Cart, CartMinimal } from "../slice/cart-slice"

interface CartState{
  cart:Cart[];
  cartPharmacyManager:string;
  totalPrice:number;
}

const initialState:CartState={
  cart:[],
  cartPharmacyManager:"",
  totalPrice:0
}

const CartSlice=createSlice({
  name:'cart',
  initialState,
  reducers:{
    addItem: (state, action:PayloadAction<CartMinimal>) => {
      let currentPrice:number=0;
      if(state.cart.length>0){
        currentPrice=state.cart[state.cart.length-1].price;
      }
      const price=currentPrice+Number(action.payload.quantityPcs)*Number(action.payload.unitPricePcs)+Number(action.payload.quantityStrips)*Number(action.payload.unitPriceStrips)+Number(action.payload.quantityBoxes)*Number(action.payload.unitPriceBoxes);
      state.cart.push({index:state.cart.length,...action.payload,price});
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },

    addCurrentManager:(state,action:PayloadAction<string>)=>{
      state.cartPharmacyManager=action.payload;
      localStorage.setItem("cartPharmacyManager", JSON.stringify(state.cartPharmacyManager));
    },

    clearItems: (state) => {
      state.cart=[];
      state.cartPharmacyManager="";
      localStorage.setItem("cart", JSON.stringify([]));
      localStorage.setItem("cartPharmacyManager","");
    },

    removeItem: (state, action:PayloadAction<Cart>) => {
      const newState = state.cart.filter((item, index) => item.index !== action.payload.index);
      localStorage.setItem("cart", JSON.stringify(newState));
      if(newState.length===0){
        localStorage.setItem("cartPharmacyManager","");
      }
    },

    incrementPcs:(state,action:PayloadAction<Cart>) => {
      state.cart[action.payload.index].quantityPcs++;
      localStorage.setItem('cart',JSON.stringify(state.cart));
    },

    decrementPcs:(state,action:PayloadAction<Cart>) => {
      state.cart[action.payload.index].quantityPcs--;
      localStorage.setItem('cart',JSON.stringify(state.cart));
    },

    incrementStrips:(state,action:PayloadAction<Cart>) => {
      state.cart[action.payload.index].quantityStrips++;
      localStorage.setItem('cart',JSON.stringify(state.cart));
    },

    decrementStrips:(state,action:PayloadAction<Cart>) => {
      state.cart[action.payload.index].quantityStrips--;
      localStorage.setItem('cart',JSON.stringify(state.cart));
    },

    incrementBoxes:(state,action:PayloadAction<Cart>) => {
      state.cart[action.payload.index].quantityBoxes++;
      localStorage.setItem('cart',JSON.stringify(state.cart));
    },

    decrementBoxes:(state,action:PayloadAction<Cart>) => {
      state.cart[action.payload.index].quantityBoxes--;
      localStorage.setItem('cart',JSON.stringify(state.cart));
    },
    calculateTotalPrice:(state)=>{
      state.totalPrice = state.cart.reduce((accumulator, obj) => accumulator + obj.price, 0);
      localStorage.setItem('totalPrice', JSON.stringify(state.totalPrice));
    }
  }
})

export default CartSlice.reducer;
export const {addItem,addCurrentManager,clearItems,removeItem,incrementBoxes,incrementPcs,incrementStrips,decrementBoxes,decrementPcs,decrementStrips,calculateTotalPrice} =CartSlice.actions;