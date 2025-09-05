import React, { useCallback, useState } from 'react';

const PasswordGenerator = () => {
    const [length, setLength] = useState(10);
    const [numberAllowed, setNumberAllowed] = useState(false);
    const [characterAllowed, setCharacterAllowed] = useState(false);
    const [password, setPassword] = useState('');

    const [strength, setStrength] = useState('');

    //Password Strength Meter
    const calculateStrength = useCallback(() => {
        if (length >= 12 && numberAllowed && characterAllowed) {
            setStrength("Strong");
        } else if (length >= 8 && (numberAllowed || characterAllowed)) {
            setStrength("Medium");
        } else {
            alert('You should generate strong pssword Include Numbers and Special Characters');
            setStrength("Weak");
            return;
        }

    }, [length, numberAllowed, characterAllowed]);

    //const cachedFn = useCallback(fn, dependencies) depenencies: lenght, numberAllo
    const generatePassword = useCallback(() => {
        const len = Number(length);
        if (len < 1) return;

        let passwordChars = [];
        let stringData = 'ABCDEFGHIGKLMNOPQRSTUVWXVZabcdefghigklmnopgrstuvwxyz'

        //Ensures at least one number/special char if selected
        //Fills the rest randomly
        if (numberAllowed) {
            const numbers = '0123456789';
            stringData += numbers;
            passwordChars.push(numbers[Math.floor(Math.random() * numbers.length)]);
        }

        if (characterAllowed) {
            const specials = "!£$%&*?~#@/,.()";
            stringData += specials;
            passwordChars.push(specials[Math.floor(Math.random() * specials.length)]);
        }

        const remainingLength = len - passwordChars.length;
        for (let i = 0; i < remainingLength; i++) {
            passwordChars.push(stringData[Math.floor(Math.random() * stringData.length)]);
        }

        // shuffle to randomize final password
        for (let i = passwordChars.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [passwordChars[i], passwordChars[j]] = [passwordChars[j], passwordChars[i]];
        }

        //Updates state with the generated password
        setPassword(passwordChars.join(''));
        calculateStrength();
    }, [length, numberAllowed, characterAllowed, setPassword, calculateStrength])

    //////Copy to clipboard
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
                        <div className="mt-2 font-bold">
                            Strength: <span className={
                                strength === "Weak" ? "text-red-500" :
                                    strength === "Medium" ? "text-yellow-500" :
                                        "text-gray-500"
                            }>{strength}</span>
                        </div>
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
                            onChange={(e) => {
                                setLength(Number(e.target.value));
                                calculateStrength();
                            }}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="inline-flex items-center">
                            <input
                                type="checkbox"
                                className="form-checkbox"
                                checked={numberAllowed}
                                onChange={() => {
                                    setNumberAllowed(!numberAllowed);
                                    calculateStrength();
                                }}
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
                                onChange={() => {
                                    setCharacterAllowed(!characterAllowed);
                                    calculateStrength();
                                }}
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