import { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import LoadingPage from '@pages/LoadingPage';
import { ROUTES } from '@constants/route';
import { CookiesService } from '@helpers/cookies';
import { isTokenExpired } from '@helpers/token';

const PersistToken = () => {
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const accessToken = CookiesService.get();

    useEffect(() => {
        const checkAccessToken = () => {
            if (!accessToken || isTokenExpired(accessToken)) {
                CookiesService.remove();
                navigate(ROUTES.AUTH.LOGIN);
            } else {
                setIsLoading(false);
            }
        };

        checkAccessToken();
    }, [accessToken, navigate]);

    if (isLoading) {
        return <LoadingPage />;
    }

    return <Outlet />;
};

export default PersistToken;