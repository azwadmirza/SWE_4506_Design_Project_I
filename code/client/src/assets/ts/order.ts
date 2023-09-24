import { customerBilling } from "./customer-billing";
import { deliveryBilling } from "./delivery-billing";
import { orderMedicine } from "./order-medicine";
import { prescription } from "./prescription";

export interface orders{
  _id:string;
  userID:string;
  pharmacyManagerID:string;
  status:string;
  paymentStatus:boolean;
  orderMedicines:orderMedicine[]|undefined;
  prescriptionOrder:prescription|undefined;
  date:Date;
  customerInformation:customerBilling|undefined;
  deliveryInformation:deliveryBilling|undefined;
}