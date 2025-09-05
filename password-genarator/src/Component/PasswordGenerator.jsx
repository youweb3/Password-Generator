import React, { useState } from 'react';
import usePasswordGenerator from '../HooksComponent/usePasswordGenerator';

import PasswordDisplay from './PasswordDisplay';
import PasswordControls from './PasswordControls';
import GenerateButton from './GenerateButton';

const PasswordGenerator = () => {
    const {
        length, setLength,
        numberAllowed, setNumberAllowed,
        characterAllowed, setCharacterAllowed,
        excludeSimilar, setExcludeSimilar,
        password,
        strength,
        generatePassword,
        calculateStrength,
    } = usePasswordGenerator();

    //////Copy to clipboard
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(password);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        // alert("Copied!");
    }

    return (
        <div className="container mx-auto mt-8 ml-8">
            <h1 className="text-4xl font-bold text-center mb-8">Password Generator</h1>
            <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
                <div className="p-8">

                    <PasswordDisplay
                        password={password}
                        strength={strength}
                    />

                    <PasswordControls
                        calculateStrength={calculateStrength}
                        length={length}
                        setLength={setLength}
                        numberAllowed={numberAllowed}
                        setNumberAllowed={setNumberAllowed}
                        excludeSimilar={excludeSimilar}
                        setExcludeSimilar={setExcludeSimilar}
                        characterAllowed={characterAllowed}
                        setCharacterAllowed={setCharacterAllowed}
                    />

                    <GenerateButton
                        generatePassword={generatePassword}
                        handleCopy={handleCopy}
                        copied={copied}
                    />

                </div>
            </div>
        </div>
    );
};

export default PasswordGenerator;