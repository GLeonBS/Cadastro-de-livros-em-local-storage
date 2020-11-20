export var Gender;
(function (Gender) {
    Gender["Female"] = "f";
    Gender["Male"] = "m";
})(Gender || (Gender = {}));
export class Person {
    constructor(name, birth, gender) {
        this.name = name;
        this.birth = birth;
        this.gender = gender;
    }
}
export default Person;
