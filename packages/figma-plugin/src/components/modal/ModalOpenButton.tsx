import * as React from 'react';

export interface IModalOpenButtonProps {
    callback: () => void;
}

export default function ModalOpenButton (props: IModalOpenButtonProps) {
  return (
      <div className="icon-button floating_button" onClick={props.callback}>
          <div className="icon icon--settings icon--white8"></div>
      </div>
  );
}
