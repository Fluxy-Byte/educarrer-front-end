"use client"

import { toast } from "sonner";

import { useState, useEffect } from "react"
import { useSession } from "@/lib/auth/auth-client"
import { authClient } from "@/lib/auth/auth-client"
import { useSkills } from "@/app/services/skills.swr";
import { useExperiences } from "@/app/services/experiences.swr";

import { Loader2 } from "lucide-react";

import { DialogSkill } from "@/components/dialog/dialog-skill.create";

import { DialogSkillView } from "@/components/dialog/dialog-skill.view";

export default function DashboardPage() {
  const { data: session } = useSession();
  const { skills } = useSkills();
  const { experiences } = useExperiences();

  const handleLogout = async () => {
    await authClient.signOut()
  }


  return (
    <div className="w-full min-h-screen">
      <div className="w-full bg-white rounded-lg shadow p-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-black text-2xl font-semibold">Habilidades</h1>
          <DialogSkill />
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

    </div>
  )
}

