import React from 'react';
import { useNavigate } from 'react-router-dom';

function NavBar({ page, onLogout, onGoToPersonalInfo }) {
    return (
        <nav>
            <ul>
                {page !== 'details' && (
                    <li>
                        <button onClick={onGoToPersonalInfo}>Doctor Information</button>
                    </li>
                )}
                <li>
                    <button onClick={onLogout}>Logout</button>
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;
