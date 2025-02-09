import { Injectable } from '@nestjs/common';
import { MemberRepository } from '../repository/member.repository';
import { MemberEntity } from '../entity/mysql/member.entity';

@Injectable()
export class CreateMemberService {
    constructor(private readonly memberRepository: MemberRepository) {}

    async createMember(memberDto: MemberEntity): Promise<any> {
        await this.memberRepository.createMember(memberDto);
    }
}
