import React, { Component } from 'react'

export default class Checkbox extends Component {

    state = {
        selections: [1,2],
        question: '',
        choice: []
    }

    showSelection(){
        return this.state.selections.map(selection => {
            return(
            <>
                <label className='s-label'>Selection: {selection}</label>
                <input type='text' name='choice' className='s-input' />
            </>
            )
        })
    }

    addSelection = (event) => {
        event.preventDefault()
        this.setState({selections: [...this.state.selections, this.state.selections.length + 1]})
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const formData = new FormData(event.target)
        const question = formData.get('question')
        const choices = event.target.querySelectorAll('.s-input')
        const type = this.props.type.toLowerCase()
        const survey_id = this.props.survey.id

        const array = [...choices]

        const choiceArray = array.map(choice => {
            return choice.value
        })
        
        const newQuestion = {question: question, questionType: type, choices: choiceArray, survey_id: survey_id}

        this.props.setNewQuestion(newQuestion)


        this.setState({question: question, choice: choiceArray})         

        this.props.handleClick(event)

        fetch('http://localhost:3000/questions', {
            method: 'POST',
            headers: {
              'Content-Type':'application/json'
            },
            body: JSON.stringify({
                question: question,
                questionType: type,
                choices: choiceArray,
                survey_id: survey_id
            }) 
        })
        event.target.reset()
    }
    
    addCheckbox(){
        return(
            <div>
                <form onSubmit={event => this.handleSubmit(event)} className='question-form'>
                    <label className='q-label'>Question:</label>
                    <input type='text' name='question' className='q-input' />
                    {this.showSelection()}
                    <button className='q-button' onClick={this.addSelection}>add selection</button>
                    <input 
                        className='q-submit' 
                        type='submit'
                    />
                </form>
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
                {this.addCheckbox()}
            </div>
        )
    }
}
