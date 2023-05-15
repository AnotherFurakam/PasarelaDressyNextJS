import * as Yup from 'yup'

export const loginFormSchema = Yup.object().shape({
  correo: Yup
    .string()
    .min(5, 'Debe tener mínimo 5 números')
    .max(60, 'Debe tener máximo 60 números')
    .email("Debe ingresar un correo válido")
    .required("Debe llenar este campo"),
  contrasenia: Yup
    .string()
    .min(8, "Debe tener un mínimo de 5 caracteres")
    .max(20, "Debe tener un máximo de 300 caracteres")
    .required("Debe llenar este campo")
}) 