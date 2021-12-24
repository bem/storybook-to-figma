import * as React from 'react'
import StorybookStorage from '../modules/storybook/StorybookStorage';
import Iframe from './Iframe';
import Modal from './modal/Modal';
import ModalOpenButton from './modal/ModalOpenButton';
import StorybookList from './storybook/StorybookList';

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
                <StorybookList/>
            </Modal>
        </div>
    }
}