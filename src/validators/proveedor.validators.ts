import * as Yup from 'yup'

export const proveedorFormSchema = Yup.object().shape({
  nombre: Yup
    .string()
    .matches('^[a-zA-ZÀ-ÿ\u00f1\u00d1]+[a-z A-Z]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]$' as any, 'Solo se permite texto')
    .min(2, "Se permite como mínimo 2 caracteres")
    .max(50, "Se permite como mínimo 50 caracteres")
    .required("Debe llenar este campo"),
  telefono: Yup
    .string()
    .matches('^[9][0-9]{8,8}$' as any, "Debe ingresar un número de celular válido")
    .min(9, "Debe tener un mínimo de 9 caracteres")
    .max(9, "Debe tener un máximo de 9 caracteres")
    .required("Debe llenar este campo"),
  direccion: Yup
    .string()
    .min(5, "Debe tener un mínimo de 5 caracteres")
    .max(300, "Debe tener un máximo de 300 caracteres")
    .required("Debe llenar este campo")
}) 