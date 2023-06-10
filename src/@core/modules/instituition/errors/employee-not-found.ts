export default class EmployeeNotFound extends Error {
    constructor(msg: string) {
        super(msg)
    }
}