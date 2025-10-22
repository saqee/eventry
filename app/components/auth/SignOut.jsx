"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "../../hooks/useAuth"

const SignOut = () => {
  const { auth, setAuth } = useAuth()
  const router = useRouter()
  const logout = () => {
    setAuth(null)
    router.push("/login")
  }
  return (
    <div className="mx-2">
      {auth ? (
        <>
          <span>{auth?.name}</span>
          <span>|</span>
          <a className="cursor-pointer" onClick={logout}>
            Logout
          </a>
        </>
      ) : (
        <Link href="/login">Login</Link>
      )}
    </div>
  )
}

export default SignOut
