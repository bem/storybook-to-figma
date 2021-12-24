import * as React from "react";

interface ModalCloseButtonProps {
    callback : () => void;
}

export default function ModalCloseButton(props : ModalCloseButtonProps) {
    return <div className="close_modal_button icon-button icon--white8" onClick={props.callback}>
        <div className="icon icon--close"></div>
    </div>
}