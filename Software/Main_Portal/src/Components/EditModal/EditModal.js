import React ,{Component}from 'react';
import {Button, Modal, ModalBody, ModalHeader, ModalFooter} from 'mdbreact';


export default class EditModal extends Component{
    state={
        updatedDetails:{
            user:{
                name : 'anmol',
                email : 'fdsafsdfa',
                contact : 45423543,
                modal : false
            }          
        },
        modal:false
    }
    
    toggle=()=> {
        this.setState({
            modal: this.props.modalOpen,
        });
    }

    handleChange =(event)=>{
let inputName = event.target.name;
let inputValue = event.target.value;
let updatedName = {...this.state.updatedDetails,user:{...this.state.updatedDetails.user, name:inputValue}};
        if(inputName==='name'){
        // let updates={...this.state.updatedDetails.user,name:event.target.value};
//             this.setState(prevState => ({
//     ...prevState,
//     updatedDetails: {
//         ...prevState.updatedDetails,
//         user: {
//             ...prevState.updatedDetails.user, 
//             name:inputValue
           
//         }
//     }
// }))
this.setState({updatedDetails:updatedName})
      console.log(this.state.updatedDetails.user);      
        // }else if(event.target.name=='email'){
        //     updates.email=event.target.value;
        //     this.setState({updatedDetails:updates});
        // }else if(event.target.name=='contact'){
        //     updates.contact=event.target.value;
        //     this.setState({updatedDetails:updates});
        // }
        // console.log(this.state.updatedDetails.user);
    }
}

    updateChanges =()=>{
            var data={
                ...this.state.updatedDetails.user
            }
            fetch('/settings',{
            method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(data),
                    });
        }
    
    render(){
        return(
            <div>
                {/* <Link to='/editdetails' >
                    <Button color="primary" onClick={this.toggle}>Launch demo modal</Button>
                </Link> */}
                
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Edit profile</ModalHeader>
                    <ModalBody>
                        <form>
                    <input type='text' name='name' value={this.state.updatedDetails.user.name} onChange={this.handleChange} />
                    <input type='email' name='email' value={this.state.updatedDetails.email} onChange={this.handleChange} />
                    <input type='number' name='contact' value={this.state.updatedDetails.contact} onChange={this.handleChange} />
                    
                    
                </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.toggle}>Close</Button>{' '}
                        <Button color="primary" onClick={this.toggle}>Save changes</Button>
                    </ModalFooter>
                </Modal>
                
            </div>
        )
    }
}






    
