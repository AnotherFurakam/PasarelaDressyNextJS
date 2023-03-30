import { EmpleadoForm } from '@/interfaces/empelado-interfaces'
import { empleadoFormSchema } from '@/validators/empleado.validators'
import { Formik, Form } from 'formik'
import FormInput from '../FormComponents/FromInput'
import SendButton from '../FormComponents/SendButton'
import { useFetchEmpleados } from '@/hooks/useFetchEmpleados'
import Swal from 'sweetalert2'

interface Props {
  handleCloseModal: () => void
}

const EmpleadoForm: React.FC<Props> = ({ handleCloseModal }) => {

  const { addEmpleado, selectedEmpleado, updateEmpleado } = useFetchEmpleados();

  const empleadoInitialValues: EmpleadoForm = {
    nombres: selectedEmpleado?.nombres ?? '',
    apellido_pat: selectedEmpleado?.apellido_pat ?? '',
    apellido_mat: selectedEmpleado?.apellido_mat ?? '',
    dni: selectedEmpleado?.dni ?? '',
    numero_cel: selectedEmpleado?.numero_cel ?? '',
    correo: selectedEmpleado?.correo ?? '',
    direccion: selectedEmpleado?.direccion ?? ''
  }

  return (
    <Formik
      initialValues={empleadoInitialValues}
      validationSchema={empleadoFormSchema}
      onSubmit={
        async (values, helpers) => {


          if (!selectedEmpleado) {
            //*Registrando Empleado
            await addEmpleado(values)
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
            await updateEmpleado(values, selectedEmpleado.id_empleado)
              .then(() => {
                Swal.fire({
                  icon: 'success',
                  text: 'Empleado actualizado correctamente'
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
                <FormInput label={'Nombres'} type={'text'} name='nombres' autoComplete={"off"} />
                <FormInput label={'Apellido paterno'} type={'text'} name='apellido_pat' autoComplete={"off"} />
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-2'>
                <FormInput label={'Apellido materno'} type={'text'} name='apellido_mat' autoComplete={"off"} />
                <FormInput label={'Dni'} type={'text'} maxLength={8} name='dni' autoComplete={"off"} />
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-2'>
                <FormInput label={'Número de celular'} type={'text'} maxLength={9} name='numero_cel' autoComplete={"off"} />
                <FormInput label={'Correo electrónico'} type={'text'} name='correo' autoComplete={"off"} />
              </div>
              <div className='grid grid-cols-1 gap-4 md:gap-2'>
                <FormInput label={'Dirección'} type={'text'} component='textarea' rows="3" name='direccion' autoComplete={"off"} />
              </div>
              <div>
                <SendButton isSendButton={!selectedEmpleado ? true: false} disabled={isSubmitting} />
              </div>
            </div>
          </Form>
        ))
      }
    </Formik>
  )
}

export default EmpleadoForm