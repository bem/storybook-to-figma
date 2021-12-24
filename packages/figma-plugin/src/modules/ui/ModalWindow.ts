/// <reference lib="dom" />
import "../../resources/styles/modal.css"

export default class ModalWindow {
    init() : void {
        document
            .getElementById("open_modal_button")
            .addEventListener("click", this.onOpenModalWindowClick.bind(this));

        document
            .getElementById("close_modal_button")
            .addEventListener("click", this.onCloseModalWindowClick.bind(this))
    }

    private onCloseModalWindowClick(e : MouseEvent) {
        this.setModalWindowOpen(false);
    }

    private onOpenModalWindowClick(e : MouseEvent) {
        this.setModalWindowOpen(true);
    }

    private setModalWindowOpen(open : boolean) {
        let attributeValueToSet = open ? "inline" : "none";

        let modalWindow = document.getElementById("modal_background");
        modalWindow.style.display = attributeValueToSet;
    }
}