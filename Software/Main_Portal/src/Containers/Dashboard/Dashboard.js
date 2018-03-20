import React, {Component} from 'react';
import './Dashboard.css';
import io from 'socket.io-client';
import {
    Card,
    CardBody,
    CardTitle,
    CardText
} from 'mdbreact';
import Spinner from '../../Components/UI/Spinner/Spinner';
export default class Dashboard extends Component{

    state={
        device1:false,
        device3 :false,
        device2:false,
        deviceData:null
    }

    componentWillMount(){
fetch('https://insi.herokuapp.com/getStats')
    .then(res => res.json())
    .then(body => {
        this.setState({deviceData: body})
        console.log(this.state.deviceData);
    })
    .catch(err => {
        console.log(err);

    })
    console.log('will')
    }
    componentDidMount(){
        let socket;
        socket = io('https://shubham9918.herokuapp.com/');

        socket.on('device',(data)=>{
            if(data.id===1){
                this.setState({device1:data.isConnected})
            }else if(data.id===2){
                this.setState({device2:data.isConnected})
            }
        })
        console.log(this.state.device1);
        console.log('did')    
    };

   

    render(){
        let device,color,main;

        if(this.state.device1){
            color='green';
        
        }else if(!this.state.device1){
            color='red';
        
            
        }
        if(this.state.deviceData){
            main=(
                <div>
                   <div className="row">
                    <div className="col-sm-6">
                        <Card>
                            <CardBody>
                                <CardTitle>Device status</CardTitle>
                                <div className="row">
                                    <div className="col-sm-6 device1 text-center" style={{backgroundColor:color , height:'76px'}}>device1</div>
                                    <div className="col-sm-6 device2 text-center" style={{backgroundColor:color}} > device2 </div>
                                </div>
                                
                               
                            </CardBody>
                        </Card>
                    </div>
                    <div className=" col-sm-6">
                        <Card>
                            <CardBody>
                                <CardTitle>Max power day in week</CardTitle>
                                <CardText>
                                    <h1>{this.state.deviceData.active_day.most.day}</h1>
                                    <h4>frequency : {this.state.deviceData.active_day.most.frequency} </h4>    
                                </CardText>
                                
                            </CardBody>
                        </Card>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-4">
                        <Card>
                            <CardBody>
                                <CardTitle>Lowest power day in weak </CardTitle>
                                <CardText>
                                    <h1>{this.state.deviceData.active_day.least.day}</h1>
                                    <h4>Power Consumed : {this.state.deviceData.active_day.least.frequency}</h4>
                                </CardText>
                                
                            </CardBody>
                        </Card>
                    </div>
                    <div className="col-sm-8 card4">
                        <Card>
                            <CardBody>
                                <CardTitle><h3>Total power consumed</h3></CardTitle>
                                <CardText>
                                    <h2>{this.state.deviceData.avg_running_time}</h2>
                                </CardText>
                                
                            </CardBody>
                        </Card>
                    </div>
                </div> 
            </div> 
                )
        }else{
            main=<Spinner />
        }
        
        
        
        return(
            <div className="dashboard">
                {/* <p>{device}</p> */}
               {main}
            </div>
        )
    }
}
