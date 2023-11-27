import { Injectable } from '@nestjs/common';

import { GetSkillResponse, SkillGateway } from '../../../application/ports/skill.gateway';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class SkillGatewayInternal implements SkillGateway {
  constructor(protected httpService: HttpService) {}
  async getSkill(skillId: string): Promise<GetSkillResponse | undefined> {
    const { data } = await this.httpService.axiosRef.get<GetSkillResponse>(`/skill/${skillId}`);
    return data;
  }
}
