import RegisterForm from '../../../features/auth/register/ui/RegisterForm'
import AuthLayout from '../../../widgets/AuthLayout/AuthLayout'

// Aquí irá el Register cuando esté listo
function RegisterPage() {
  return (
    <AuthLayout headerText='Registrate'>
      <RegisterForm />
    </AuthLayout>
  )
}

export default RegisterPage