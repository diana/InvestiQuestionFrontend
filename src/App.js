import React, { Component } from 'react'
import NewUsers from './components/NewUsers'
import Login from './components/Login'
import UserPage from './components/UserPage'

import './App.scss'

const usersUrl = 'http://localhost:3000/users'

export default class App extends Component {

  state = {
    isLoggedIn: false,
    open: false,
    users: [],
    newUser: false,
  }

  componentDidMount(){
    fetch(usersUrl)
      .then(response => response.json())
      .then(result => this.setState({users: result}))
  }

  onOpenModal = () => {
    this.setState({ open: true });
  };

  createModal(){
    return(
      <Login
        users={this.state.users}
        isNewUsers={this.isNewUsers}
        onCloseModal={this.onCloseModal}
        loggedIn={this.loggedIn}
      />
    )
  }

  loggedIn = () => {
    this.setState({isLoggedIn: true})
  }

  isNewUsers = (event) => {
    event.preventDefault()
    this.setState({newUser: !this.state.newUser})
  }
  
  setUser = user => {
    this.setState({users: [...this.state.users, user]})
  }

  newUsers(){
    return(
      <div>
        <NewUsers
          setUser={this.setUser}
        />
      </div>
    )
  }

 
  onCloseModal = () => {
    this.setState({ open: false });
  };

  createWelcomePage() {
    if(this.state.newUser){
      return( 
        <div>
          {this.newUsers()}
        </div>
      )
    }
    if(this.state.isLoggedIn){
      return( 
        <div>
          {this.userPage()}
        </div>
      )
    }
    else{ 
      return(
        <div className='body'>
        <div className='welcome-background'>
        </div>
          <h1 className='welcome-header'>Welcome to investiQUESTION</h1>
          <p className='welcome-page'>
            You ask the questions, 
            we process the answers!
          </p>
        </div>
      )
  }
  }

  userPage() {
    return(
      console.log('woop woop'),
      <UserPage />
    )
  }


  render() {
    return (
      <div>
        <header className='header'>
          <nav className='nav'>
            <button>home</button>
            <img src='https://i.imgur.com/DD20Pye.png' alt='investi-questions' className='logo' />
            <button onClick={this.onOpenModal}>login</button>
          </nav>
        </header>
        <div>
          {this.createWelcomePage()}
        </div>
        {this.state.open ? this.createModal() : null}
      </div>
    )
  }
}

