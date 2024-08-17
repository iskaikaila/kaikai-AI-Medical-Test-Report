import React from 'react';
import NavBar from './NavBar';

function UploadFile() {
    return (
        <div>
            <NavBar />
            <h2>Upload File</h2>
            <form>
                <input type="file" name="file" />
                <button type="submit">Upload</button>
            </form>
        </div>
    );
}

export default UploadFile;
