export default class InstituitionNotFound extends Error {
    constructor(msg: string) {
        super(msg)
    }
}