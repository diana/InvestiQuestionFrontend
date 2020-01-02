import React, { Component } from 'react'

export default class Login extends Component {

     state = {
         isLoggedIn: false,
     }

     loginUser = (event) => {
         event.preventDefault()
        this.props.loggedIn()
     }

     handleSubmit(event){
        const formData = new FormData(event.target)
        const password = formData.get('password')
        const email = formData.get('email')
        event.preventDefault()
        console.log(email, password)
        event.target.reset()
     }

    //  userPage(){
    //      return(
    //          <UserPage />
    //      )
    //  }

     loginForm() {
        return(
            <div className='modal'>
                <div className='modal-content'>
                <button onClick={this.props.onCloseModal} className='close'>x</button>
                <form 
                    className='login-form'
                    
                >
                    <label>Email:</label>
                    <input 
                        type='text'
                        name='email'
                    />
                    <label>Password:</label>
                    <input 
                        type='password'
                        name='password'
                    />
                    <input type='submit' className='submit'onClick={this.loginUser}/>
                </form>
                <button onClick={this.props.isNewUsers} onClickCapture={this.props.onCloseModal} className='login-button'>Sign-Up</button>
                </div>
            </div>
        )
     } 

    render() {
        return (
            <div>
                {this.state.isLoggedIn ? null : this.loginForm()}

            </div>
        )
    }
}
