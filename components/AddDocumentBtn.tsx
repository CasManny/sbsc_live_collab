import { Plus } from "lucide-react"
import { Button } from "./ui/button"

const AddDocumentBtn = () => {
    return (
        <Button type="submit" className="bg-gradient-to-t bg-sbsc/95 shadow-md">
            <Plus className="w-5 h-5 text-white" />
            <p>Start a blank Document</p>
      </Button>
  )
}

export default AddDocumentBtn