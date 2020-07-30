import React from 'react'
import { Route, BrowserRouter } from 'react-router-dom'

import Home from './pages/Home'
import ConsultPayments from './pages/ConsultPayments'
import CreatePayments from './pages/CreatePayments'
import ChangePayments from './pages/ChangePayments'
import UploadFiles from './pages/UploadFiles'

const Routes = () => {
    return (
        <BrowserRouter>
            <Route component={Home} path='/' exact />
            <Route component={ConsultPayments} path='/consult-payments'/>
            <Route component={CreatePayments} path='/create-payments'/>
            <Route component={UploadFiles} path='/upload-files'/>
            <Route component={ChangePayments} path='/change-payments/:id'/>
        </BrowserRouter>
    )
}

export default Routes