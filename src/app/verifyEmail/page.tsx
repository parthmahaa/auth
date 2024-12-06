"use client";
import Link from "next/link";
import axios from "axios";
import React, { useState, useEffect } from "react";

export default function VerifyEmail() {
    const [token, setToken] = useState("");
    const [isVerified, setIsVerified] = useState(false);
    const [error, setError] = useState(false);

    const verifyUserEmail = async () => {
        try {
            await axios.post("/api/users/verifyEmail", { token });
            setIsVerified(true);
        } catch (e) {
            setError(true);
        }
    };

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, []);

    useEffect(() => {
        if (token.length > 0) {
            verifyUserEmail(); // Correct function name
        }
    }, [token]);

    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen py-2">
                <h1 className="text-3xl">Verify Email</h1>
                <h3 className="p-2 bg-green-400 text-black text-xl">
                    {token ? `Verified : ${token}  ` : "no token"}
                </h3>
            </div>

            {isVerified && (
                <div className="text-2xl bg-orange-400 p-5">
                    <h2>Email Verified</h2>
                    <Link className="text-blue pt-2" href="/profile">
                        Profile
                    </Link>
                </div>
            )}

            {error && (
                <div className="text-2xl bg-red-500 p-5">
                    <h2>Error</h2>
                </div>
            )}
        </>
    );
}
