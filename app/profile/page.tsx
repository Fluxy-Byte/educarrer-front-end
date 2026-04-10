"use client"



import { toast } from "sonner";

import { useState, useEffect } from "react"
import { useSession } from "@/lib/auth/auth-client"
import { authClient } from "@/lib/auth/auth-client"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  MessageCircle,
  Users,
  TrendingUp,
  Lightbulb,
  Phone,
  Mail,
  Building2,
  Settings,
  LogOut,
  BarChart3,
  Zap,
  Search,
  Loader2,
  Clock,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"


export default function DashboardPage() {
  const { data: session } = useSession();


  const handleLogout = async () => {
    await authClient.signOut()
  }


  return (
    <div className="w-full min-h-screen bg-background">
      
    </div>
  )
}

