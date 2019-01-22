import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux/Aux';


const sideDrawer = (props) => {
    let attachClasses = [classes.SideDrawer, classes.Close];
    if(props.showed){
        attachClasses =[classes.SideDrawer, classes.Open];
    }
    return(
        <Aux>
            <Backdrop
            clicked={props.closed} 
            show={props.showed}/>
        <div className={attachClasses.join(' ')}  onClick={props.closed}>
            <div className={classes.Logo}>
             <Logo />    
            </div>
            <nav>
                <NavigationItems isAuthenticated={props.isAuth} />
            </nav>
        </div>
        </Aux>
    )
};

export default sideDrawer;