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
        name: "",
        username: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user.email.length > 0 && user.username.length > 0 && user.password.length > 6) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    const onSignup = async (e :any) => {
        e.preventDefault(); 
        setLoading(true);

        try {
            const response = await axios.post('/api/users/signup', user);
            console.log("Signup Success", response.data);
            router.push("/login"); 
        } catch (e) {
            console.error(e);
            alert("Signup failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <form
                className="flex flex-col items-center gap-4 w-full max-w-xs"
                onSubmit={onSignup} 
            >
                <h1 className="text-green-600 bg-orange text-2xl">
                    {loading ? "Processing..." : "Signup"}
                </h1>
                <div className="w-full flex flex-col gap-2">
                    <label htmlFor="name" className="text-emerald-500 font-semibold self-start">
                        Full Name
                    </label>
                    <input
                        type="text"
                        placeholder="Name"
                        name="name"
                        value={user.name}
                        onChange={(e) => setUser({ ...user, name: e.target.value })}
                        id="name"
                        className="rounded-lg p-4 w-full text-black bg-gray-300 outline-2 outline-gray-500 focus:outline-emerald-500"
                    />
                </div>
                <div className="w-full flex flex-col gap-2">
                    <label htmlFor="username" className="text-emerald-500 font-semibold self-start">
                        Username
                    </label>
                    <input
                        type="username"
                        name="username"
                        placeholder="Username"
                        value={user.username}
                        onChange={(e) => setUser({ ...user, username: e.target.value })}
                        id="username"
                        className="rounded-lg p-4 w-full text-black bg-gray-300 outline-2 outline-gray-500 focus:outline-emerald-500"
                    />
                </div>
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
                    className={`p-4 w-full rounded-full ${buttonDisabled ? "bg-gray-400" : "bg-green-400"} text-black font-semibold text-sm transition-all duration-300 hover:bg-emerald-200`}
                    disabled={buttonDisabled}>
                    {loading ? "Processing..." : "Signup"}
                </button>
                <div className="text-gray-500">
                    Already have an account? <Link href='/login' className="text-green-400">Login</Link>
                </div>
            </form>
        </div>
    );
}
