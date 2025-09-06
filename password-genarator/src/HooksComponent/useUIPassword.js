import { useState, useEffect, useCallback } from 'react'

const useUIPassword = (password, generatePassword) => {

    //////Copy to clipboard
    const [copied, setCopied] = useState(false);

    const handleCopy = useCallback(() => {
        navigator.clipboard.writeText(password);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        // alert("Copied!");
    }, [password]);


    //generate and copy with keyboard ctrl g  && ctrl c
    useEffect(() => {
        const handleKeyboard = (e) => {
            if (e.ctrlKey && e.key.toLowerCase() === 'g') {
                generatePassword();
                e.preventDefault();
            }
            if (e.ctrlKey && e.key.toLowerCase() === 'c') {
                handleCopy();
                e.preventDefault();
            }
        };

        window.addEventListener('keydown', handleKeyboard);

        return () => window.removeEventListener('keydown', handleKeyboard);
    }, [generatePassword, handleCopy]);

    return { copied, handleCopy };
};

export default useUIPassword;