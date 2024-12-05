"use client"
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function Profile({params}:any) {
    const router = useRouter()
    const [data, setData] = useState("nothing")
    useEffect(() => {
        getUserdata()
    })

    const getUserdata = async() =>{
        try{
            const response = await axios.get("/api/users/me")
            setData(response.data.data.username)
        }catch(e){
            alert("Error getting data")
        }
    }
    
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
                <p className="text-2xl bg-orange-400 p-2 rounded-md text-gray-700 max-w-screen-md">
                    Username :{data==='nothing' ? "No data": data} 
                </p>
            </div>
            <button onClick={logout} className="bg-green-700 mt-5 p-3 rounded-3xl text-2xl hover:bg-green-300 text-yellow-300">
                Logout
            </button>
        </div>
    )
}