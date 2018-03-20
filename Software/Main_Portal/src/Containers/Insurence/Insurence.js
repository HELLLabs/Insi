import React, {Component} from 'react';
import './Insurence.css';
import { Card, CardBody, CardTitle, CardText} from 'mdbreact';
export default class Claim extends Component {

    state = {
        details:{}
    }

    componentWillMount(){
       fetch('/sdnkihnk399yhaszhkkh/insurence')
        .then(res=>res.json())
        .then(body=>{
            this.setState({details:body})
            console.log(this.state.details);
        })
    }
    render() {
        return (
            <div class='insurence'>
                <Card>
                            <CardBody>
                                <CardTitle><h3>Insurence details</h3></CardTitle>
                                <CardText>
                                    {this.state.details.device_id}
                                </CardText>
                                
                            </CardBody>
                        </Card>
            </div>
        )
    }

}