import React , {Component} from 'react';
import {
    Button,
    Navbar,
    NavbarBrand,
    NavbarNav,
    NavbarToggler,
    Collapse,
    NavItem,
    NavLink,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'mdbreact';
import {Link} from 'react-router-dom';
import './Header.css';

export default class Header extends Component{

constructor(props) {
    super(props);
    this.state = {
        collapse: false,
        isWideEnough: false,
        dropdownOpen: false

    };
    this.onClick = this
        .onClick
        .bind(this);
    this.toggle = this
        .toggle
        .bind(this);
}

onClick() {
    this.setState({
        collapse: !this.state.collapse
    });
}

toggle() {
    this.setState({
        dropdownOpen: !this.state.dropdownOpen
    });
}


    render(){
        let button;
        if(this.props.token){
            button=<Button outline color="secondary">Logout</Button>
        }else{
            button=<Button outline color="secondary">Login</Button>
        }
        return(
                <Navbar color="unique-color-dark" dark expand="md" scrolling fixed='top' >
                    <NavbarBrand href = "/" >
                        <strong>INSI</strong>
                    </NavbarBrand>
                            { !this.state.isWideEnough && <NavbarToggler onClick = { this.onClick } />}
                            <Collapse isOpen = { this.state.collapse } navbar>
                                <NavbarNav className="ml-auto">
                                <NavItem >
                                    <NavLink className="nav-link" to="#"></NavLink>
                                </NavItem>
                                
                                <NavItem>
                                    <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                                    <DropdownToggle nav  >{this.props.name}</DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem href="#">Profile</DropdownItem>
                                        <DropdownItem href="#">Settings</DropdownItem>
                                        <DropdownItem href="#">History</DropdownItem>
                                        <DropdownItem href="#">Notifications</DropdownItem>
                                    </DropdownMenu>
                                    </Dropdown>
                                </NavItem>
                                
                                    <Link to='/login'>
                                        {button}
                                    </Link>
                                
                                </NavbarNav>
                            </Collapse>
                        </Navbar>
                )
    }
}