import React from "react";
import { Modal, Table } from "react-bootstrap";

interface IModalProps {
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
    show: boolean;
    result:any;
  }
const BestModal = ({show,setShow,result}:IModalProps) => {
    return ( <Modal show={show} onHide={()=>setShow(false)}>
        <Modal.Header closeButton className="modal-header">
          <Modal.Title>Suggested Optimal Model</Modal.Title>
        </Modal.Header>
        <Modal.Body>Comparing KNN, Linear Regression, Logistic Regression and Naive Bayes, our results can be summarized by the table below
        <Table striped bordered hover>
          <thead>
            <tr className="modal-table-header">
              <th>Feature</th>
              <th>Model</th>
            </tr>
          </thead>
          <tbody>
            {result &&
              Object.entries(result).map(([feature, model]) => (
                <tr key={feature}>
                  <td>{feature}</td>
                  <td>{String(model)}</td>
                </tr>
              ))}
          </tbody>
        </Table>
        </Modal.Body>
    </Modal> );
}
 
export default BestModal;