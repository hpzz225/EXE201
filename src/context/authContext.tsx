'use client';
import envConfig from '@/configure';
import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type User = {
    name: string;
    id: string;
    email: string;
    phone: string;
    role: string;
};

type AuthContextType = {
    user: User | null;
    token: string | null;
    setToken: (token: string | null) => void;
    isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType>({
    user: null,
    token: null,
    setToken: () => {},
    isAuthenticated: false,
});

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error(
            'useAuthContext must be used within a AuthContextProvider'
        );
    }
    return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (storedToken) {
            setToken(storedToken);
        }

        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('token');
        }

        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [token, user]);

    useEffect(() => {
        const fetchUserProfile = async () => {
            if (!token) {
                setUser(null);
                return;
            }

            try {
                const response = await fetch(
                    `${envConfig.NEXT_PUBLIC_API_ENDPOINT}api/User/ViewProfile`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (response.ok) {
                    const result = await response.json();
                    setUser(result.data);

                    if (result.data.role === 'Admin') {
                        router.push('/quan-tri-vien/trang-chu');
                    }
                } else {
                    setUser(null);
                }
            } catch (error) {
                console.error('Error fetching user profile:', error);
                setUser(null);
            }
        };

        fetchUserProfile();
    }, [token, router]);

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                setToken,
                isAuthenticated: !!user && !!token,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
