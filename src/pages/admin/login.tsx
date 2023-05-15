import BaseLayout from '@/layouts/BaseLayout';
import { useEffect, type FC } from 'react';

import { Form, Formik, Field, ErrorMessage } from "formik";
import { ILogin, ILoginResponse } from '@/interfaces/login-interface';
import { loginFormSchema } from '@/validators/login.validators';
import { CgSpinner } from 'react-icons/cg';
import loginService from '@/services/auth.service';
import { useAuth } from '@/hooks/useAuth';
import { AxiosError } from 'axios';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';

interface loginProps { }

const Login: FC<loginProps> = ({ }) => {

  const { login } = useAuth()

  const { push } = useRouter()

  const initialValues: ILogin = {
    correo: '',
    contrasenia: ''
  }

  return (
    <BaseLayout>
      <Formik
        initialValues={initialValues}
        validationSchema={loginFormSchema}
        onSubmit={
          async (values, helpers) => {
            await loginService.login(values)
              .then(res => {
                login(res.data)
                Swal.fire({
                  title: 'Login successful',
                  text: `Bienvenido ${res.data.empleado.nombres.split(" ")[0]} ${res.data.empleado.apellido_pat}`
                })
                push('/admin/dashboard')
                helpers.resetForm()
                helpers.setSubmitting(false)
              })
              .catch((err: AxiosError<ILoginResponse>) => {
                if (err.status == 403) {
                  Swal.fire({
                    title: 'Login Failed',
                    text: 'Correo o contraseña inválido'
                  })
                }
                if (err.status == 500) {
                  Swal.fire({
                    title: 'Login Failed',
                    text: 'Error al conectar con el servidor'
                  })
                }
                helpers.setSubmitting(false)
              })
          }
        }
      >
        {(({ isSubmitting }) => (
          <Form className='h-full flex'>
            <div className='bg-white max-w-[500px] m-auto py-10 rounded-md'>
              <div className='border-l-4 border-fuchsia-500 w-full pl-5'>
                <h1 className='uppercase font-semibold text-3xl text-fuchsia-500'>Login</h1>
              </div>
              <div className='p-10 flex flex-col justify-between gap-14'>
                <div>
                  <Field className="border-b-2 border-gray-300 outline-none text-[18px] text-gray-800 font-medium w-[250px]" type="text" name="correo" placeholder="Correo" />
                  <ErrorMessage component={"p"} name='correo' className='text-red-500' />
                </div>
                <div>
                  <Field className="border-b-2 border-gray-300 outline-none text-[18px] text-gray-800 font-medium w-[250px]" type="password" name="contrasenia" placeholder="Contraseña" />
                  <ErrorMessage component={"p"} name='contrasenia' className='text-red-500' />
                </div>
              </div>
              <div className='flex justify-center'>
                <button type='submit' className='bg-fuchsia-600 p-3 w-[150px] text-white text-[18px] rounded-sm disabled:saturate-50' disabled={isSubmitting}>{
                  !isSubmitting ? 'Ingresar' : <CgSpinner className='mx-auto animate-spin' />
                }</button>
              </div>
            </div>
          </Form>
        ))}
      </Formik>


    </BaseLayout>
  );
}
export default Login;