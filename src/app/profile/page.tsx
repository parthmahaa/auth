"use client"
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function Profile({params}:any) {
    const router = useRouter()
    const logout = async () =>{
        try{
            await axios.get("/api/users/logout")
            alert("Logout Successful")
            router.push("/")
        }catch(e : any){
            alert("Logout failed")
        }
    }
    return(
        <div className="min-h-screen flex flex-col justify-center items-center">
            <div>
                <p className="text-2xl max-w-screen-md">
                    Profile    
                </p>
            </div>
            <button onClick={logout} className="bg-green-700 mt-5 p-3 rounded-3xl text-2xl hover:bg-green-300 text-yellow-300">
                Logout
            </button>
        </div>
    )
}