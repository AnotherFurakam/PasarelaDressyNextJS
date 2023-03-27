import { useFetchProveedores } from "@/hooks/useFetchProveedores";
import { ProveedorForm } from "@/interfaces/proveedor-interfaces";
import { proveedorFormSchema } from "@/validators/proveedor.validators";
import { Form, Formik } from "formik";
import Swal from "sweetalert2";
import FormInput from "../FormComponents/FromInput";
import SendButton from "../FormComponents/SendButton";

interface Props {
  handleCloseModal: () => void
}

const ProveedorForm: React.FC<Props> = ({ handleCloseModal }) => {

  const { addProveedor, updateProveedor, selectedProveedor } = useFetchProveedores();

  const proveedorInitialValues: ProveedorForm = {
    nombre: selectedProveedor?.nombre ?? '',
    direccion: selectedProveedor?.direccion ?? '',
    telefono: selectedProveedor?.telefono ?? ''
  }

  return (
    <Formik
      initialValues={proveedorInitialValues}
      validationSchema={proveedorFormSchema}
      onSubmit={
        async (values, helpers) => {

          if (!selectedProveedor) {
            //*Registrando Empleado
            await addProveedor(values)
              .then(() => {
                Swal.fire({
                  icon: 'success',
                  text: 'Empleado registrado correctamente'
                })
                helpers.setSubmitting(false)
                handleCloseModal()
              }).catch((err: Error) => {
                Swal.fire({
                  icon: 'error',
                  html: err.message,
                })
              })

          } else {
            //* Actualizando empleado
            await updateProveedor(values, selectedProveedor.id_proveedor)
              .then(() => {
                Swal.fire({
                  icon: 'success',
                  text: 'Empleado registrado correctamente'
                })
                helpers.setSubmitting(false)
                handleCloseModal()
              })
              .catch((err: Error) => {
                Swal.fire({
                  icon: 'error',
                  html: err.message,
                })
              })
          }
        }
      }
    >
      {
        (({ isSubmitting }) => (
          <Form>
            <div className='flex flex-col gap-3 md:gap-2'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-2'>
                <FormInput label={'Nombre'} type={'text'} name='nombre' autoComplete={"off"} />
                <FormInput label={'Telefono'} type={'text'} maxLength={9} name='telefono' autoComplete={"off"} />
              </div>
              <div className='grid grid-cols-1 gap-4 md:gap-2'>
                <FormInput label={'Dirección'} type={'text'} component='textarea' rows="7" name='direccion' autoComplete={"off"} />
              </div>
              <div>
                <SendButton isSendButton={!selectedProveedor ? true: false} disabled={isSubmitting} />
              </div>
            </div>
          </Form>
        ))
      }
    </Formik>
  )
}
export default ProveedorForm;