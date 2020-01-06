import React, { Component } from 'react'
import Questions from './Questions'

export default class Surveys extends Component {

    state = {
        survey: {},
        isClicked: false,
        questions: [],
        question: '',
    }

    componentDidMount(){
        this.props.surveys.filter(survey => {
            if(this.props.surveyId === survey.id){ 
                return(
                    this.setState({survey: survey}),
                    this.setState({questions: survey.questions})
                )
            }
            else{
                return console.log('not found')
            }
        })
    }

    componentDidUpdate(){
        this.getOptions()
    }
    
    handleClick = (event) => {
        this.setState({isClicked: !this.state.isClicked})
    }

    setNewQuestion = (newQuestion) => {
        console.log('i got hit :X', newQuestion)
        return this.setState({questions: [...this.state.questions, newQuestion]})    
    }


    getOptions(){
        if(this.state.questions){
        return(this.state.questions.map(question => {
            if(question.questionType === 'dropdown'){
                    return (
                        <div className='q-div'>
                            <p className='question'>Question: {question.question}</p>
                            <select className='q-dd'>
                                {question.choices.map(choice => {
                                    return(console.log(choice),
                                        <option className='choices'>{choice}</option>
                                    )
                                })}
                            </select>
                        </div>
                    )
                }
                if(question.questionType === 'checkbox'){
                    return (
                        <div className='q-div'>
                            <p className='question'>Question: {question.question}</p>
                            {question.choices.map(choice => {
                                return(
                                    <div className='cb' >
                                        <input className='checkbox' type='checkbox' />
                                        <p className='choices'>{choice}</p>
                                    </div>
                                )
                            })}
                            
                        </div>
                    )
                }
                if(question.questionType === 'multi line'){
                    return (
                        <div className='q-div'>
                            <p className='question'>Question: {question.question}</p>
                            <textarea placeholder='enter answer here' rows='5' columns='20'></textarea>
                        </div>
                    )
                }
                if(question.questionType === 'single line'){
                    return (
                        <div className='q-div'>
                            <p className='question'>Question: {question.question}</p>
                            <input className='sl-input' type='text' placeholder='enter answer here'></input>
                        </div>
                    )
                }
                if(question.questionType === 'multiple choice'){
                    return (
                        <div className='q-div'>
                            <p className='question'>Question: {question.question}</p>
                            {question.choices.map(choice => {
                                return(console.log(choice),
                                    <div className='cb'>
                                        <input className='checkbox' type='checkbox' />
                                        <p className='choices'>{choice}</p>
                                    </div>
                                )
                            })}
                            <label>Other:</label>
                            <input type='text' className='question'></input>
                        </div>
                    )
                }
            return console.log('hi')

            }))
        }
    }

    createSurvey(){
        return(
            <div className='survey'>
                <h1 className='survey-title'>{this.state.survey.title}</h1>
                <p className='description'>{this.state.survey.description}</p>
                <div className='q-container'>
                    {this.getOptions()}
                </div>
                <button 
                    className='edit-button'
                    onClick={this.handleClick}
                >
                    add questions
                </button>
                <button
                    className='edit-button'
                    onClick={this.props.closeSurvey}
                >
                    closes survey
                </button>
            </div>
        )
    }

    createQuestions(){
        return(
            <Questions 
                survey={this.state.survey}
                currentQuestions={this.state.questions}
                renderQuestions={this.getOptions}
                setNewQuestion={this.setNewQuestion}
                handleClick={this.handleClick}
            />
        )
    }

    showSurvey(){
        if(this.state.isClicked){
            return this.createQuestions()
        }
        else{
            return this.createSurvey()
        }
    }

    render() {
        return (
            <div>
                <div>
                    {this.showSurvey()}
                </div>
            </div>
        )
    }
}
