import React, { Component } from 'react'

export default class NewUsers extends Component {

    state = {
        username: '',
        email: '',
        password: '',
        password_check: '',
        password_error: false,
    }

    createUser = user => {
        this.props.setUser(user)
        fetch('http://localhost:3000/users', {
          method: 'POST',
          headers: {
            'Content-Type':'application/json'
          },
          body: JSON.stringify(user)
        })
    }
    
    handleChange(event){
        this.setState({[event.target.name] : event.target.value})
    }

    handleSubmit(event){
        const formData = new FormData(event.target)
        const username = formData.get('username')
        const password = formData.get('password')
        const email = formData.get('email')
        event.preventDefault()
        fetch('http://localhost:3000/users', {
          method: 'POST',
          headers: {
            'Content-Type':'application/json'
          },
          body: JSON.stringify({
            username: username,
            email: email,
            password: password}
          )
        })  
        event.target.reset()
    }
    
   

    createSignUp = () => {
        const isEnabled = (
            this.state.email.length > 0 &&
            this.state.email.includes('@') && 
            this.state.email.includes('.') && 
            this.state.username.length > 0 && 
            this.state.password.length > 0 &&
            !this.state.password_error
        )
        return(
            console.log(this.props.createUser),
            <div>
                <div className='signup-background'></div>
                <h1 className='signup-header'>
                    Sign-up today!
                </h1>
                <form className='signup-form' onSubmit={this.handleSubmit}>
                    <label className='signup-label'>Username:</label>
                    <input 
                        name='username'
                        type='text'
                        onChange={event => this.handleChange(event)}
                    />
                    <label className='signup-label'>Email:</label>
                    <input 
                        type='text'
                        name='email'
                        onChange={event => this.handleChange(event)}
                    />
                    <label className='signup-label'>Password:</label>
                    <input 
                        type='password'
                        name='password'
                        onChange={event => this.handleChange(event)}
                    />
                     <input disabled={!isEnabled} className='signup-submit' type='submit'></input>
                </form>
            </div>
        )
    }


    render() {
        return (
            this.createSignUp()
        )
    }
}
