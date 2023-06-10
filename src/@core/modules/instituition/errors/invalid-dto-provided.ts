export default class InvalidDTOProvided extends Error {
    constructor() {
        super("Input DTO was not provided")
    }
}