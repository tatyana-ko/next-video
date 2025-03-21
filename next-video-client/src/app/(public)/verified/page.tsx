import { Check } from "lucide-react"

export default function VerifiedPage() {
  return <div className="flex items-center gap-4">
    <Check color="green" size={44}/>
    <h1 className="text-3xl">You have successfully passed verification!</h1>
  </div>
}
