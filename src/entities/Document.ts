import Person from "./Person.js"

export type pubAt = Date | number

export class Document{

    title : string
    subtitle: string
    publishedAt: pubAt
    author: Person

    constructor(title: string, subtitle: string, publishedAt: pubAt, author: Person){
        this.title = title
        this.subtitle = subtitle
        this.publishedAt = publishedAt
        this.author = author
    }
}
export default Document