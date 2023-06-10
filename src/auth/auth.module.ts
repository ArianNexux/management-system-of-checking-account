import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import EmployeeRepository from 'src/@core/modules/instituition/repository/prisma/employee.repository';
import { jwtConstants } from './constants';
import { JwtModule } from '@nestjs/jwt';
import { JwtService } from '@nestjs/jwt';
@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    EmployeeRepository,
    {
      provide: AuthService,
      useFactory: (repo: EmployeeRepository, jwt: JwtService) => {
        return new AuthService(repo, jwt);
      }, inject: [EmployeeRepository, JwtService]
    }
  ]
})
export class AuthModule { }
