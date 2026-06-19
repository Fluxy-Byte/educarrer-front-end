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
                    "version": "3"
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
                        "name": "study_schema",
                        "strict": true,
                        "schema": {
                            "type": "object",
                            "properties": {
                                "study_name": {
                                    "type": "string",
                                    "description": "The name or title of the overall study or plan."
                                },
                                "studies": {
                                    "type": "array",
                                    "description": "List of study sections, their type, and associated content.",
                                    "items": {
                                        "type": "object",
                                        "properties": {
                                            "section": {
                                                "type": "string",
                                                "description": "The label or name of this study section."
                                            },
                                            "content": {
                                                "anyOf": [
                                                    {
                                                        "type": "string",
                                                        "description": "Summary content for type 'resume'."
                                                    },
                                                    {
                                                        "type": "array",
                                                        "description": "List of strengths for type 'strengths'.",
                                                        "items": {
                                                            "type": "object",
                                                            "properties": {
                                                                "skill": {
                                                                    "type": "string",
                                                                    "description": "Name of the strength or skill."
                                                                },
                                                                "importance": {
                                                                    "type": "string",
                                                                    "description": "Description or level of importance."
                                                                },
                                                                "advice": {
                                                                    "type": "string",
                                                                    "description": "Suggested advice related to the skill."
                                                                }
                                                            },
                                                            "required": [
                                                                "skill",
                                                                "importance",
                                                                "advice"
                                                            ],
                                                            "additionalProperties": false
                                                        }
                                                    },
                                                    {
                                                        "type": "array",
                                                        "description": "Relevant lacunae to develop and their details for type 'lacunasaDevelop'.",
                                                        "items": {
                                                            "type": "object",
                                                            "properties": {
                                                                "skill": {
                                                                    "type": "string",
                                                                    "description": "The skill identified for development."
                                                                },
                                                                "explanation": {
                                                                    "type": "string",
                                                                    "description": "Explanation for needing development."
                                                                },
                                                                "priority": {
                                                                    "type": "string",
                                                                    "description": "Priority level for development."
                                                                },
                                                                "topics": {
                                                                    "type": "array",
                                                                    "description": "List of specific topics related to the skill.",
                                                                    "items": {
                                                                        "type": "string"
                                                                    }
                                                                },
                                                                "resources": {
                                                                    "type": "array",
                                                                    "description": "Recommended resources for learning.",
                                                                    "items": {
                                                                        "type": "string"
                                                                    }
                                                                },
                                                                "estimated_time": {
                                                                    "type": "string",
                                                                    "description": "Estimated time needed for development."
                                                                }
                                                            },
                                                            "required": [
                                                                "skill",
                                                                "explanation",
                                                                "priority",
                                                                "topics",
                                                                "resources",
                                                                "estimated_time"
                                                            ],
                                                            "additionalProperties": false
                                                        }
                                                    },
                                                    {
                                                        "type": "array",
                                                        "description": "Study plans for type 'studyPlans'.",
                                                        "items": {
                                                            "type": "object",
                                                            "properties": {
                                                                "week": {
                                                                    "type": "number",
                                                                    "description": "Week number in the study plan.",
                                                                    "minimum": 1
                                                                },
                                                                "focus": {
                                                                    "type": "string",
                                                                    "description": "Primary focus or highlights for this week."
                                                                },
                                                                "goals": {
                                                                    "type": "string",
                                                                    "description": "Goals set for this week."
                                                                }
                                                            },
                                                            "required": [
                                                                "week",
                                                                "focus",
                                                                "goals"
                                                            ],
                                                            "additionalProperties": false
                                                        }
                                                    }
                                                ]
                                            },
                                            "type": {
                                                "type": "string",
                                                "description": "The section type (resume, strengths, lacunasaDevelop, studyPlans, finalTip).",
                                                "enum": [
                                                    "resume",
                                                    "strengths",
                                                    "lacunasaDevelop",
                                                    "studyPlans",
                                                    "finalTip"
                                                ]
                                            }
                                        },
                                        "required": [
                                            "section",
                                            "content",
                                            "type"
                                        ],
                                        "additionalProperties": false
                                    }
                                }
                            },
                            "required": [
                                "study_name",
                                "studies"
                            ],
                            "additionalProperties": false
                        }
                    }
                },
                reasoning: {},
                max_output_tokens: 5700,
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

    async filterVacancysToUser(skills: SkillDTO[], experiences: ExperienceDTO[], vacancys: VacancyDTO[]): Promise<string | null> {
        try {

            const data = {
                skills,
                experiences,
                vacancys
            }

            const response = await openai.responses.create({
                prompt: {
                    "id": "pmpt_6a346cc9efd88194bc2fc7c62f1479cf0c5a0ff0b420e44b",
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
                        "type": "json_schema",
                        "name": "vagas_compativeis",
                        "strict": true,
                        "schema": {
                            "type": "object",
                            "properties": {
                                "ids_vagas": {
                                    "type": "array",
                                    "description": "Array contendo os ids das vagas compatíveis com o perfil.",
                                    "items": {
                                        "type": "number",
                                        "description": "Id da vaga compatível."
                                    }
                                }
                            },
                            "required": [
                                "ids_vagas"
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

            const parsed: string = raw;
            return parsed;

        } catch (error: any) {
            return null;
        }
    }
}



