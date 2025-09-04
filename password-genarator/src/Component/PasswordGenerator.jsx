import React, { useCallback, useState } from 'react';

const PasswordGenerator = () => {
    const [length, setLength] = useState(10);
    const [numberAllowed, setNumberAllowed] = useState(false);
    const [characterAllowed, setCharacterAllowed] = useState(false);
    const [password, setPassword] = useState('');

    //const cachedFn = useCallback(fn, dependencies) depenencies: lenght, numberAllo
    const generatePassword = useCallback(() => {
        let password = '';
        let stringData = 'ABCDEFGHIGKLMNOPQRSTUVWXVZabcdefghigklmnopgrstuvwxyz'
        if (numberAllowed) stringData += ' 0123456789';
        if (characterAllowed) stringData += " !£$%&*?~#@/,.() ";

        for (let index = 0; index < length; index++) {
            let characters = Math.floor(Math.random() * stringData.length)
            password += stringData[characters]
        }

        setPassword(password)

    }, [length, numberAllowed, characterAllowed, setPassword])

    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(password);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        // alert("Copied!");
    }

    return (
        <div className="container mx-auto mt-8">
            <h1 className="text-4xl font-bold text-center mb-8">Password Generator</h1>
            <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
                <div className="p-8">
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
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="length">
                            Password Length: {length}
                        </label>
                        <input
                            className="w-full"
                            id="length"
                            type="range"
                            min="6"
                            max="20"
                            value={length}
                            onChange={(e) => setLength(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="inline-flex items-center">
                            <input
                                type="checkbox"
                                className="form-checkbox"
                                checked={numberAllowed}
                                onChange={() => setNumberAllowed(!numberAllowed)}
                            />
                            <span className="ml-2">Include Numbers</span>
                        </label>
                    </div>
                    <div className="mb-4">
                        <label className="inline-flex items-center">
                            <input
                                type="checkbox"
                                className="form-checkbox"
                                checked={characterAllowed}
                                onChange={() => setCharacterAllowed(!characterAllowed)}
                            />
                            <span className="ml-2">Include Special Characters</span>
                        </label>
                    </div>
                    <button onClick={generatePassword} type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Generate Password
                    </button>
                    <button onClick={handleCopy} title="Click to copy" type="button" className='bg-blue-500  hover:bg-red-700 text-white font-bold py-2 px-3.5 rounded focus:outline-none focus:shadow-outline ml-2'>
                        {copied ? "Copied to Clipboard!" : "Copy"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PasswordGenerator;