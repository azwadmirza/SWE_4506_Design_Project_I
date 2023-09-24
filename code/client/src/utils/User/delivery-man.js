import axios from "axios";
import CryptoJS from "crypto-js";

class deliveryUser{
  constructor(_id, token, googleId = null) {
    this._id = _id;
    this.token = token;
    this.googleId = googleId;
    this.password="";
    this.error=false;
    this.errorMessage="";
  }

  async retrieveUserInformation() {
    const result = await axios
      .get("/api/profile/delivery/" + this._id, {
        headers: {
          Authorization: `Bearer ${this.token}`,
          idType: this.googleId ? "google" : "email",
        },
      })
      .then((result) => result.data)
      .catch((error) => {
        console.log(error);
      });
      this.username=result.username?result.username:this.username;
      this.email=result.email;
      this.phone=result.phone?result.phone:this.phone;
      this.imageURL=result.imageURL;
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
      }}).then((result) => result.data)
      .catch(() => (window.location.href = "/error500"));
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
        "/api/profile/delivery/" + this._id,
        {
          username: this.username,
          phone:this.phone
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

export default deliveryUser;