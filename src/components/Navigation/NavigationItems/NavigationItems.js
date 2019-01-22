import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css';

const navigationItems =(props)=>(
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact >Burger Builder</NavigationItem>
        {props.isAuthenticated?<NavigationItem link="/orders">Orders</NavigationItem>:null}
        {props.isAuthenticated?<NavigationItem link="/Logout">Logout</NavigationItem>:
        <NavigationItem link="/Auth">SignUp</NavigationItem>}

    </ul>

);

export default navigationItems