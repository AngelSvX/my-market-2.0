import LoginForm from '../../../features/auth/login/ui/LoginForm'
import AuthLayout from '../../../widgets/AuthLayout/AuthLayout'


// Aquí irá el Login cuando esté listo
function LoginPage() {
  return (
    <AuthLayout headerText='Iniciar Sesión' >
      <LoginForm />
    </AuthLayout>
  )
}

export default LoginPage