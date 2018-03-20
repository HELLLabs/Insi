import React, {Component} from 'react';
import './Statatics.css';
import { Line } from 'react-chartjs-2';
export default class Claim extends Component {

    state={
        chartdata:{}
    }

    componentWillMount(){
        fetch('https://insi.herokuapp.com/chartStats')
            .then(res=>res.json())
            .then(data=>{
                console.log(data);
                this.setState({chartdata:data});
            })
    }

    render() {
        return(
                <div className='statatics'>
                    <Line data={this.state.chartdata} />
                </div>
        )
        
    }

}