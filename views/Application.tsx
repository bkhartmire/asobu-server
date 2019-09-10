import React from 'react'
import Main from "./Main"
import Navbar from "../components/Navbar"
import { connect } from 'react-redux'
import localhost from '../environment.js'
import * as WebSocket from 'ws'

interface Socket {
    ws: WebSocket,
    open: boolean,
    connected: boolean
}

class Application extends React.Component<{}, Socket> {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            connected: false,
            ws: new WebSocket(localhost)
        }
        this.state.ws.onopen = () => {
            this.setState({ connected: true })
            console.log('Client Socket Connected')
        }
        this.emit = this.emit.bind(this)
    }
    componentDidMount() {
        this.state.ws.OPEN
    }

    emit() {
        this.setState(prevState => {
            open: true
        })
        if (this.state.connected) {
            this.state.ws.send('Message from client')
        }
        
    }
    render() {
        return (
            <>
                <Main />
                <Navbar />
            </>)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setSocket: ws => {
            dispatch({type: 'SET_SOCKET',
            ws
            })
        }
    }
}

export default connect(null, mapDispatchToProps)(Application)