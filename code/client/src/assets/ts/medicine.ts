import Category from "./medicine-category";
import Type from "./medicine-type";

interface medicine{
  medicineName:string;
  genericName:string;
  description:string;
  manufacturer:string;
  imageURL:string;
  Category:Category;
  Type:Type;
}

export default medicine;