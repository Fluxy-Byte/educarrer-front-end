"use client"

import { toast } from "sonner";

import { useState, useEffect } from "react"
import { useSession } from "@/lib/auth/auth-client"
import { authClient } from "@/lib/auth/auth-client"
import { useSkills } from "@/app/services/skills.swr";
import { useExperiences } from "@/app/services/experiences.swr";

import { Loader2 } from "lucide-react";

import { DialogSkillCreate } from "@/components/dialog/dialog-skill.create";
import { DialogSkillView } from "@/components/dialog/dialog-skill.view";

import { DialogExperienceCreate } from "@/components/dialog/dialog-experience.create";
import { DialogExperienceView} from "@/components/dialog/dialog-experience.view";

export default function DashboardPage() {
  const { skills } = useSkills();
  const { experiences } = useExperiences();

  const handleLogout = async () => {
    await authClient.signOut()
  }


  return (
    <div className="w-full min-h-full flex flex-col gap-4 relative">
      <div className="w-full bg-white rounded-lg shadow p-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-black text-2xl font-semibold">Habilidades</h1>
          <DialogSkillCreate />
        </div>
        <div className="w-full py-4 gap-2 flex flex-col">
          {skills ? (
            skills.map((skill) => (
              <DialogSkillView key={skill.id} skill={skill} />
            ))
          ) : (
            <div className="w-full p-4 flex items-center justify-center">
              <Loader2 className="animate-spin" />
            </div>
          )}
        </div>
      </div>

      <div className="w-full bg-white rounded-lg shadow p-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-black text-2xl font-semibold">Experiências profissionais</h1>
          <DialogExperienceCreate />
        </div>
        <div className="w-full py-4 gap-2 flex flex-col">
          {skills ? (
            experiences.map((experience) => (
              <DialogExperienceView key={experience.id} experience={experience} />
            ))
          ) : (
            <div className="w-full p-4 flex items-center justify-center">
              <Loader2 className="animate-spin" />
            </div>
          )}
        </div>
      </div>

    </div>
  )
}

