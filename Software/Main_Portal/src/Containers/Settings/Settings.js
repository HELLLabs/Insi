import React, {Component} from 'react';
import EditModal from '../../Components/EditModal/EditModal';
import {Button} from 'mdbreact';
import './Settings.css';
export default class Claim extends Component {

    state = {
        userDetail:[],
        toggleState:false,
        isChecked:false,
        state:false
    }

    componentDidMount = async() => {
        await this.setState({userDetail: this.props.userDetails});
        console.log(this.state.userDetail);
    }

    toggle = () => {
        this.setState({state:!this.state.toggleState})
    }

    render () {
        return(
               <div className='row'>
                <div className="col-sm-12">
                    {/* {this.state.userDetail[0].user.name} */}
                   
                    <EditModal {...this.props} modalOpen={this.state.toggleState} />  
                </div>
                 <Button color="primary" onClick={this.toggle}>Launch demo modal</Button>

               </div>
        )   
    }
}
