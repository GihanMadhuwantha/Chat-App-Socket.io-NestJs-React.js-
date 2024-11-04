
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma.service';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [UsersModule, AuthModule,ChatModule],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}

