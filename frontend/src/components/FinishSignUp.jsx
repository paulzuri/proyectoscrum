// pages/FinishSignUp.jsx
import React, { useState, useEffect } from 'react'
import { getAuth, isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

const FinishSignUp = () => {
  const [email, setEmail] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const auth = getAuth()

    // Verificar si el enlace es un enlace de inicio de sesión
    if (isSignInWithEmailLink(auth, window.location.href)) {
      let emailFromStorage = window.localStorage.getItem('emailForSignIn')
      
      if (!emailFromStorage) {
        emailFromStorage = window.prompt('Please provide your email for confirmation')
      }

      setEmail(emailFromStorage)

      signInWithEmailLink(auth, emailFromStorage, window.location.href)
        .then(() => {
          window.localStorage.removeItem('emailForSignIn')
          setLoading(false)
          navigate('/') // Redirige a la página principal o cualquier otra página
        })
        .catch((error) => {
          console.error("Error al verificar correo:", error)
          setLoading(false)
        })
    }
  }, [navigate])

  if (loading) {
    return <div>Verificando...</div>
  }

  return (
    <div>
      <h1>¡Correo verificado con éxito!</h1>
      <p>{email ? `Correo: ${email}` : "Correo no disponible."}</p>
    </div>
  )
}

export default FinishSignUp
