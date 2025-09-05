import React from 'react'

const PasswordControls = ({
    calculateStrength,
    length, setLength,
    numberAllowed, setNumberAllowed,
    excludeSimilar, setExcludeSimilar,
    characterAllowed, setCharacterAllowed, }) => {

    return (
        <div>
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
            <div className='mb-4'>
                <label className='inline-flex items-center'>
                    <input
                        type='checkbox'
                        className='form-checkbox'
                        checked={excludeSimilar}
                        onChange={() => setExcludeSimilar(!excludeSimilar)}
                    />
                    <span className='ml-2'>Exclude Similar (i, l, 1, o, 0)</span>
                </label>
            </div>
        </div>
    );
};

export default PasswordControls;