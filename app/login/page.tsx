import { Dna } from "lucide-react"

import { LoginForm } from "@/components/login-form"

//import image from "@/public/logoP_notext.png"



export default function LoginPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="flex items-center self-center text-xl items-center">
          <Dna className="text-primary"></Dna>
          <span className="text-black font-bold mr-0">healthy</span><span className="text-gray-500 font-medium">genome</span>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
