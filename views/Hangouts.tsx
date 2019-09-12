import React from 'react'
import { View, Text, Image, StyleSheet, Button, TouchableOpacity, ScrollView } from 'react-native'
import UserList from '../components/UserList'
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux'
import Modal from 'react-native-modal'
import { postHangoutAccept } from '../src/actions/userActions'

interface UserLimited {
  first_name: string
  email: string
  profile_photo: string
}

interface Props {
  receivedHangoutRequests: Array<UserLimited>
  acceptRequest: Function
  currentUserEmail: string
}

class Hangouts extends React.Component<Props> {
  state = {
    modalVisible: this.props.receivedHangoutRequests.length > 0
  }
  handlePress = async fromEmail => {
    const res = await postHangoutAccept(this.props.currentUserEmail, fromEmail)
    if (res.status === 200) {
      this.props.acceptRequest(fromEmail, res.data.data.AcceptHangoutRequest)
    }
  }
  render() {
    return (
      <View style={styles.userList}>
        <UserList />
        <Modal
          isVisible={this.state.modalVisible}
          animationIn="slideInUp"
          animationOut="slideOutDown"
          backdropOpacity={0.85}
          style={styles.modal}
        >
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>
              Other users would like to hangout with you!
            </Text>
            <ScrollView>
              {this.props.receivedHangoutRequests.map((request, index) => {
                return (
                  <View style={styles.request} key={index}>
                    <Image
                      source={{ uri: request.profile_photo }}
                      style={styles.user__image}
                    />
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", flex: 1 }}>
                      <Text style={styles.user__name}>{request.first_name}</Text>
                      <TouchableOpacity onPress={() => this.handlePress(request.email)} style={styles.accept__button}>
                        <Ionicons name="md-checkmark" size={32} color="white" />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => console.log("Decline")} style={styles.decline__button}>
                        <Ionicons name="md-close" size={32} color="white" />
                      </TouchableOpacity>
                    </View>
                  </View>
                )
              })}
            </ScrollView>
            <View>
              <Button
                title="Close"
                onPress={() => this.setState({ modalVisible: false })}
              />
            </View>
          </View>
        </Modal>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  userList: {
    top: 40
  },
  modal: {
    height: '50%',
    textAlign: 'center'
  },
  title: {
    color: 'white',
    fontSize: 30,
    textAlign: 'center',
    margin: 10
  },
  request: {
    flexDirection: 'row',
    margin: 10
  },
  user__image: {
    borderRadius: 50,
    height: 90,
    width: 90
  },
  user__name: {
    color: 'white',
    fontSize: 40,
    marginLeft: 10
  },
  accept__button: {
    width: 50,
    height: 50,
    backgroundColor: "green",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center"
  },
  decline__button: {
    width: 50,
    height: 50,
    backgroundColor: "red",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center"
  },
  close: {
    textAlign: 'right',
    right: 0,
    position: 'absolute',
    bottom: 0
  }
})

const mapStateToProps = state => {
  return {
    receivedHangoutRequests: state.receivedHangoutRequests,
    currentUserEmail: state.user.email
  }
}
const mapDispatchToProps = dispatch => {
  return {
    acceptRequest: (fromUserEmail, newChat) => {
      dispatch({ type: 'ACCEPT_REQUEST', fromUserEmail, newChat })
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Hangouts)
