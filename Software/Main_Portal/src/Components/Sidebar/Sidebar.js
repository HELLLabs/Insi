import React from 'react';

import {NavLink} from 'react-router-dom';
import {
    Button,
    Card,
    CardBody,
    CardTitle,
    CardText
} from 'mdbreact';
import './Sidebar.css';
const sidebar = (props) => {

    return(
        <div className=" sidenav">
                        <h3><strong>General</strong></h3>
                            
                            <NavLink to="/dashboard" ><i class="fa fa-gears " aria-hidden="true"></i> Dashboard</NavLink>
                            <NavLink to="/insurence" ><i class="fa fa-sort-amount-desc" aria-hidden="true"></i> Insurance</NavLink>
                            <NavLink to="/device" ><i class="fa fa-sliders" aria-hidden="true"></i>  Device</NavLink>
                            <NavLink to="/statatics" ><i class="fa fa-line-chart " aria-hidden="true"></i> Statatics</NavLink>
                            <NavLink to="/claim" ><i class="fa fa-pencil-square-o " aria-hidden="true"></i> Claims</NavLink>
                            <NavLink to="/settings" ><i class="fa fa-cog" aria-hidden="true"></i> Settings</NavLink>
 
                        <div >                                
                        <Card >
                            <CardBody>
                                <CardTitle>Mail us</CardTitle>
                                
                                <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                                <NavLink to='/contact'><Button>mail us</Button></NavLink>
                            </CardBody>
                        </Card>


            <h3>Your devices</h3>
                <ul>
                    <li>Device1</li>
                    <li>Device2</li>
                    
                </ul>

                            </div>
                            </div>
                    
    )
}


export default sidebar;