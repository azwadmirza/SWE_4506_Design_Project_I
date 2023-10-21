import medicineInventory from "./medicine-inventory";

interface medicineStrips extends medicineInventory{
  stripsPerBox:number;
  pcsPerStrip:number;
  amount:{
    pcs:number;
    strips:number;
    boxes:number;
  }
}

export default medicineStrips;