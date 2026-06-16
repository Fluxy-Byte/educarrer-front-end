import { VacancyDTO } from "@/lib/interfaces/vacancy.interface";
import { ExperienceDTO } from "@/lib/interfaces/experience.interface";
import { SkillDTO } from "@/lib/interfaces/skill.interface";

import type { SkillsAndExperienceComparisonResponse } from "@/lib/interfaces/openai.interface";

import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export class HundleStudyWithOpenAi {
    async getImportantSkills(skills: SkillDTO[], experiences: ExperienceDTO[], vacancy: VacancyDTO): Promise<SkillsAndExperienceComparisonResponse | null> {
        try {

            const data = {
                skills,
                experiences,
                vacancy
            }

            const response = await openai.responses.create({
                prompt: {
                    "id": "pmpt_69fa7f7173088190a697894bf8c62fc70af22ad626ad94d2",
                    "version": "2"
                },
                input: [
                    {
                        "role": "user",
                        "content": [
                            {
                                "type": "input_text",
                                "text": JSON.stringify(data)
                            }
                        ]
                    }
                ],
                text: {
                    "format": {
                        "type": "json_schema",
                        "name": "tech_stack_comparison",
                        "strict": true,
                        "schema": {
                            "type": "object",
                            "properties": {
                                "missing": {
                                    "type": "array",
                                    "description": "Lista de tecnologias que estão faltando na pilha.",
                                    "items": {
                                        "type": "string",
                                        "minLength": 1
                                    }
                                },
                                "strong": {
                                    "type": "array",
                                    "description": "Lista de tecnologias nas quais há proficiência.",
                                    "items": {
                                        "type": "string",
                                        "minLength": 1
                                    }
                                },
                                "matchPercentage": {
                                    "type": "number",
                                    "description": "Percentual de correspondência entre as tecnologias.",
                                    "minimum": 0,
                                    "maximum": 100
                                }
                            },
                            "required": [
                                "missing",
                                "strong",
                                "matchPercentage"
                            ],
                            "additionalProperties": false
                        }
                    }
                },
                reasoning: {},
                max_output_tokens: 2048,
                store: true,
                include: ["web_search_call.action.sources"]
            });

            const raw = ((response.output as any)?.[0]?.content?.[0]?.text) ?? null;

            if (!raw) return null;

            const parsed: SkillsAndExperienceComparisonResponse = JSON.parse(raw);
            return parsed;

        } catch (error: any) {
            return null
        }
    }

    async createResumeCandidate(skills: SkillDTO[], experiences: ExperienceDTO[]): Promise<string | null> {
        try {

            const data = {
                skills,
                experiences
            }

            const response = await openai.responses.create({
                prompt: {
                    "id": "pmpt_6a0a63b732e4819398cd1c5d96c6e9940abad56442d1f780",
                    "version": "1"
                },
                input: [
                    {
                        "role": "user",
                        "content": [
                            {
                                "type": "input_text",
                                "text": JSON.stringify(data)
                            }
                        ]
                    }
                ],
                text: {
                    "format": {
                        "type": "text"
                    }
                },
                reasoning: {},
                max_output_tokens: 2048,
                store: true,
                include: ["web_search_call.action.sources"]
            });

            const raw = ((response.output as any)?.[0]?.content?.[0]?.text) ?? null;

            if (!raw) return null;

            const parsed: string = raw;
            return parsed;

        } catch (error: any) {
            return null;
        }
    }

    async createRoadMapCandidate(vacancy: VacancyDTO, profile: any): Promise<string | null> {
        try {

            const data = {
                vacancy,
                profile
            }

            const response = await openai.responses.create({
                prompt: {
                    "id": "pmpt_6a0ceb3ed4e08196a7b2e1452e0407f800520187412e4817",
                    "version": "2"
                },
                input: [
                    {
                        "role": "user",
                        "content": [
                            {
                                "type": "input_text",
                                "text": JSON.stringify(data)
                            }
                        ]
                    }
                ],
                text: {
                    "format": {
                        "type": "text"
                    }
                },
                reasoning: {},
                max_output_tokens: 2048,
                store: true,
                include: ["web_search_call.action.sources"]
            });

            const raw = ((response.output as any)?.[0]?.content?.[0]?.text) ?? null;

            if (!raw) return null;

            const parsed: string = raw;
            return parsed;

        } catch (error: any) {
            return null;
        }
    }
}



