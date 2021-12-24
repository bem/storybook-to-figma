import * as React from 'react'
import ModalCloseButton from './ModalCloseButton';
import "../../resources/styles/modal.css"

interface ModalProps {
    isShown : boolean,
    closeButtonCallback : () => void;
}

export default function Modal(props : React.PropsWithChildren<ModalProps>) {
    let modal = <div className="modal_background">
        <div className="modal">
            <ModalCloseButton callback={props.closeButtonCallback} />
            {props.children}
        </div>
    </div>;

    return props.isShown ? modal : null
}