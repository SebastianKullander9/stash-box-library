"use client";

import { useState } from "react";
import Image from "next/image";
import eyeOn from "../../../public/svgs/eye-on.svg";
import eyeOff from "../../../public/svgs/eye-off.svg";

export default function PasswordInput() {
    const [show, toggleShow] = useState(false);

    return (
        <label htmlFor="password" className="text-sm flex flex-col text-white">Password
            <div className="relative">
                <input
                    className="w-full bg-[var(--color-white)] text-black p-2 rounded-sm"
                    type={show ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="Password"
                    required
                />
                <button
                    aria-label="Toggle password visibility"
                    type="button"
                    onClick={() => {toggleShow(!show)}} 
                    className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                >
                    <Image 
                        src={show ? eyeOn : eyeOff} 
                        alt={show ? "Hide password" : "Show password"}
                    />
                </button>
            </div>
        </label>
    )
}

                
