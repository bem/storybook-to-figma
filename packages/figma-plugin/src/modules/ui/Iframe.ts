import Storybook from "../storybook/Storybook";
import StorybookStorage from "../storybook/StorybookStorage";

export default class Iframe {
    private currentStorybook : Storybook | undefined;
    private storage : StorybookStorage;

    constructor(storage : StorybookStorage) {
        this.storage = storage;
    }

    init() {
        this.updateCurrentStorybookFromStorage();
        this.storage.addCallback(this.updateCurrentStorybookFromStorage.bind(this));
    }

    private updateCurrentStorybookFromStorage() {
        let selectedId = this.storage.getSelectedId();
        let newStorybook = this.storage.getStorybookById(selectedId);

        if(newStorybook?.id !== this.currentStorybook?.id) {
            this.currentStorybook = newStorybook;
            this.setIframeAddress(this.currentStorybook?.address);
        }
    }

    private setIframeAddress(address : string) {
        if(address === undefined) {
            this.setPlaceholderActive(true);
            return;
        } else {
            this.setPlaceholderActive(false);
        }

        let iframe = document.getElementById("storybook_iframe") as HTMLIFrameElement;

        iframe.src = address;
    }

    private setPlaceholderActive(active : boolean) {
        console.log(active);

        document.getElementById("iframe_placeholder").style.display = active ? "flex"   : "none";
        document.getElementById("storybook_iframe").style.display   = active ? "none"   : "inline";
    }
}