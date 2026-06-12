"use client"

import { useSkills } from "@/app/services/skills.swr";
import { useExperiences } from "@/app/services/experiences.swr";

import { Loader2, WandSparkles, BriefcaseBusiness } from "lucide-react";

import { DialogSkillCreate } from "@/components/dialog/dialog-skill.create";
import { DialogExperienceCreate } from "@/components/dialog/dialog-experience.create";

import CadsSkill from "@/components/cards/card-skill";
import CadsExperience from "@/components/cards/card-experience";

export default function DashboardPage() {
  const { skills } = useSkills();
  const { experiences } = useExperiences();

  return (
    <div className="w-full min-h-full flex flex-col gap-4 relative">
      <div className="w-full bg-white rounded-lg shadow p-4">
        <div className="flex items-center justify-start gap-4">
          <span className="p-4 bg-blue-100 rounded-lg">
            <WandSparkles className="text-blue-600" />
          </span>
          <span className="flex flex-col items-start">
            <h1 className="text-black text-2xl font-semibold">Habilidades</h1>
            <p className="text-sm text-zinc-600">Gerencie suas principais habilidades técnicas e comportamentais</p>
          </span>

        </div>
        <div className="w-full py-4 gap-2 flex flex-col">
          {skills ? (
            skills.map((skill) => (
              <CadsSkill key={skill.id} skill={skill} />
            ))
          ) : (
            <div className="w-full p-4 flex items-center justify-center">
              <Loader2 className="animate-spin" />
            </div>
          )}
        </div>
        <div className="w-full bg-red-100">
          <DialogSkillCreate />
        </div>
      </div>

      <div className="w-full bg-white rounded-lg shadow p-4">

        <div className="flex items-center justify-start gap-4">
          <span className="p-4 bg-purple-100 rounded-lg">
            <BriefcaseBusiness className="text-purple-600" />
          </span>
          <span className="flex flex-col items-start">
            <h1 className="text-black text-2xl font-semibold">Experiências profissionais</h1>
            <p className="text-sm text-zinc-600">Gerencie seu histórico profissional</p>
          </span>
        </div>
        <div className="w-full py-4 gap-2 flex flex-col">
          {skills ? (
            experiences.map((experience) => (
              <CadsExperience key={experience.id} experience={experience} />
            ))
          ) : (
            <div className="w-full p-4 flex items-center justify-center">
              <Loader2 className="animate-spin" />
            </div>
          )}
        </div>
        <div>
          <DialogExperienceCreate />
        </div>
      </div>

    </div>
  )
}

