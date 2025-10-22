"use client"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { formLogin } from "../../actions"
import { useAuth } from "../../hooks/useAuth"

const LoginForm = () => {
  const [error, setError] = useState("")
  const { setAuth } = useAuth()
  const router = useRouter()
  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData(e.currentTarget)
      const user = await formLogin(formData)
      if (user) {
        setAuth(user)
        router.push("/")
      } else {
        setError("Please provide valid login credentials")
      }
    } catch (err) {
      setError(err.message)
    }
  }
  return (
    <>
      <div className="text-red-700">{error}</div>
      <form className="login-form" onSubmit={onSubmit}>
        <div>
          <label for="email">Email Address</label>
          <input type="email" name="email" id="email" />
        </div>

        <div>
          <label for="password">Password</label>
          <input type="password" name="password" id="password" />
        </div>

        <button
          type="submit"
          className="btn-primary w-full mt-4 bg-indigo-600 hover:bg-indigo-800"
        >
          Login
        </button>
      </form>
    </>
  )
}

export default LoginForm
