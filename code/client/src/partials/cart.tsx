import { Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import "../assets/css/cart.css";
import ModalProps from "../assets/ts/modal";
import CartCard from "./cart-card";
import { useImageUpload } from "../features/user-signup/hooks/useImageUpload";

export default function Cart({ show, setShow }: ModalProps) {
  const handleCheckOut = () => {};

  const totalPrice = 3;
  const cart = [
    {
      medicineName: "napa",
      genericName: "paracetamol",
      image: "/pharmacyProfilePicture.png",
      quantityPcs: 3,
      quantityStrips: 3,
      quantityBoxes: 2,
      price: 1,
    },
    {
      medicineName: "renetidin",
      genericName: "omeprazole",
      image: "/logo.png",
      quantityPcs: 3,
      quantityStrips: 3,
      quantityBoxes: 2,
      price: 1,
    },
    {
      medicineName: "antacid",
      genericName: "calcium-magnesium hydroxide",
      image: "/medicine.avif",
      quantityPcs: 3,
      quantityStrips: 3,
      quantityBoxes: 2,
      price: 1,
    },
  ];
  const prescriptionRequired=true;
  const {imageURL,setImage,upload_image}=useImageUpload(undefined);

  return (
    <Modal show={show} onHide={() => setShow(false)} className="cart-container">
      <Modal.Header closeButton className="table-header">
        My Cart
      </Modal.Header>
      <Modal.Body className="cart">
        <div className="w-100">
        {prescriptionRequired && (<div className="w-75 prescription-input">
          <span className="errorBox">* Prescription Required</span>
        <div className="input-group flex">
          <label htmlFor="imageFileProfile" className="title label-margin">Add Prescription: </label>
          <input
            type="file"
            name="file"
            accept="image/*"
            id="imageFileProfile"
            className="form-control"
            onChange={(e) => {
              if (e.target.files !== null) {
                setImage(e.target.files[0]);
              }
            }}
          />
          
        </div>
        </div>)}
          {cart.map((medicine, index) => (
            <CartCard
              index={index}
              medicineName={medicine.medicineName}
              genericName={medicine.genericName}
              quantityBoxes={medicine.quantityBoxes}
              quantityPcs={medicine.quantityPcs}
              quantityStrips={medicine.quantityStrips}
              image={medicine.image}
              price={medicine.price}
            ></CartCard>
          ))}
        </div>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-between w-100">
        <div className="w-100 price">Total Price: ৳100</div>
        <button onClick={handleCheckOut} className="custom-button full-width">
          Place Order
        </button>
      </Modal.Footer>
    </Modal>
  );
}
