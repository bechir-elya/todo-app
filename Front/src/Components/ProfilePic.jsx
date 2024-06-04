import React from 'react';
import { FaUpload } from "react-icons/fa6";

function FileInput({ setImage }) {
    const fileInputRef = React.createRef();

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleClick = (e) => {
        e.preventDefault();
        fileInputRef.current.click();
    };

    return (
        <div>
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />
            <button onClick={handleClick} style={buttonStyle}>
                <FaUpload style={iconStyle} /> Upload your profile picture
            </button>
        </div>
    );
}

const buttonStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1%',
    backgroundColor: '#1e81b0',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer'
};

const iconStyle = {
    marginRight: '10px'
};

export default FileInput;
