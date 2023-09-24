import axios from "axios";
import pharmacyManager from "../User/pharmacy-manager";

class pharmacyInventory extends pharmacyManager{
  constructor(_id,token,googleId=null){
    super(_id,token,googleId);
    this.Inventory=[];
  }

  async retrieveInformation(){
    const result=await this.fetchUserInformation();
    this.Inventory=result.Inventory!==undefined?result.Inventory:this.Inventory;
  }

  addMedicine(medicine){
    this.Inventory.push({...medicine,Stock:{Pcs:0,Boxes:0,Strips:0}});
  }

  async addStock(medicine_ix,stockType,amount){
    await axios.patch('/api/profile/inventory/addToStock/'+this._id,{
      index:medicine_ix,
      stock:stockType,
      amount:Number(amount)+Number(this.getCurrentStock(medicine_ix,stockType))
    },{headers: {
      'Authorization': `Bearer ${this.token}`,
      'idType':this.googleId?'google':'email'
    }}).catch(() => {
      window.location.href = "/error500";
    });
    this.updateStock(medicine_ix,stockType,Number(amount)+Number(this.getCurrentStock(medicine_ix,stockType)));
  }

  async subStock(medicine_ix,stockType,amount){
    if(Number(this.getCurrentStock(medicine_ix,stockType))-Number(amount)<0){
      throw Error('Stock cannot be negative');
    }
    await axios.patch('/api/profile/inventory/addToStock/'+this._id,{
      index:medicine_ix,
      stock:stockType,
      amount:Number(this.getCurrentStock(medicine_ix,stockType))-Number(amount)
    },{headers: {
      'Authorization': `Bearer ${this.token}`,
      'idType':this.googleId?'google':'email'
    }}).catch(() => {
      window.location.href = "/error500";
    });
    this.updateStock(medicine_ix,stockType,Number(this.getCurrentStock(medicine_ix,stockType))-Number(amount));
  }

  getCurrentStock(medicine_ix,stockType){
    if(stockType==='Pcs'){
      return this.Inventory[medicine_ix].Stock.Pcs;
    }
    else if(stockType==='Boxes'){
      return this.Inventory[medicine_ix].Stock.Boxes;
    }
    else{
      return this.Inventory[medicine_ix].Stock.Strips;
    }
  }

  updateStock(medicine_ix,stockType,changedAmount){
    if(stockType==='Pcs'){
      this.Inventory[medicine_ix].Stock.Pcs=changedAmount;
    }
    else if(stockType==='Boxes'){
      this.Inventory[medicine_ix].Stock.Boxes=changedAmount;
    }
    else{
      this.Inventory[medicine_ix].Stock.Strips=changedAmount;
    }
  }

}

export default pharmacyInventory;