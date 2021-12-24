import './ui.css'
import ModalWindow from './modules/ui/ModalWindow'
import App from './components/App'

import * as React from 'react'
import * as ReactDOM from 'react-dom'

window.addEventListener('message', (e) => window.parent.postMessage(e.data, '*'));

window.onload = () => {
    new ModalWindow().init();
    ReactDOM.render(<App />, document.getElementById('react-page'))
}