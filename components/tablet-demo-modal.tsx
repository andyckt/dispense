"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import TabletAnalysisDemo from "./tablet-analysis-demo"
import { ArrowRight } from "lucide-react"

interface TabletDemoModalProps {
  buttonText?: string
  buttonVariant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive"
  buttonSize?: "default" | "sm" | "lg" | "icon"
  showIcon?: boolean
}

export default function TabletDemoModal({
  buttonText = "Try Now",
  buttonVariant = "default",
  buttonSize = "lg",
  showIcon = true,
}: TabletDemoModalProps) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={buttonVariant} size={buttonSize} className="bg-blue-600 hover:bg-blue-700">
          {buttonText}
          {showIcon && <ArrowRight className="ml-2 h-5 w-5" />}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[650px] p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-2xl font-bold text-center">AI Tablet Analysis</DialogTitle>
          <DialogDescription className="text-center">
            Experience our AI-powered tablet recognition technology
          </DialogDescription>
        </DialogHeader>
        <div className="p-6 pt-2">
          <TabletAnalysisDemo />
        </div>
      </DialogContent>
    </Dialog>
  )
} 