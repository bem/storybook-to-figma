import * as React from 'react'
import StorybookStorage from '../modules/storybook/StorybookStorage';


export default class App extends React.Component {
    private storage: StorybookStorage;

    constructor(props: any) {
        super(props)

        this.storage = new StorybookStorage();
        this.storage.awaitForRequest();
    }

    render() : React.ReactNode {
        return <h1>Hello from React</h1>
    }
}