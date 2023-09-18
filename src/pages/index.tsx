import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from "./images";
import { AppRoutes } from 'routes';

export default function Pages() {
    return (
        <>
            <Routes>
                <Route path={AppRoutes.home} element={<HomePage />} />,
                <Route path={"*"} element={<HomePage />} />,
            </Routes>
        </>
    )
}
