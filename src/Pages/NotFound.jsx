import { MdOutlineError } from "react-icons/md";
const NotFound = () => {
  return (
    <div>
      <p className="text-4xl font-bold text-center mt-96">Error 404 <MdOutlineError className="mx-auto"/></p>
      <p className="text-4xl font-bold text-center mb-40">Page Not Found</p>
      </div>
  )
}

export default NotFound