import { v4 as uuidv4 } from 'uuid';

export default class Storybook {
    name : string;
    address : string;
    id: string;

    constructor(name : string, address : string, id? : string) {
        this.name = name;
        this.address = address;
        this.id = id || uuidv4();
    }
}