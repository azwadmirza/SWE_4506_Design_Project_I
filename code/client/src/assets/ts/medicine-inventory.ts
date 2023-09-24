import medicine from "./medicine";

interface medicineInventory extends medicine{
      sellingPrice:number;
      purchasePrice:number;
      prescription:boolean;
      pcsPerBox?:number;
      stripsPerBox?:number;
      pcsPerStrip?:number;
      amount:{
        pcs:number;
        strips?:number;
        boxes:number;
      }
}

export default medicineInventory;