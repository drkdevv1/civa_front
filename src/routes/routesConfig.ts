export interface RouteConfig {
    path: string;
    element: string;
    isProtected: boolean;
}

const routesConfig = [
    {
        path: '/login',
        element: 'Login',
        isProtected: false
    },
    {
        path: '/register',
        element: 'Register',
        isProtected: false
    },
    {
        path: '/buses',
        element: 'Buses',
        isProtected: true
    },
    {
        path: '/',
        element: 'Redirect',
        isProtected: false
    }
];

export default routesConfig;