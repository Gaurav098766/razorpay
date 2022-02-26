import React from 'react'
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import App from './App'
import PaymentStatus from './comps/PaymentStatus';

const Routess = () => {
    return(
        <Router>
            <Routes>
                <Route path="/" element={<App/>}/>
                <Route path="/payment/status/:paymentId" element={<PaymentStatus/>}/>
            </Routes>
        </Router>
    )
}

export default Routess;