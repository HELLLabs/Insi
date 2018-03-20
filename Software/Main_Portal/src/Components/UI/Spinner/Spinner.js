import React from 'react';
import {Fa} from 'mdbreact';
import './Spinner.css';
const spinner =(props)=>{
    return (
        <div className='spinner1'>
            <Fa icon="spinner" pulse size="3x" fixed/>
            <span className="sr-only">Loading...</span>
        </div>
    )
}
export default spinner;