import medicineInventory from "./medicine-inventory";

interface medicinePcs extends medicineInventory{
  pcsPerBox:number;
  amount:{
    pcs:number;
    boxes:number;
  }
}

export default medicinePcs;