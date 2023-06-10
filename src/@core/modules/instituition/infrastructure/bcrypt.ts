import Encryptor from "../contracts/encryptor.interface";
import * as bcrypt from 'bcrypt'
export default class BcryptEncryptor implements Encryptor {
    async execute(password: string): Promise<string> {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    }

}