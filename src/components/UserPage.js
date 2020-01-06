import React, { Component } from 'react'
import Surveys from './Surveys'
import NewSurvey from './NewSurveys'

export default class UserPage extends Component {
    state = {
        isClicked: false,
        surveys: [],
        isSurveyClicked: false,
        newSurvey: {},
        questions:[],
        surveyId: 0
    }
    
    componentDidMount(){
        fetch('http://localhost:3000/surveys')
            .then(response => response.json())
            .then(result => this.setState({surveys: result}))
    }

    handleClick = (event) => {
        this.setState({isClicked: !this.state.isClicked})
    }


    setNewSurvey = (newSurvey) => {
        // this.setState({newSurvey: newSurvey})
        this.setState({surveys: [...this.state.surveys, newSurvey]})
    }


    newSurvey(){
        return(
            <NewSurvey
                handleClick={this.handleClick}
                setNewSurvey={this.setNewSurvey}
            />
        )
    }

    handleSurveyClick = (id) => {
        console.log(id)
        return( 
            this.setState({isSurveyClicked: !this.state.isSurveyClicked}),
            this.setState({surveyId: id})
        )
    }

    openSurvey(){
        return(
            <Surveys
                surveys = {this.state.surveys}
                closeSurvey={this.handleSurveyClick}
                surveyId = {this.state.surveyId}
            />
        )
    }

    showSurveys(){
        if(!this.state.newSurvey){
            return this.state.surveys.map(survey => {
                return(
                    <div>
                        <table className='survey-table'>
                            <tbody>
                                <tr>
                                    <th>Survey Title</th>
                                    <th>Survey Results</th>
                                    <th>Edit Survey</th>
                                </tr>
                                <tr>
                                    <td 
                                        value={survey.id}
                                        >
                                        {survey.title}
                                    </td>
                                    <td>0</td>
                                    <td>
                                        <button
                                            onClick={event => this.handleSurveyClick(survey.id)}
                                            className='edit-button'
                                        >
                                            view
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )
            })
        }
        else{
            return this.state.surveys.map(survey => {
                return(
                    <div key={survey.id}>
                        <table className='survey-table'>
                            <tbody>
                                <tr>
                                    <th>Survey Title</th>
                                    <th>Survey Results</th>
                                    <th>Edit Survey</th>
                                </tr>
                                <tr>
                                    <td 
                                        value={survey.id}
                                        >
                                        {survey.title}
                                    </td>
                                    <td>0</td>
                                    <td>
                                        <button
                                            onClick={event => this.handleSurveyClick(survey.id)}
                                            className='edit-button'
                                        >
                                            view
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )
            })
        }
    }


    userMessage(){
        if(this.state.surveys.length === 0){
            return(
                <div className='body'>
                    <h1 className='new-survey-message'>Create a new survey to see below</h1>
                </div>
            )
        }
        else{
            if(this.state.isSurveyClicked){
                return(
                    <div className='survey-body'>
                        {this.openSurvey()}
                    </div>
                )
            }
            else{
                return(
                    <div className='surveys-body'>
                        <h1 className='user-survey-message'>Your Surveys</h1>
                        <div className='user-surveys'>
                        {this.showSurveys()}
                        </div>
                    </div>
                )
            }
        }
    }


    render() {
        return (
            <div className='body'>
                <div className='new-user-screen'></div>
                <div className='user-page'>
                    <button className='new-survey-button' onClick={this.handleClick}>+ new survey</button>
                    {this.state.isClicked ? this.newSurvey() : this.userMessage()}
                </div>
            </div>
        )
    }
}
// handleClick = () => {
//     return this.setState({isClicked: !this.state.isClicked})
// }

// openSurvey(){
//     return(
//         <Survey
//             surveyId = {this.state.surveyId}
//         />
//     )
// }

