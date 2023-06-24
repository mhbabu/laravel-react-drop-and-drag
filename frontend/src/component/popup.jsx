import React from 'react'
import Modal from 'react-bootstrap/Modal';

export default function Popup({title,data="", children, show, setShow}) {

  const handleClose = () => setShow(false);
  return (
    <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <h5>{title}</h5>
          <button onClick={handleClose} type="button" className="close"><span aria-hidden="true"><i className='fa fa-times' /></span></button>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
    </Modal>
  )
}
