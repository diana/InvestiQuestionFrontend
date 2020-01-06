import React, { Component } from 'react'
import Checkbox from './questions/Checkbox'
import Dropdown from './questions/Dropdown'
import MultLine from './questions/MultiLine'
import MultipleChoice from './questions/MultipleChoice'
import SingleLine from './questions/SingleLine'

export default class Questions extends Component {

    state = {
        choice: '',
        questions: this.props.currentQuestions 
    }

    setChoice = (event) =>{
        const choice = event.target.value
        return this.setState({choice: choice})
    }

    addNewQuestion = (newQuestion) => {
        return (this.setState({questions: [...this.state.questions, newQuestion]}),
        this.props.renderQuestions())
    }

    addQuestion(){
        if(this.state.choice === 'Checkbox'){
            return(
                <Checkbox
                    survey={this.props.survey}
                    type={this.state.choice}
                    setNewQuestion={this.props.setNewQuestion}
                    handleClick={this.props.handleClick}
                />
            )
        }
        if(this.state.choice === 'Dropdown'){
            return(
                <Dropdown
                    survey={this.props.survey}
                    type={this.state.choice}
                    setNewQuestion={this.props.setNewQuestion}
                    handleClick={this.props.handleClick}
                />
            )
        }
        if(this.state.choice === 'Multiple Choice'){
            return(
                <MultipleChoice
                    survey={this.props.survey}
                    type={this.state.choice}
                    setNewQuestion={this.props.setNewQuestion}
                    handleClick={this.props.handleClick}

                />
            )
        }
        if(this.state.choice === 'Single Line'){
            return(
                <SingleLine
                    survey={this.props.survey}
                    type={this.state.choice}
                    setNewQuestion={this.props.setNewQuestion}
                    handleClick={this.props.handleClick}

                />
            )
        }
        if(this.state.choice === 'Multi Line'){
            return(
                <MultLine
                    survey={this.props.survey}
                    type={this.state.choice}
                    setNewQuestion={this.props.setNewQuestion}
                    handleClick={this.props.handleClick}

                />
            )
        }
    }

    getQuestion(){
        if(this.state.questions){
            return(
                this.state.questions.map(question => {
                    return(
                    <p className='question'>Question & Type: {question.question} {question.questionType}</p>
                    )
                })
            )
        }
    }

    createNewQuestion(){
        return(
            <div>
                <h1 className='survey-title'>{this.props.survey.title}</h1>
                <p className='description'>{this.props.survey.description}</p>
                {this.getQuestion()}
                <p className='question-message'>Select a question type:</p>
                <select onChange={this.setChoice}>
                    <option>Select</option>
                    <option>Checkbox</option>
                    <option>Dropdown</option>
                    <option>Multiple Choice</option>
                    <option>Single Line</option>
                    <option>Multi Line</option>
                </select>
                <button 
                    className='edit-button'
                    onClick={this.props.handleClick}
                >
                    back to survey
                </button>

            </div>
        )
    }

    render() {
        return (
            <div>
                {this.state.choice ? this.addQuestion() : this.createNewQuestion()}
            </div>
        )
    }
}
