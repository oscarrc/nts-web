import React from 'react';
import Lottie from "lottie-react";

import loading from '../../assets/loader.json'

export function Loader() {
    return <Lottie animationData={loading} />;
}

