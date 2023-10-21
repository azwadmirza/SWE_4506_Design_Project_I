import axios from "axios";
import CryptoJS from "crypto-js";

class pharmacyManager {
  constructor(_id, token, googleId = null) {
    this._id = _id;
    this.token = token;
    this.googleId = googleId;
    this.password="";
    this.error=false;
    this.errorMessage="";
    this.coordinates={lat:null,lng:null};
  }

  async fetchUserInformation(){
    const result = await axios
      .get("/api/profile/seller/" + this._id, {
        headers: {
          Authorization: `Bearer ${this.token}`,
          idType: this.googleId ? "google" : "email",
        },
      })
      .then((result) => result.data)
      .catch(() => {
        window.location.href="/error500"
      });
      return result;
  }

  async retrieveUserInformation() {
      const result = await this.fetchUserInformation();
      this.username=result.username?result.username:this.username;
      this.email=result.email;
      this.coordinates=(result.hasOwnProperty('coordinates'))?result.coordinates:this.coordinates;
      this.phone=result.phone?result.phone:this.phone;
      this.pharmacy=result.pharmacy?result.pharmacy:this.pharmacy;
      this.address=result.address;
      this.imageURL=result.imageURL;
      this.Inventory=result.Inventory!==undefined?result.Inventory:[];
      this.Orders=result.Orders!==undefined?result.Orders:[];
      return this;
  }

  async validatePhoneNumber(){
    const result=await axios.get(`/api/mobile/verify/${this.phone}`,{
      headers: {
        Authorization: `Bearer ${this.token}`,
        'idType':this.googleId?'google':'email',
      }}).then((result)=>{
        console.log(result)
        return true;
      }).catch((error)=>{
        this.error=error.response.data.error;
        console.log(error);
        return false;
      })
      return result;
  }

  async updateProfilePicture(){
    const formData = new FormData();
    formData.append("file", this.image);
    formData.append("upload_preset", "med_guard");
      const dataRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dzerdaaku/image/upload",
        formData
      );
      this.imageURL=dataRes.data.url;
      await axios.patch('/api/profile/user/updateProfilePicture/'+this._id,{
        imageURL:this.imageURL
      },{headers: {
        'Authorization': `Bearer ${this.token}`,
        'idType':this.googleId?'google':'email'
      }}).then(result => result.data)
      .catch(() => window.location.href="/error500");
      
  }

  async verifyPassword(){
    const result=await axios.post("/api/profile/user/verify", {_id:this._id,password:CryptoJS.SHA512(this.password).toString()}, {
      headers: {
        Authorization: `Bearer ${this.token}`,
        'idType':this.googleId?'google':'email',
      },
    }).then(()=>{
      this.error=false;
      return false;
    }).catch((error)=>{
      this.errorMessage=error.response.data.error;
      this.error=true;
      return true;
    })
    return result;
  }

  async update() {
    if(this.googleId===null || this.googleId===undefined){
      await this.verifyPassword();
      if(this.error){
        console.log("There is an error verifying password");
         console.log(this.errorMessage);
        return;
      }
    }
    await axios
      .patch(
        "/api/profile/seller/" + this._id,
        {
          username: this.username,
          address: this.address,
          coordinates: this.coordinates,
          pharmacy:this.pharmacy,
          phone:this.phone,
          Inventory:this.Inventory,
          Orders:this.Orders
        },
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
            idType: this.googleId ? "google" : "email",
          },
        }
      )
      .then((result) => result.data)
      .catch(() => (window.location.href = "/error500"));
      await this.retrieveUserInformation();
      return this;
  }

}

export default pharmacyManager;
