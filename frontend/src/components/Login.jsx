import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form"
import { useAuth } from '../context/AuthContext';
import ReCAPTCHA from 'react-google-recaptcha';



const Login = () => {
    const [message, setMessage] = useState("")
    const {loginUser, signInWithGoogle} = useAuth();
    const navigate = useNavigate()
    const [attempts, setAttempts] = useState(0);
    const [isBlocked, setIsBlocked] = useState(false);
    const [verified, setVerified] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm()

    const onSubmit = async(data) => {
        if (isBlocked) {
            alert("Demasiados intentos fallidos. Por favor, inténtelo más tarde, o regístrese si no tiene una cuenta.");
            return;
        }
        

        try {
            if (!verified) {
                alert('Por favor, completa la verificación reCAPTCHA');
                return;}
            await loginUser(data.email, data.password);
            setAttempts(0);
            alert("¡Inicio de sesión exitoso! Bienvenido a Frizi.");
            navigate("/")
        } catch (error) {
            setMessage("Porfavor, ingresa un correo y contrasena valido")
            console.error(error)
            setAttempts(attempts + 1);
            if (attempts + 1 >= 10) {
                setIsBlocked(true);
                setTimeout(() => setIsBlocked(false), 3 * 60 * 1000); // Desbloquear después de 3 minutos
            }
        }
    }
    const handleGoogleSignIn = async () => {
        try {
            await signInWithGoogle();
            alert("¡Inicio de sesión exitoso! Bienvenido a Frizi."); // Mensaje de bienvenida
            navigate("/");
        } catch (error) {
            alert("El inicio de sesión con Google falló");
            console.error(error);
        }
    };
  return (
    
<div className='h-[calc(100vh-120px)] flex items-center justify-center'>
    <div className="w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className='text-xl font-semibold mb-4'>Inicie sesion por favor</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                    Email
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
                {errors.email && <p className="text-red-500 text-xs italic">{errors.email.message}</p>}

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
                {errors.password && <p className="text-red-500 text-xs italic">{errors.password.message}</p>}

            </div>

            <ReCAPTCHA
                sitekey="6Lc_RcYqAAAAAInONx_ZcINNUH0smK35pK7L6GC0"
                onChange={(value) => {
                    setVerified(true);
                }}
            />

            {
                message && <p className='text-red-500 text-xs italic mb-3'>{message}</p>
            }
                
            <div className="flex flex-wrap space-y-2.5 items-center justify-between">
                <button
                      className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                        isBlocked ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      type="submit"
                      disabled={isBlocked}
                >
                    {isBlocked ? "Bloqueado temporalmente" : "Iniciar Sesión"}
                </button>
            </div>
        </form>
        <p className="inline-block align-baseline font-medium mt-4 text-sm">
            No tienes una cuenta? Por favor 
            <Link to="/register" className='text-blue-500 hover:text-blue-800'> Registrate</Link>
        </p>
        <p className="inline-block align-baseline font-medium mt-4 text-sm">
            Olvidaste tu contraseña? Por favor 
            <Link to="/forgot-password" className='text-blue-500 hover:text-blue-800'> Recupera tu contraseña</Link>
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

export default Login