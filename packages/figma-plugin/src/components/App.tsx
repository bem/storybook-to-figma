import * as React from 'react'
import StorybookStorage from '../modules/storybook/StorybookStorage';
import Iframe from './Iframe';
import Modal from './modal/Modal';
import ModalOpenButton from './modal/ModalOpenButton';

interface AppState {
    modalOpen: boolean;
}

export default class App extends React.Component {
    private storage: StorybookStorage;

    state : AppState = {
        modalOpen: false,
    }

    constructor(props: any) {
        super(props)

        this.storage = new StorybookStorage();
    }

    setModalOpen(modalOpen : boolean) {
        this.setState({modalOpen});
    }

    render() : React.ReactNode {
        return <div className="container">
            <Iframe/>
            <ModalOpenButton callback={() => this.setModalOpen(true)}/>
            <Modal isShown={this.state.modalOpen} closeButtonCallback={() => this.setModalOpen(false)}>
                <h1> Hello from React! </h1>
            </Modal>
        </div>
    }
}