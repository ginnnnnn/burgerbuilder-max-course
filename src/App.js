import React, { Component,Suspense } from 'react';
import { connect } from  'react-redux'; 
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import CheckOut from './containers/CheckOut/CheckOut';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout';
import * as type from './store/actions/index';

const Orders = React.lazy(()=> import('./containers/Orders/Orders')) //react lazy


class App extends Component {
    componentDidMount(){
        this.props.onAuthCheck()
    }
    render(){
        let routes = (<Switch>
        <Route path='/auth' component={Auth} />
        <Route path='/' exact component={BurgerBuilder} />
        <Redirect to='/' />
        </Switch>);
        if(this.props.isAuthed){
            routes=(<Switch>
            <Route path='/checkout' component={CheckOut}/>
            <Route path='/orders' render={()=>(
            <Suspense fallback={<div>loading..</div>}>
            <Orders /></Suspense>)} />
            <Route path='/auth' component={Auth} />
            <Route path='/Logout' component={Logout} />
            <Route path='/' exact component={BurgerBuilder} />
            <Redirect to='/' />
            </Switch>)
        }


        return(
            <div>
                <Layout>
                    {routes}
                </Layout>
            </div>
        )
    }
};

const mapStateToProps = state =>{
    return {
        isAuthed:state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        onAuthCheck:()=>dispatch(type.authCheckState())
    }
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));