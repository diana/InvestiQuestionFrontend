import React, { Component } from 'react'

export default class NewSurveys extends Component {

    state = {
        title:'',
        description: '',
    }

    handleChange(event){
        this.setState({[event.target.name] : event.target.value})
    }

   
    
    handleSubmit(event){
        const formData = new FormData(event.target)
        const title = formData.get('title')
        const description = formData.get('description')
        const newSurvey = {title: this.state.title, description: this.state.description}

        this.props.setNewSurvey(newSurvey)


        event.preventDefault()
        fetch('http://localhost:3000/surveys', {
          method: 'POST',
          headers: {
            'Content-Type':'application/json'
          },
          body: JSON.stringify({
            title: title,
            description: description,
          
            }) 
        }) 
        
        event.target.reset()
    }

    render() {
        const isEnabled = (
            this.state.title.length > 0 &&
            this.state.description.length > 0
        )
        return (
            <div className='new-survey'>
                <h1 className='new-survey-header' >New Survey Form</h1>
                <form 
                    className='new-survey-form'
                    onSubmit={event => this.handleSubmit(event)}
                >
                    <label className='survey-lable'>Survey Name</label>
                    <input 
                        type='text'
                        name='title'
                        required={true}
                        className='survey-input'
                        placeholder='requires 4+ characters'
                        onChange={event => this.handleChange(event)}
                    />
                    <label className='survey-lable'>Survey Description</label>
                    <input
                        type='text'
                        name='description'
                        required={true}
                        className='survey-input'
                        placeholder='requires 10+ characters'
                        onChange={event => this.handleChange(event)}
                    />
                    <input
                        disabled={!isEnabled} 
                        className='survey-submit' 
                        type='submit'
                        // onClick={event => this.props.handleClick(event)}
                    />
                </form>
            </div>
        )
    }
}
