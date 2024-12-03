import { LoginFormData } from '@/validation/auth.Schema';

interface LoginResponse {
    success: boolean;
    accessToken: string;
    message: string;
}

const authApiRequest = {
    login: async (body: LoginFormData) => {
        return fetch(
            `${process.env.NEXT_PUBLIC_API_ENDPOINT}api/authentication/Login`,
            {
                method: 'POST',
                body: JSON.stringify(body),
                headers: { 'Content-Type': 'application/json' },
            }
        ).then((response) => response.json() as Promise<LoginResponse>);
    },
};

export default authApiRequest;
