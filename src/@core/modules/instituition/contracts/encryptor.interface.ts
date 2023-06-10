export default interface Encryptor {
    execute(password: string): Promise<string>
}