import React, { useContext, useState, createContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const Auths = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const [subid, setSubid] = useState(() => {
        const storedSubid = localStorage.getItem('subid');
        return storedSubid ? JSON.parse(storedSubid) : null;
    });

    const [subjectName, setSubjectName] = useState(() => {
        const storedSubjectName = localStorage.getItem('subjectName');
        return storedSubjectName ? JSON.parse(storedSubjectName) : null;
    });

    const [quizid, setQuizid] = useState(() => {
        const storedQuizid = localStorage.getItem('quizid');
        return storedQuizid ? JSON.parse(storedQuizid) : null;
    });

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const subjectid1 = (subjectid, subjectName) => {
        setSubid(subjectid);
        setSubjectName(subjectName);
        localStorage.setItem('subid', JSON.stringify(subjectid));
        localStorage.setItem('subjectName', JSON.stringify (subjectName));
    };

    const quizid1 = (quizid) => {
        console.log(quizid, "this is auth");
        setQuizid(quizid);
        localStorage.setItem('quizid', JSON.stringify(quizid));
    };

    const logout = () => {
        setUser(null);
        setSubid(null); // Clear subid when logging out
        setSubjectName(null); // Clear subject name when logging out
        setQuizid(null); // Clear quizid when logging out
        localStorage.removeItem('user');
        localStorage.removeItem('subid'); // Remove subid from localStorage
        localStorage.removeItem('subjectName'); // Remove subject name from localStorage
        localStorage.removeItem('quizid');
        localStorage.removeItem('userid');
        localStorage.removeItem('userrole');
        localStorage.removeItem('useremail');
        localStorage.removeItem('studentid');

         // Remove quizid from localStorage
    };

    useEffect(() => {
        // Set up event listener to persist user data when storage changes
        const handleStorageChange = () => {
            const storedUser = localStorage.getItem('user');
            setUser(storedUser ? JSON.parse(storedUser) : null);
        };

        window.addEventListener('storage', handleStorageChange);

        // Clean up event listener when component unmounts
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout, subid, subjectid1, subjectName, quizid, quizid1 }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
