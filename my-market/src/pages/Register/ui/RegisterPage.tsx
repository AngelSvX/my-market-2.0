import RegisterForm from '../../../features/auth/register/ui/RegisterForm'
import AuthLayout from '../../../widgets/AuthLayout/AuthLayout'

// Aquí irá el Register cuando esté listo
function RegisterPage() {
  return (
    <AuthLayout headerText='Registrate' >
      <p className='text-center text-black/40 font-bold relative bottom-3'>Inactivo por el momento</p>
      <RegisterForm />
    </AuthLayout>
  )
}

export default RegisterPage