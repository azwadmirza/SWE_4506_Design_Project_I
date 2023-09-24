import { Card } from "react-bootstrap";
import { IonIcon } from "@ionic/react";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { closeSharp } from "ionicons/icons";

interface CardCartComponents {
  index: number;
  medicineName: string;
  genericName: string;
  quantityPcs: number;
  quantityStrips: number;
  quantityBoxes: number;
  price: number;
  image: string;
}

const CartCard = ({
  index,
  medicineName,
  genericName,
  quantityPcs,
  quantityStrips,
  quantityBoxes,
  price,
  image,
}: CardCartComponents) => {
  return (
    <Card className="cart-card">
      <Card.Header>
        <span className="title">{medicineName}</span>
        <span className="generic-name">({genericName})</span>
        <button className="custom-delete">
          <IonIcon icon={closeSharp}></IonIcon>
        </button>
      </Card.Header>
      <Card.Body>
        <div className="d-flex mx-auto w-100">
                <table className="table-quantity">
                  <tbody>
                  <tr>
                    <td className="td-name">Pieces:
                    </td>
                    <td  className="td-value">{quantityPcs}
                    </td>
                    <td className="buttons">
                    <button className="add">
                    <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                  </button>
                  <button className="sub">
                    <FontAwesomeIcon icon={faMinus}></FontAwesomeIcon>
                  </button>
                    </td>
                  </tr>
                  <tr>
                  <td  className="td-name">Strips:
                    </td>
                    <td  className="td-value">{quantityStrips}
                    </td>
                    <td className="buttons">
                    <button className="add">
                    <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                  </button>
                  <button className="sub">
                    <FontAwesomeIcon icon={faMinus}></FontAwesomeIcon>
                  </button>
                    </td>
                  </tr>
                  <tr>
                  <td  className="td-name">Boxes:
                    </td>
                    <td className="td-value">{quantityBoxes}
                    </td>
                    <td className="buttons">
                    <button className="add">
                    <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                  </button>
                  <button className="sub">
                    <FontAwesomeIcon icon={faMinus}></FontAwesomeIcon>
                  </button>
                    </td>
                  </tr>
                  </tbody>
                </table>
          <div className="medicine-image w-25">
            <img src={image} className="medicine-cart-image" />
          </div>
        </div>
      </Card.Body>
      <Card.Footer className="title">
      <span>Price: </span>
      ৳{price}
      </Card.Footer>
    </Card>
  );
};

export default CartCard;
