import React, { Component } from 'react'
import { View, Button, Text, Image, StyleSheet, TextInput } from 'react-native'
import { connect } from 'react-redux'
import axios from 'axios'
import { any } from 'prop-types'
import getApiUrl from '../environment.js'
import Profile from './Profile'
import Results from './Results'
import Inbox from './Inbox'

interface Props {
  toggleView: Function
  setAllUsers: Function
  activeView: String
}

class Main extends Component<Props> {
  async componentDidMount() {
    const res = await axios.post(`${getApiUrl()}/graphql`, {
      query: `
            query { Users {
                id
                first_name
                email
                profile_photo
                interests
                exp
                lvl
                }
            }
        `
    })
    this.props.setAllUsers(res.data.data.Users)
  }
  //Users = res.data.data.Users

  render() {
    let mainView

    if (this.props.activeView === 'profile') {
      mainView = <Profile />
    } else if (this.props.activeView === 'results') {
      mainView = <Results />
    } else if (this.props.activeView === 'chats') {
      mainView = <Inbox />
    }
    return <View style={styles.main}>{mainView}</View>
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 11,
    backgroundColor: 'white'
  }
})

const mapStateToProps = state => {
  return {
    activeView: state.activeView,
    allUsers: state.allUsers
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setActiveView: activeView => {
      dispatch({
        type: 'SET_ACTIVE_VIEW',
        activeView: activeView
      })
    },
    setAllUsers: allUsers => {
      dispatch({
        type: 'SET_ALL_USERS',
        allUsers: allUsers
      })
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main)
