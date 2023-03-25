import { ErrorMessage, Field } from "formik"
import { FC } from "react"

interface Props {
  label: string,
  type: string,
  name: string,
  autoComplete: string,
  maxLength?: number,
  component?: string
  rows?: string
}

const FormInput: FC<Props> = ({ type, name, autoComplete, label, maxLength, component, rows }) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="mb-1 text-md text-slate-800">{label}</label>
      <Field type={type} name={name} autoComplete={autoComplete} maxLength={maxLength} component ={component} rows={rows}
        className='border-[2.3px] border-indigo-400 outline-none rounded-md py-[2px] px-2 focus:border-indigo-500 transition-all delay-75'
      />
      <ErrorMessage name={name} component={'p'} className="text-red-600 ml-1" />
    </div>
  )
}

export default FormInput