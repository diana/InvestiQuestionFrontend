import React, { Component } from 'react'

export default class NewSurveys extends Component {

    state = {
        
    }
    
    // createSurvey(){
    //     return(
    //         // <div>
    //         //     <form className='signup-form'>
    //         //         <label className='survey-lable'>Survey Name</label>
    //         //         <input 
    //         //             type='text'
    //         //             name='title'
    //         //             required='true'
    //         //         />
    //         //         <label className='survey-lable'>Survey Description</label>
    //         //         <input
    //         //             type='text'
    //         //             name='description'
    //         //             required='true'
    //         //         />
    //         //         <input
    //         //             // input disabled={!isEnabled} 
    //         //             className='signup-submit' 
    //         //             type='submit'
    //         //         />
    //         //     </form>
    //         // </div>
    //     )
    // }

    render() {
        return (
            <div className='new-survey'>
                <h1 className='new-survey-header' >New Survey Form</h1>
                <form className='new-survey-form'>
                    <label className='survey-lable'>Survey Name</label>
                    <input 
                        type='text'
                        name='title'
                        required='true'
                        className='survey-input'
                    />
                    <label className='survey-lable'>Survey Description</label>
                    <input
                        type='text'
                        name='description'
                        required='true'
                        className='survey-input'
                    />
                    <input
                        // input disabled={!isEnabled} 
                        className='survey-submit' 
                        type='submit'
                    />
                </form>
            </div>
        )
    }
}
