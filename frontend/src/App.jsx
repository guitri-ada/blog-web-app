import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

const App = () => {
    const [token, setToken] = useState(null);

    return (
        <div>
            <h1>Welcome to the Blog App</h1>
            {!token ? (
                <>
                    <LoginForm onLogin={setToken} />
                    <RegisterForm />
                </>
            ) : (
                <button onClick={() => setToken(null)}>Logout</button>
            )}
        </div>
    );
};

export default App;
