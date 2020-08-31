import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import FormElement from './components/Form'
import Storage from './components/Storage'
import UpdateProduct from './components/UpdateProduct'

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path='/update' component={UpdateProduct}/>
            <Route exact path='/cadastro' component={FormElement}/>
            <Route path='/' component={Storage}/>
        </Switch>
    </BrowserRouter>
)

export default Routes