export default class Note {
    static ONE = new Note(1);
    static FIVE = new Note(5);
    static TEN = new Note(10);
    static TWENTY = new Note(20);

    private value: number;
    constructor(value: number) {
        this.value = value;
    }

    getValue() {
        return this.value;
    }
}