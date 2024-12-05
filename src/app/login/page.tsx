"use client"
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Signup() {
    const router = useRouter();
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user.email.length > 0  && user.password.length > 6) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    const onLogin = async (e :any) => {
        e.preventDefault(); 
        setLoading(true);

        try {
            const response = await axios.post('/api/users/login', user);
            console.log("Login Successful", response.data);
            router.push("/profile"); 
        } catch (e) {
            console.error(e);
            alert("Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <form
                className="flex flex-col items-center gap-4 w-full max-w-xs"
                onSubmit={onLogin} 
            >
                <h1 className="text-green-600 bg-orange text-2xl">
                    {loading ? "Processing..." : "Login"}
                </h1>
                <div className="w-full flex flex-col gap-2">
                    <label htmlFor="email" className="text-emerald-500 font-semibold self-start">
                        Email
                    </label>
                    <input
                        type="email"
                        placeholder="e.g abc@gmail.com"
                        name="email"
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                        id="email"
                        className="rounded-lg p-4 w-full text-black bg-gray-300 outline-2 outline-gray-500 focus:outline-emerald-500"
                    />
                </div>
                <div className="w-full flex flex-col gap-2">
                    <label htmlFor="password" className="text-emerald-500 font-semibold self-start">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={user.password}
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                        id="password"
                        className="rounded-lg p-4 w-full bg-gray-300 text-black outline-2 outline-gray-500 focus:outline-emerald-500"
                    />
                </div>
                <button
                    type="submit"
                    onSubmit={onLogin} 
                    className={`p-4 w-full rounded-full ${buttonDisabled ? "bg-gray-400" : "bg-green-400"} text-black font-semibold text-sm transition-all duration-300 hover:bg-emerald-200`}
                    disabled={buttonDisabled}>
                    {loading ? "Processing..." : "Login"}
                </button>
                <div className="text-gray-500">
                    Don't have an account? <Link href='/signup' className="text-green-400">Signup</Link>
                </div>
            </form>
        </div>
    );
}
