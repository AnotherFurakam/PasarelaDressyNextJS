
interface Props {
  disabled: boolean
}

const SendButton:React.FC<Props> = ({ disabled}) => {


  return (
    <button type={"submit"} disabled={disabled}
      className="bg-sky-600 text-white py-2 w-full rounded-md mt-2 hover:bg-transparent hover:text-sky-600 border-2 border-sky-600 transition-all delay-[75ms_esase] active:bg-sky-600 active:text-white"
    >
      Registrar
    </button>
  )
}

export default SendButton