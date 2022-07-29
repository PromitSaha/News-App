import React from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import { useSelector } from 'react-redux'

const LoadingSpinner = () => {
    const isLoadingSpinnerVisible = useSelector(state => state?.loadingSpinner?.loadingSpinnerVisible);

    return (
        <>
            {
                isLoadingSpinnerVisible ?
                <ClipLoader loading={true}  size={50} className="loading-spinner"/>
                :
                <></>   
            }
        </>
    )
}

export default LoadingSpinner;