import './resources/styles/ui.css'
import App from './components/App'

import * as React from 'react'
import * as ReactDOM from 'react-dom'

window.addEventListener('message', (e) => window.parent.postMessage(e.data, '*'));

window.onload = () => {
    ReactDOM.render(<App />, document.getElementById('react-page'))
}