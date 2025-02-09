import { Module } from '@nestjs/common';
import { CreateMemberService } from './service/create-member.service';
import { MemberController } from './member.controller';
import { BullModule } from '@nestjs/bull';
import { MemberRepository } from './repository/member.repository';
import { MemberProcessor } from './processor/member.processor';

@Module({
    imports: [
        BullModule.registerQueue({
            name: 'member'
        })
    ],
    controllers: [MemberController],
    providers: [MemberRepository, CreateMemberService, MemberProcessor],
    exports: []
})
export class MemberModule {}
