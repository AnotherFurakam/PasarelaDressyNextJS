import { CgSpinner } from "react-icons/cg"

interface Props {
  disabled: boolean
  isSendButton: boolean
}

const SendButton: React.FC<Props> = ({ disabled, isSendButton }) => {

  return (
    <button type={"submit"} disabled={disabled}
      className={
        `
        flex
        justify-center
        text-white 
        active:text-white
        hover:text-sky-600 
        bg-sky-600 
        active:bg-sky-600 
        transition-all delay-[75ms_esase] 
        py-2 
        w-full 
        rounded-md 
        mt-2 
        hover:bg-transparent 
        border-2 border-sky-600 
        disabled:bg-gray-400
        disabled:hover:bg-gray-400
        disabled:hover:text-white
        disabled:border-gray-400
        disabled:hover:border-gray-400
        `
      }
    >
      {!disabled ? isSendButton ? 'Registrar' : 'Guardar' : <CgSpinner className="text-white text-2xl animate-spin" />}
    </button>
  )
}

export default SendButton