import { Loader } from "lucide-react"

const LoaderPage = () => {
  return (
      <div className="min-h-screen flex justify-center items-center">
        <Loader className="w-10 h-10 animate-spin" />  
    </div>
  )
}

export default LoaderPage