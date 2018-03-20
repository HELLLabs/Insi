import React ,{Component} from 'react';
import Spinner from '../../Components/UI/Spinner/Spinner';
import './Login.css';

export default class Login extends Component {

    state={
        email:'',
        password:'',
        state:false,
    }    

handleChange = (event) => {
    console.log('click');

    if (event.target.name === 'email') {
        this.setState({email: event.target.value})
    } else {
        this.setState({password: event.target.value})
    }
}

    

    handleDataToSend =()=>{
        this.props.submil(this.state)
    }

    componentDidMount(){
        console.log(this.props);
    }

    render(){
        let message='',spinner;
        if(this.props.errorMessage){
            message=<p>{this.props.errorMessage}</p>
        }
        if(this.props.waiting){
            spinner=<Spinner />
        }
            return (
                <div className='login'>
                         <h2 className="mb-5">Sign in</h2>
                            {message}
                            <form>
                          <div >
                             <i className="fa fa-envelope prefix grey-text"></i>
                            <input type="email" name="email" className="form-control" value={this.state.email} onChange={this.handleChange} />
                            
                          </div>
                         <div >
                        <i className="fa fa-lock prefix grey-text"></i>
                        <input type="password" name="password" className="form-control" value={this.state.password} onChange={this.handleChange} />
                        
                    </div>
                   
                    <div className="text-center">
                        <button className="btn btn-default" onClick={this.handleDataToSend}>Login{spinner}</button>
                    </div>
                    </form>
                    
                </div>
            )
    }

}



