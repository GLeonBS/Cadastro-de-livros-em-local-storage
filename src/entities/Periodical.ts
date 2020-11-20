import Person from "./Person.js"
import Document from "./Document.js"
import {pubAt} from "./Document.js"

export class Periodical extends Document{
    issn: number
    volume: Number 
    issue: Number

    constructor(issn: number, volume: Number, issue: Number, title: string, subtitle: string, publishedAt: pubAt, author: Person){
        super(title, subtitle, publishedAt, author)
        this.issn = issn
        this.volume = volume
        this.issue = issue
    }
}

export default Periodical