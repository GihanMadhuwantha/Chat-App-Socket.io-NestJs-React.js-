
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [UsersModule, AuthModule],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}

