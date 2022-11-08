import './App.css';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';
import { ErrorContext } from './contexts/ErrorContext';

import { PrivateRoutes } from './components/Guards/PrivateRoutes';
import { GuestRoutes } from './components/Guards/GuestRoutes';

import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { Home } from './components/Home/Home';
import { Catalog } from './components/Catalog/Catalog';
import { Login } from './components/Login/Login';
import { Register } from './components/Register/Register';
import { Search } from './components/Search/Search';
import { Create } from './components/Create/Create';
import { Profile } from './components/Profile/Profile';
import { Details } from './components/Details/Details';
import { Edit } from './components/Details/Edit/Edit';
import { Logout } from './components/Logout/Logout';
import { Video } from './components/Video/Video';

function App() {
    const [error, setError] = useState({});

    function errorHandler(errorMessage) {
        setError(() => {
            if (errorMessage.message) {
                return {
                    message: errorMessage.message
                }
            } else {
                return {};
            }
        });

        setTimeout(() => {
            setError({});
        }, 5000);
    }
 
    return (
        <div className="App">
            <AuthProvider>
                <Header />

                    <img src="favicon.png" alt="fav-icon" className='favicon' />

                    {error.message &&
                        <div className="error-message">
                            <p>{error.message}</p>
                        </div>
                    }

                    <ErrorContext.Provider 
                        value={{
                            error,
                            errorHandler
                        }}
                    >
                        <Routes>
                            <Route path='/' element={<Home />}/>
                            <Route path='/search' element={<Search />}/>
                            <Route path='/details/:_id' element={<Details />}/>
                            <Route path='/details/:embed/trailer/:title' element={<Video />} />
                            <Route path='/catalog' element={<Catalog />}/>

                            <Route element={<PrivateRoutes />}>
                                <Route path='/profile' element={<Profile />}/>
                                <Route path='/details/:_id/edit' element={<Edit />}/>
                                <Route path='/create' element={<Create />}/>
                                <Route path='/logout' element={<Logout />}/>
                            </Route>
                            
                            <Route element={<GuestRoutes />}>
                                <Route path='/register' element={<Register />}/>
                                <Route path='/login' element={<Login />}/>
                            </Route>
                            
                        </Routes>
                    </ErrorContext.Provider>

                <Footer />
            </AuthProvider>
        </div>
    );
}

export default App;
