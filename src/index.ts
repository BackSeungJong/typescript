
// # 1강
// const name = "Back",
//     age = 24,
//     gender = "male";

// const sayHi = (name, age, gender?) => { // ? : optional
//     console.log(`Hello ${name}, you are ${age}, you are a ${gender}`);
// }

// sayHi(name, age, gender);
// sayHi(name, age);


// # 2강
// const sayHi = (name: string, age: number, gender: string): string => {
//     return (`Hello ${name}, you are ${age}, you are a ${gender}`);
// }

// console.log(sayHi("qqq", 28, "male"));

// # 3강
// interface Human {
//     name: string,
//     age: number,
//     gender: string
// }

// const person = {
//     name: "back",
//     age: 28,
//     gender: "male"
// }
// const sayHi = (person: Human): string => {
//     return (`Hello ${person.name}, you are ${person.age}, you are a ${person.gender}`);
// }

// console.log(sayHi(person));

// # 4강
// class Human {
//     public name: string;
//     public age: number;
//     public gender: string;

//     constructor(name: string, age: number, gender?: string) {
//         this.name = name;
//         this.age = age;
//         this.gender = gender;
//     }
// }

// const lynn = new Human("Lynn", 24, "female");

// const sayHi = (person: Human): string => {
//     return (`Hello ${person.name}, you are ${person.age}, you are a ${person.gender}`);
// }

// console.log(sayHi(lynn));

// # 5강
import * as CryptoJs from "crypto-js";


class Block {
    static calculateBlockHash = (index: number,
        previousHash: string,
        timestamp: number,
        data: string): string =>
        CryptoJs.SHA256(index + previousHash + timestamp + data).toString();

    static validateStructure = (aBlock: Block): boolean => (
        typeof aBlock.index === "number" &&
        typeof aBlock.hash === "string" &&
        typeof aBlock.previousHash === "string" &&
        typeof aBlock.timestamp === "number" &&
        typeof aBlock.data === "string"
    );

    public index: number;
    public hash: string;
    public previousHash: string;
    public data: string;
    public timestamp: number;


    constructor(index: number, hash: string, previousHash: string, data: string, timestamp: number) {
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.data = data;
        this.timestamp = timestamp;
    }
}

const genesisBlock: Block = new Block(0, "20202020", "", "Hello", 12345);
let blockChain: Block[] = [genesisBlock];

// blockChain.push(new Block(1, "1234", "", "Bye", 222));

const getBlockChain = (): Block[] => blockChain;
const getLatestBlock = (): Block => blockChain[blockChain.length - 1];
const getNewTimestamp = (): number => Math.round(new Date().getTime() / 1000);

const createNewBlock = (data: string): Block => {
    const previousBlock: Block = getLatestBlock();
    const newIndex: number = previousBlock.index + 1;
    const newTimestamp: number = getNewTimestamp();

    const nextHash: string = Block.calculateBlockHash(
        newIndex,
        previousBlock.hash,
        newTimestamp,
        data
    );

    const newBlock: Block = new Block(newIndex, nextHash, previousBlock.hash, data, newTimestamp);

    addBlock(newBlock);
    return newBlock;
}

const getHashforBlock = (aBlock: Block): string => Block.calculateBlockHash(aBlock.index, aBlock.previousHash, aBlock.timestamp, aBlock.data);

const isBlockValid = (candidateBlock: Block, previousBlock: Block): boolean => {
    if (!Block.validateStructure(candidateBlock)) {
        return false;
    } else if (previousBlock.index + 1 !== candidateBlock.index) {
        return false;
    } else if (previousBlock.hash !== candidateBlock.previousHash) {
        return false;
    } else if (getHashforBlock(candidateBlock) !== candidateBlock.hash) {
        return false;
    } else {
        return true;
    }
}

const addBlock = (candidateBlock: Block): void => {
    if (isBlockValid(candidateBlock, getLatestBlock())) {
        blockChain.push(candidateBlock);
    }
}

createNewBlock("second block");
createNewBlock("third block");
createNewBlock("fourth block");

console.log(blockChain);

export { };