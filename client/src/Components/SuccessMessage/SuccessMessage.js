import React, { useState } from "react";
import Modal from 'react-modal';
import Zoom from 'react-reveal/Zoom';

const customStyles = {
    content: {
        top: '30%',
        right: '20%',
        bottom: '30%',
        left: '20%',

    },
};
const SuccessMessage = (props) => {
    const [isOpen, setIsOpen] = useState(true);
    const closeModal = () => {
        setIsOpen(false);
        window.location.reload(false);
    };
    const myRef = React.useRef(null);
    return (
        <div className="container" ref={myRef} >
            <Modal ariaHideApp={false}
                isOpen={isOpen}
                onRequestClose={closeModal}
                center
                style={customStyles}
                container={myRef.current} >
                <Zoom >
                    <button className="btn btn-sm mb-3 btn-danger" onClick={closeModal}>X</button>
                    <div className="row justify-content-center">
                        <div className=" alert-success">
                            <h3>{props.message}</h3>
                        </div>
                    </div>
                    <button className="btn btn-sm btn-primary" onClick={closeModal}>סגור</button>
                </Zoom>
            </Modal>
        </div>

    );
}

export default SuccessMessage;