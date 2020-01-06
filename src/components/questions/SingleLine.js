import React, { Component } from 'react'

export default class SingleLine extends Component {
    state = {
        question: '',
        choice: []
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const formData = new FormData(event.target)
        const question = formData.get('question')
        const type = this.props.type.toLowerCase()
        const survey_id = this.props.survey.id

        const newQuestion = {question: question, questionType: type, choices: [], survey_id: survey_id}

        this.props.setNewQuestion(newQuestion)

        this.props.handleClick(event)

        fetch('http://localhost:3000/questions', {
            method: 'POST',
            headers: {
              'Content-Type':'application/json'
            },
            body: JSON.stringify({
                question: question,
                questionType: type,
                choices: [],
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
