import { OnQueueActive, OnQueueWaiting, Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { CreateMemberService } from '../service/create-member.service';

@Processor('member')
export class MemberProcessor {
    constructor(private readonly createMemberService: CreateMemberService) {
        console.log('워커(프로세서)가 시작됨');
    }

    @Process('createMemberJob')
    async createMember(job: Job): Promise<void> {
        console.log(job.data);
        const { data } = job;

        if (data) {
            try {
                await this.createMemberService.createMember(data);
            } catch (error: any) {
                console.error(`회원생성 큐 데이터 적재 실패 : ${error}`);
            }
        }
    }

    @OnQueueActive()
    async onActive(job: Job) {
        console.log(`[ 수행완료 ] - [ name : ${job.name} id : ${job.id} ]`);
    }

    /*
        [ Job이 Queue에 추가됬지만, 아직 실행되지 않았을 때 실행됨 ]
        - delay 옵션을 설정하여 추가된 작업건으로 아직 실행되지 않은 경우
        - 실행 중인 Worker가 부족하여 작업이 대기열(Wating)에 들어간 경우
        - Paused 상태에서 작업이 대기중인 경우
        - 특정 Job이 먼저 실행되도록 priority 설정을 한 경우
    */
    @OnQueueWaiting()
    async onWaiting(jobId: number) {
        console.log(`작업 ${jobId}가 대기 큐에 들어갔음`);
    }
}
