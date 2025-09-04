
import SignUpForm from "@/app/components/auth/SignUpForm"

const RegisterPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white">Create an Account</h1>
        <SignUpForm />
      </div>
    </div>
  )
}

export default RegisterPage
