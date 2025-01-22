import {  createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";
import { 
    createUserWithEmailAndPassword, 
    sendSignInLinkToEmail, 
    GoogleAuthProvider, 
    onAuthStateChanged, 
    signInWithEmailAndPassword, 
    signInWithPopup, 
    signOut 
} from "firebase/auth";

const AuthContext =  createContext();

export const useAuth = () => {
    return useContext(AuthContext)
}

const googleProvider = new GoogleAuthProvider();

// authProvider
export const AuthProvide = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

     // Configuración para el enlace de verificación
     const actionCodeSettings = {
        url: "http://localhost:5173/FinishSignUp", // Cambia esta URL según tu entorno
        handleCodeInApp: true,
    };

    // register a user
    const registerUser = async (email,password) => {

        try{
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await sendSignInLinkToEmail(auth, email, actionCodeSettings);
        // Guardar el correo localmente para completar el flujo si es necesario
        window.localStorage.setItem("emailForSignIn", email);
        return userCredential;} 
        catch (error) {
            if (error.code === "auth/email-already-in-use") {
                throw new Error("Este correo ya está en uso. Por favor, utiliza otro.");
            }
            console.error("Error al registrar el usuario:", error);
            throw error; // Lanza otros errores para manejarlos en el componente
        }

        
    }

    // login the user
    const loginUser = async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            if (!userCredential.user.emailVerified) {
                throw new Error("Por favor, verifica tu correo antes de iniciar sesión.");
            }
            return userCredential;
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            throw error;
        }
    };
    
    

    // sing up with google
    const signInWithGoogle = async () => {
     
        return await signInWithPopup(auth, googleProvider)
    }

    // logout the user
    const logout = () => {
        return signOut(auth)
    }

    // manage user
    useEffect(() => {
        const unsubscribe =  onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);

            if(user) {
               
                const {email, displayName, photoURL} = user;
                const userData = {
                    email, username: displayName, photo: photoURL
                } 
            }
        })

        return () => unsubscribe();
    }, [])


    const value = {
        currentUser,
        loading,
        registerUser,
        loginUser,
        signInWithGoogle,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}