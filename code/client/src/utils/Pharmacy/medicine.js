import axios from "axios";

class allMedicines {
  constructor(_id,token, googleId) {
    this.token = token;
    this.googleId = googleId;
    this._id=_id;
    this.medicineMap = new Map();
  }

  async getAllTypes(){
    this.types=await axios
    .get("/api/profile/addMedicine/findType", {
      headers: {
        Authorization: `Bearer ${this.token}`,
        'idType':this.googleId?'google':'email',
      },
    })
    .then(result=>result.data).catch(() => {
      window.location.href = "/error500";
    });
  }

  async getAllCategories(){
    this.categories=await axios.get("/api/profile/addMedicine/findCategory", {
        headers: {
          Authorization: `Bearer ${this.token}`,
          'idType':this.googleId?'google':'email',
        },
      })
    .then(result=>result.data).catch(() => {
      window.location.href = "/error500";
    });
  }

  async addType(typename,typeDescription,typeStrip){
    const result=await axios.post('/api/profile/addMedicine/addType',{
      name:typename,
      description:typeDescription,
      strips:typeStrip
    },{
      headers: {
        Authorization: `Bearer ${this.token}`,
        'idType':this.googleId?'google':'email',
      },
    }).then(result=>result.data).catch(() => {
      window.location.href = "/error500";
    });
    this.types.push(result);
  }

  async addCategory(categoryName,categoryDescription){
    const result=await axios.post('/api/profile/addMedicine/addCategory',{
      name:categoryName,
      description:categoryDescription
    },{
      headers: {
        Authorization: `Bearer ${this.token}`,
        'idType':this.googleId?'google':'email'
      },
    }).then(result=>result.data).catch(() => {
      window.location.href = "/error500";
    });
    this.categories.push(result);
  }

  async getAllMedicines() {
    const result = await axios
      .get("/api/profile/addMedicine/findAllMedicines", {
        headers: {
          Authorization: `Bearer ${this.token}`,
          idType: this.googleId ? "google" : "email",
        },
      })
      .then((result) => result.data.result)
      .catch(() => {
        window.location.href = "/error500";
      });
    this.medicines=result;
    result.forEach((medicine) =>
    this.medicineMap.set(medicine.MedicineName, medicine)

    );
  }

  async addImage(image){
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "med_guard");
    const dataRes = await axios.post(
    "https://api.cloudinary.com/v1_1/dzerdaaku/image/upload",
    formData
    ).catch(() => {
      window.location.href = "/error500";
    });
    return dataRes.data.url;
  }

  async addNewMedicine(medicine,image) {
    const imageURL=await this.addImage(image);
    console.log({...medicine,imageURL:imageURL});
    await axios
      .post(
        "/api/profile/addMedicine/addNewGlobalMedicine",
        {
          ...medicine,imageURL:imageURL
        },
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
            idType: this.googleId ? "google" : "email",
          },
        }
      )
      .catch(() => {
        window.location.href = "/error500";
      });
    await axios
      .patch(
        "/api/profile/addMedicine/addNewMedicine/" + this._id,
        {
          ...medicine,imageURL:imageURL
        },
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
            idType: this.googleId ? "google" : "email",
          },
        }
      )
      .catch(() => {
        window.location.href = "/error500";
      });
  }

  async addMedicine(medicine) {
    await axios
      .patch(
        "/api/profile/addMedicine/addNewMedicine/" + this._id,
        {
          ...this.medicineMap.get(medicine),
        },
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
            idType: this.googleId ? "google" : "email",
          },
        }
      )
      .catch(() => {
        window.location.href = "/error500";
      });
  }
}

export default allMedicines;
