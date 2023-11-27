export interface GetSkillResponse {
  id: string;
  name: string;
  description: string;
}

export interface SkillGateway {
  getSkill(skillId: string): Promise<GetSkillResponse | undefined>;
}
