import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DataSource, InsertResult, Repository } from 'typeorm';
import { MemberEntity } from '../entity/mysql/member.entity';

@Injectable()
export class MemberRepository {
    private readonly memberRepository: Repository<MemberEntity>;

    constructor(protected readonly dataSource: DataSource) {
        this.memberRepository = dataSource.getRepository(MemberEntity);
    }

    async createMember(memberDto: Partial<MemberEntity>): Promise<number> {
        const insertResult: InsertResult = await this.memberRepository.insert(memberDto);

        const { raw } = insertResult;

        if (!raw?.insertId) {
            throw new InternalServerErrorException('회원 생성이 정상적으로 동작되지 않았습니다.');
        }

        return raw.insertId;
    }
}
