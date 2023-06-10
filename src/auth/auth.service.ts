import { Injectable, UnauthorizedException } from '@nestjs/common';
import EmployeeRepository from 'src/@core/modules/instituition/repository/prisma/employee.repository';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt'
@Injectable()
export class AuthService {

    constructor(private usersService: EmployeeRepository, private jwtService: JwtService) { }

    async signIn(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findByEmail(email);
        const isPasswordValid = await compare(pass, user.password)
        if (!isPasswordValid) {
            throw new UnauthorizedException();
        }
        const { password, ...result } = user;
        const payload = { sub: user.id.value, username: user.name.value };
        return {
            data: {
                id: user.id.value,
                email: user.email.value,
                name: user.name.value,
                role: user.role,
                position: user.position,
                photo: user.photo
            },
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
