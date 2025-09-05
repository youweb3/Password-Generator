import React from 'react'

const GenerateButton = ({generatePassword, handleCopy, copied}) => {
    return (
        <div>
            <button onClick={generatePassword} type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Generate Password
            </button>
            <button onClick={handleCopy} title="Click to copy" type="button" className='bg-blue-500  hover:bg-red-700 text-white font-bold py-2 px-3.5 rounded focus:outline-none focus:shadow-outline ml-2'>
                {copied ? "Copied to Clipboard!" : "Copy"}
            </button>
    </div >
  );
};

export default GenerateButton;