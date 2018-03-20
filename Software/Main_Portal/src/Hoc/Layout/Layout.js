import React ,{Component} from 'react';
// import {Button } from 'mdbreact';
import './Layout.css';
import Dashboard from '../../Containers/Dashboard/Dashboard';
import Settings from '../../Containers/Settings/Settings';
import Insurence from '../../Containers/Insurence/Insurence';
import Device from '../../Containers/Device/Device';
import Statatics from '../../Containers/Statatics/Statatics';
import { Route ,Switch ,Redirect} from 'react-router-dom';
import Header from '../../Components/Header/Header';
import Login from '../../Containers/Login/Login';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Claim from '../../Containers/Claim/Claim';
import Mail from '../../Containers/Contact/Mail';
// import Homepage from '../../Components/Homepage/Homepage';
// import ErrorPage from '../../Components/ErrorPage/ErrorPage';
import Spinner from '../../Components/UI/Spinner/Spinner';



export default class Layout extends Component{

        state={
            user:{},
            authData:null,
            error:false,
            waiting:false
        }
        
        sendData = async (data) => {
            await this.setState({user:data,waiting:true});
            await fetch('/sdnkihnk399yhaszhkkh/login', {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            email: this.state.user.email,
                            password: this.state.user.password,
                        }),
                    })
                    .then(res => res.json())
                    .then( user =>{
                    this.setState({authData:user,waiting:false});
                    }).catch(err=>console.log(err));            
        }
    

        render(){
            let maindata,spin;
            if(this.state.authData==null){
                maindata=(
                    <div className="container-fluid">
                        <Header />
                        < Route path = '/login' exact component = {
                            () => (<Login
                                state={this.handleChange}
                                details={this.state}
                                submil={this.sendData}
                                data={this.handleLoginState}/>)
                        } />
                    </div>
                )

                    if (this.state.waiting) {
                        spin = <Spinner/>
                    }
                }else{
                    if(this.state.authData.auth.isAuth===false){
                        maindata=(
                            <div>
                                <Header />
                                < Route path = '/login' exact component = {
                                    () => (<Login
                                        state={this.handleChange}
                                        details={this.state}
                                        submil={this.sendData}
                                        data={this.handleLoginState}
                                        errorMessage={this.state.authData.auth.value}
                                        waiting={this.state.waiting}/>)
                                } />
                            </div>
                            )
                                if (this.state.waiting) {
                                    spin = <Spinner/>
                                }
                        }else{
                            maindata=(
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-sm-12">
                                    < Header name = {
                                        this.state.authData.user.name
                                    }
                                    token = {
                                        this.state.authData.token
                                    } />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-3"> 
                                            <Sidebar />
                                        </div>

                                        <div className="col-sm-9">
                                            <Switch>
                                                <Route path='/dashboard' exact component={Dashboard} />
                                                <Route path='/insurence' exact component={Insurence} />
                                                <Route path='/statatics' exact component={Statatics} />
                                                <Route path='/device' exact component={Device} />
                                                <Route path='/claim' exact component={Claim} />
                                                <Route path='/settings' exact render={(props)=><Settings userDetails={this.state.authData} {...props}/>}/> 
                                                
                                                <Route path='/contact' exact component={Mail} />
                                                < Redirect from = '/' to = '/dashboard' />
                                            </Switch>
                                        </div>
                                    </div>
                                    
                                </div>
                                )
                    }}

        return(
            <main>
                {maindata}   
                {spin}
            </main>       
        )
    }
}