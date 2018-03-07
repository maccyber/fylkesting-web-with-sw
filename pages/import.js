import React, { Component } from 'react'
import Session from '../components/Session'
import Page from '../components/Page'
import ListMeetings from '../components/ListMeetings'
import AddMeeting from '../components/AddMeeting'
import Gun from 'gun/gun'
import 'gun/lib/open'

const axios = require('axios')
const { HOST_URL } = require('../config')
const gunURL = `${HOST_URL}/gun`
const gun = Gun(gunURL)
const repackMeeting = require('../lib/repack-meeting')

class Import extends Component {
  constructor (props) {
    super(props)
    this.state = {
      meeting: false,
      updating: false,
      doAddMeeting: false
    }
    this.addMeeting = this.addMeeting.bind(this)
    this.cleanUpMeeting = this.cleanUpMeeting.bind(this)
    this.toggleImport = this.toggleImport.bind(this)
  }

  async componentDidMount () {
    gun.get('fylkestinget').open(data => {
      this.setState({meeting: repackMeeting(data)})
    })
  }

  cleanUpMeeting () {
    const meeting = {
      board: null,
      status: null,
      date: null,
      documents: null,
      agenda: null,
      forslag: null,
      now: null
    }
    gun.get('fylkestinget').put(meeting)
  }

  toggleImport () {
    const newState = !this.state.doAddMeeting
    this.setState({doAddMeeting: newState})
  }

  async addMeeting (e) {
    e.preventDefault()
    this.setState({updating: true})
    // Removes data
    this.cleanUpMeeting()
    // Retrieves new data
    const meetingUrlField = document.getElementById('meetingUrl')
    const urlSplit = meetingUrlField.value.split('/')
    const meetingId = urlSplit[urlSplit.length - 1]
    const url = `/api/agenda/${meetingId}`
    const { data } = await axios(url)
    // Adds new data
    gun.get('fylkestinget').put(data)
    meetingUrlField.value = ''
    this.setState({updating: false, doAddMeeting: false})
  }

  render () {
    return (
      <Page username={this.props.user ? this.props.user.userPrincipalName : null}>
        <h1>Importer ny saksliste</h1>
        <AddMeeting addMeeting={this.addMeeting} updating={this.state.updating} toggleImport={this.toggleImport} />
        <ListMeetings meeting={this.state.meeting} />
      </Page>
    )
  }
}

export default Session(Import)
