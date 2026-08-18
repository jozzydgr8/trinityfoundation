import { toast } from "react-toastify";
import { UseAuthContext } from "../../Context/UseAuthContext";
import {  useNavigate } from "react-router-dom";

type resetpassword = {
    email:string | null,
    token:string | null,
    newPassword:string,
    resetForm:()=>void,
}
const saveUserToLocalStorage = (user:any) => {
  const data = {
    user,
    savedAt: new Date().getTime(), // timestamp in milliseconds
  };
  localStorage.setItem('user', JSON.stringify(data));
};

export const AuthHooks = ()=>{
    const {dispatch} = UseAuthContext();
    const navigate = useNavigate();
    type signinProps={
        email:string,
        password:string,
        setLoading: React.Dispatch<React.SetStateAction<boolean>>
    }
    const signInWithEmailAndPassword = async({email, password, setLoading}:signinProps)=>{
        setLoading(true);
        try{
            const response = await fetch('https://trinityarms.vercel.app/user/signuser',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email,
                password
            })
            
        });
     
        const json = await response.json();
        if (!response.ok) {
            throw new Error(json.message || 'Failed to sign in');
        }
        saveUserToLocalStorage(json);
        
        dispatch({type:'getUser', payload:json});
        

        }catch(error){
            toast.error('Incorrect email or password');
           
        }finally{
            setLoading(false)
        }
    }

  const forgotPassword = async (email:string)=>{
    try{
        const response = await fetch('https://trinityarms.vercel.app/user/forgot-password',{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({email:email})
        });
        if(!response.ok){
            throw Error('an error occured')
        }
        toast.success('reset password email sent succesfully')
    }catch(error){
        toast.error('Sorry. an error occured')
    }
  }

  const resetPassword = async ({email, token, newPassword, resetForm}:resetpassword)=>{
    try{
        const response = await fetch('https://trinityarms.vercel.app/user/reset-password',{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({email, token, newPassword})
        });
        if(!response.ok){
            throw Error('an error occured')
        }
        toast.success('your password has been reset try relogin');
        navigate('/admin_jctbdil1$')
        resetForm();
    }catch(error){
        console.error(error);
        toast.error('an error occured resetting your password');
       
    }
  }
    return {signInWithEmailAndPassword, forgotPassword, resetPassword}
}