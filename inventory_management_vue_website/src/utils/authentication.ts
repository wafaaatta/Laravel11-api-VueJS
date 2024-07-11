import type { User } from "@/stores/authentication";

export const checkAuthentication = (): boolean => {
    const token = localStorage.getItem('token');
    return token != null;
}

export const provideAuthentication = (token: string | null, user: User | null, rememberMe: boolean): void => {
    if(token == null){
        removeAuthentication();
        return;
    }
    
    localStorage.setItem('token', token)

    if(user != null){
        localStorage.setItem('user', JSON.stringify(user))
    }

    if(rememberMe){
        localStorage.setItem('remember', true.toString())
    }
}

export const getAuthenticationToken = (): string | null => {
    return localStorage.getItem('token')
}

export const getUserData = (): User | null => {
    const user = localStorage.getItem('user')
    return user != null ? JSON.parse(user) : null
}

export const isRememberMe = (): boolean => {
    return localStorage.getItem('remember') != null
}


export const removeAuthentication = (): void => {
    if(localStorage.getItem('token') != null){
        localStorage.removeItem('token')
    }

    return;
}