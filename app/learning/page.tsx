"use client"



import { toast } from "sonner";

import { useState, useEffect } from "react"
import { useSession } from "@/lib/auth/auth-client"
import { authClient } from "@/lib/auth/auth-client"
import { useSkills } from "@/app/services/skills.swr";
import { useExperiences } from "@/app/services/experiences.swr";


export default function DashboardPage() {
  const { data: session } = useSession();
  const { skills } = useSkills();
  const { experiences } = useExperiences();

  const handleLogout = async () => {
    await authClient.signOut()
  }

  return (
    <div className="w-full min-h-screen bg-background">
      
    </div>
  )
}

