const hoc = (WrappedComponents) => {
    const newProps = {
        loading: false
    }
    return (originalProps) => {
        return <WrappedComponents {...originalProps} {...newProps} />
    }
}

import React, { useState, useEffect } from 'react';

// Define the higher-order component
const withDataFetching = (WrappedComponent, dataSource) => {
    return (originalProps) => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(async () => {
        setLoading(true);
        const response = await fetch(dataSource); 
        setLoading(false);
        const result = await response.json();
        setData(result);
    }, []);

    const newProps = {
        data,
        loading
    }
        return (
        <WrappedComponent {...originalProps} {...newProps} />
        );
    }
}

const withAuthentication = (WrappedComponent) => {
    return (originalProps) => {
        const isAuthenticated = checkAuthentication();

        if (isAuthenticated) {
            return <WrappedComponent {...originalProps} />
        }

        return <Redirect to={'/login'} />

    }
}
