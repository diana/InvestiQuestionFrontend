import React, { Component } from 'react'
import Surveys from './Surveys'
import NewSurvey from './NewSurveys'

export default class UserPage extends Component {
    state = {
        isClicked: false,
    }

    handleClick = (event) => {
        this.setState({isClicked: !this.state.isClicked})
    }

    newSurvey(){
        return(
            <NewSurvey />
        )
    }

    userMessage(){
        return(
            <div className='body'>
                <h1 className='new-survey-message'>Create a new survey to see below</h1>
            </div>
        )
    }


    render() {
        return (
            <div className='body'>
                <div className='new-user-screen'></div>
                <div className='user-page'>
                    <button className='new-survey' onClick={this.handleClick}>+ new survey</button>
                    <section className='user-surveys'>
                        <Surveys />
                    </section>
                </div>
                {this.state.isClicked ? this.newSurvey() : this.userMessage()}
            </div>
        )
    }
}
