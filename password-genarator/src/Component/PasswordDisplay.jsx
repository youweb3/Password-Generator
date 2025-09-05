import React from 'react'

const PasswordDisplay = ({ password, strength }) => {
    return (
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Generated Password
            </label>
            <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="text"
                placeholder="Your password will appear here"
                value={password}
                readOnly
            />
            <div className="mt-2 font-bold">
                Strength: <span className={
                    strength === "Weak" ? "text-red-500" :
                        strength === "Medium" ? "text-yellow-500" :
                            "text-gray-500"
                }>{strength}</span>
            </div>
        </div>
    );
};

export default PasswordDisplay;