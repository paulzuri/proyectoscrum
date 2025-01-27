import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form"
import { useAuth } from '../context/AuthContext';



const Register = () => {
    const [message, setMessage] = useState("")
    const {registerUser, signInWithGoogle} = useAuth();
    console.log(registerUser)
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm()

      // Watch email field value
    const emailValue = watch("email");

    // Clear error message when email field is cleared
    useEffect(() => {
        if (!emailValue) {
            setMessage("");
        }
    }, [emailValue]);

      //registeruser
    const onSubmit = async (data) => {
        try {
            await registerUser(data.email, data.password);
            alert(
                "Registro exitoso. Por favor, revisa tu correo electrónico para verificar tu cuenta."
            );
            auth.signOut();
        } catch (error) {
            if (error.message === "Este correo ya está en uso. Por favor, utiliza otro.") {
                setMessage(error.message); // Mostrar el mensaje en pantalla
            } else {
                setMessage("Ha ocurrido un error. Por favor, intenta nuevamente.");
            }
            console.error(error);
        }
    };
     

    const handleGoogleSignIn = async () => {
        try {
            await signInWithGoogle();
            alert("Se ha registrado con google correctamente");
            navigate("/")
        } catch (error) {
            alert("Inicio con google fallido")
            console.error(error)
        }
    }
  return (
    
<div className='h-[calc(100vh-120px)] flex items-center justify-center'>
    <div className="w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className='text-xl font-semibold mb-4'>Registrese por favor</h2>

        <form onSubmit={handleSubmit(onSubmit)}>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                    Correo electrónico
                </label>
                <input
                    {...register("email", { 
                        required: "El campo de email es obligatorio", // Mensaje de error personalizado
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "El email no es válido"
                        }
                    })}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    placeholder="Correo electrónico"
                />
                {errors.email && (
                <p className="text-red-500 text-xs italic mt-2">{errors.email.message}</p>
                )}
            </div>
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                    Contraseña
                </label>
                <input
                    {...register("password", { 
                        required: "El campo de contraseña es obligatorio", // Mensaje de error personalizado
                        minLength: {
                            value: 6,
                            message: "La contraseña debe tener al menos 6 caracteres"
                        }
                    })}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                    placeholder="Contraseña"
                />
                {errors.password && (
                <p className="text-red-500 text-xs italic mt-2">{errors.password.message}</p>
                )}
            </div>

            {
                message && <p className='text-red-500 text-xs italic mb-3'>{message}</p>
            }
                
            <div className="flex flex-wrap space-y-2.5 items-center justify-between">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                >
                    Registrarse
                </button>
            </div>
        </form>
        <p className="inline-block align-baseline font-medium mt-4 text-sm">
            Ya tienes una cuenta? Por favor
            <Link to="/login" className='text-blue-500 hover:text-blue-800'> Inicia sesion</Link>
        </p>
        <div className="mt-4">
            <button
                className="w-full flex flex-wrap gap-1 items-center justify-center bg-secondary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={handleGoogleSignIn}
            >
                <FaGoogle className="mr-2" />
                Inicia sesion con Google
            </button>
        </div>
        <p className="mt-5 text-center text-gray-500 text-xs">
            &copy;2025 Frizi. Todos los derechos reservados.
        </p>
    </div>
</div>

)
}

export default Register