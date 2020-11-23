import  Book  from "./entities/Book.js";
import Periodical from "./entities/Periodical.js";
import Person from "./entities/Person.js";
import {Gender} from "./entities/Person.js";

let person1 = new Person('J. K. Rowling', new Date('1965-07-31T00:00:00'), Gender.Female)
let book1 = new Book(552, 22, 1, "Harry Potter", "Pedra Filosofal", new Date('1997-06-26T00:00:00'), person1)
let person2 = new Person('Junin', new Date('1970-05-16T00:00:00'), Gender.Male)
let book2 = new Book(559, 32, 5,"A Cabana", "O Despertar", new Date('2000-05-04T00:00:00'), person2)
let person3 = new Person('Roberta', new Date('1968-07-21T00:00:00'), Gender.Female)
let book3 = new Book(56, 58, 4,"Diário de um banana", "Rodrick é o cara", new Date('2009-09-15T00:00:00'), person3)
let periodical1 = new Periodical(4445, 20, 15, 'SUPERINTERESSANTE', 'BRAIN', new Date('2015-09-10T00:00:00'), person2)
let periodical2 = new Periodical(5520, 19, 10, 'VEJA', 'Atrizes', new Date('2017-11-25T00:00:00'), person3)
let periodical3 = new Periodical(4445, 20, 15, 'ISTOE', 'AQUILOLA', new Date('2020-02-11T00:00:00'), person2)

console.log(person1)
console.log(person2)
console.log(person3)
console.log(book1)
console.log(book2)
console.log(book3)
console.log(periodical1)
console.log(periodical2)
console.log(periodical3)


