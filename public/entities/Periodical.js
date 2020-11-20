import Document from "./Document.js";
export class Periodical extends Document {
    constructor(issn, volume, issue, title, subtitle, publishedAt, author) {
        super(title, subtitle, publishedAt, author);
        this.issn = issn;
        this.volume = volume;
        this.issue = issue;
    }
}
export default Periodical;
