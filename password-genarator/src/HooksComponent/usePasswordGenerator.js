import { useCallback, useState } from 'react'

const usePasswordGenerator = () => {
    const [length, setLength] = useState(10);
    const [numberAllowed, setNumberAllowed] = useState(false);
    const [characterAllowed, setCharacterAllowed] = useState(false);
    const [password, setPassword] = useState('');

    const [strength, setStrength] = useState('');

    const [excludeSimilar, setExcludeSimilar] = useState(false);

    // calculate strength
    const calculateStrength = useCallback(() => {
        if (length >= 12 && numberAllowed && characterAllowed) {
            setStrength("Strong");
        } else if (length >= 8 && (numberAllowed || characterAllowed)) {
            setStrength("Medium");
        } else {
            // alert('You should generate strong pssword Include Numbers and Special Characters');
            setStrength("Weak");
            return;
        }

    }, [length, numberAllowed, characterAllowed]);

    // generate password
    const generatePassword = useCallback(() => {
        const similarChars = ['i', '1', 'l', 'o', '0'];

        const len = Number(length);
        if (len < 1) return;

        let passwordChars = [];
        let stringData = 'ABCDEFGHIGKLMNOPQRSTUVWXVZabcdefghigklmnopgrstuvwxyz';
        if (numberAllowed) stringData += '0123456789';
        if (characterAllowed) stringData += '!£$%&*?~#@/,.()';

        //Remove similar characters if enabled
        if (excludeSimilar) {
            stringData = stringData
                .split('')
                .filter(char => !similarChars.includes(char))
                .join('');
        }

        //Ensures at least one number/special char if selected
        //Fills the rest randomly
        if (numberAllowed) {
            const numbers = '0123456789'.split('').filter(n => !excludeSimilar || !similarChars.includes(n));
            stringData += numbers;
            passwordChars.push(numbers[Math.floor(Math.random() * numbers.length)]);
        }

        if (characterAllowed) {
            const specials = "!£$%&*?~#@/,.()".split('').filter(n => !excludeSimilar || !similarChars.includes(n));
            stringData += specials;
            passwordChars.push(specials[Math.floor(Math.random() * specials.length)]);
        }

        const remainingLength = len - passwordChars.length;
        for (let i = 0; i < remainingLength; i++) {
            passwordChars.push(stringData[Math.floor(Math.random() * stringData.length)]);
        }

        /////shuffle to randomize final password
        for (let i = passwordChars.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [passwordChars[i], passwordChars[j]] = [passwordChars[j], passwordChars[i]];
        }

        setPassword(passwordChars.join(''));
        calculateStrength();

        ///////alert
        if (len >= 12 && numberAllowed && characterAllowed) {
            setStrength("Strong");
        } else if (len >= 8 && (numberAllowed || characterAllowed)) {
            setStrength("Medium");
        } else {
            setStrength("Weak");
            alert('You should generate strong password: Include Numbers and Special Characters');
        }

    }, [length, numberAllowed, characterAllowed, setPassword, calculateStrength, excludeSimilar]);


    return {
        length, setLength,
        numberAllowed, setNumberAllowed,
        characterAllowed, setCharacterAllowed,
        excludeSimilar, setExcludeSimilar,
        password,
        strength,
        generatePassword,

    };
};

export default usePasswordGenerator;