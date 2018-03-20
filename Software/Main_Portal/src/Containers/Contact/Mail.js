import React,{Component} from 'react';
import {Button,Fa,Input} from 'mdbreact';

export default class Mail extends Component{

    state={
        name:'',
        email:'',
        message:'',
        description:'',
        status:''
    }

    changeHandler =(event)=>{
        let name=event.target.name;
        let value=event.target.value;

        if(name==='name'){
            this.setState({name:value});
        }else if(name==='email'){
            this.setState({email:value});
        }else if(name==='description'){
            this.setState({description:value});
        }else if(name==='message'){
            this.setState({message:value})
        }
       
    }

    sendMail=()=>{
        
        fetch('/sdnkihnk399yhaszhkkh/mail',{
            method:'POST',
             headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            email: this.state.email,
                            name: this.state.name,
                            message:this.state.message,
                            description:this.state.description

                        }),
        })
        .then(res=>res.json())
        .then(data=>{
            this.setState({status:data.send.message})
            console.log(data);
        })
    }

    render(){
        
        return(
            <div>
                    <h3>{this.state.status}</h3>
                    <form>
                        <p className="h5 text-center mb-4">write a issue</p>
                        <Input label="Your name" icon="user" group type="email" validate error="wrong" success="right" onChange={this.changeHandler} name='name' value={this.state.name} />
                        <Input label="Your email" icon="envelope" group type="email" validate error="wrong" success="right" onChange={this.changeHandler} name='email' value={this.state.email} />
                        <Input label="Subject" icon="tag" group type="email" validate error="wrong" success="right" onChange={this.changeHandler} name='message' value={this.state.message} />
                        <Input type="textarea" label="Your message" icon="pencil" onChange={this.changeHandler} name='description' value={this.state.description} />
                        <div className="text-center">
                            <Button  color="indigo" onClick={this.sendMail}>Send <Fa icon="paper-plane-o" className="ml-1"/></Button>
                        </div>
                    </form>

            </div>
        )
    }
}