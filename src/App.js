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
    user: false
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
  
  isUsers = (event) => {
    event.preventDefault()
    this.setState({user: !this.state.user}) && this.onOpenModal()
  }

  
  setUser = user => {
    this.setState({users: [...this.state.users, user]})
  }

  newUsers(){
    return(
      <div>
        <NewUsers
          setUser={this.setUser}
          isUsers={this.isUsers}
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

  logout = (event) => {
      this.setState({isLoggedIn: false})
  }

  userPage() {
    return(
      console.log('woop woop'),
      <UserPage />
    )
  }

  loginLogoutButton(){
    if(this.state.isLoggedIn === true){
      return(
        <button onClick={this.logout}>logout</button>
      )
    }
    else{
      return(
        <button onClick={this.onOpenModal}>login</button>
      )
    }
  }


  render() {
    return (
      <div>
        <header className='header'>
          <nav className='nav'>
            <button onClick={this.logout}>home</button>
            <img src='https://i.imgur.com/DD20Pye.png' alt='investi-questions' className='logo' />
            {this.loginLogoutButton()}
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

