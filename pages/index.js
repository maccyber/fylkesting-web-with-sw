import React, { Component } from 'react'
import Session from '../components/Session'
import Page from '../components/Page'
import AddForslag from '../components/AddForslag'
import ListMeetings from '../components/ListMeetings'
import Gun from 'gun/gun'
import 'gun/lib/open'

const { HOST_URL } = require('../config')
const gunURL = `${HOST_URL}/gun`
const gun = Gun(gunURL)
const repackMeeting = require('../lib/repack-meeting')

class Admin extends Component {
  constructor (props) {
    super(props)
    this.state = {
      meeting: false,
      updating: false,
      doAddForslag: false,
      adminView: true,
      activeAgendaId: false,
      activeForslagId: false,
      online: true
    }
    this.addForslag = this.addForslag.bind(this)
    this.setNowPlaying = this.setNowPlaying.bind(this)
    this.toggleForslag = this.toggleForslag.bind(this)
    this.toggleShowForslag = this.toggleShowForslag.bind(this)
    this.deleteForslag = this.deleteForslag.bind(this)
  }

  async componentDidMount () {
    gun.get('fylkestinget').open(data => {
      this.setState({meeting: repackMeeting(data)})
    })
    window.addEventListener('online', () => this.setState({ online: true }))
    window.addEventListener('offline', () => this.setState({ online: false }))
  }

  toggleForslag (e) {
    e.preventDefault()
    const newState = !this.state.doAddForslag
    const agendaId = e.target.dataset ? e.target.dataset.agendaItem : false
    const forslagId = e.target.dataset ? e.target.dataset.refId : false
    this.setState({doAddForslag: newState, activeAgendaId: agendaId, activeForslagId: forslagId})
  }

  async toggleShowForslag (e) {
    e.preventDefault()
    const refId = e.target.dataset.refId
    const nowState = e.target.dataset.showState
    const showState = nowState === 'false'
    gun.get('fylkestinget').get('forslag').get(refId).get('show').put(showState)
  }

  async deleteForslag (e) {
    e.preventDefault()
    const refId = e.target.dataset.refId
    gun.get('fylkestinget').get('forslag').get(refId).put(null)
  }

  async setNowPlaying (e) {
    e.preventDefault()
    let nowPlayingId = e.target.dataset.agendaItem
    const agendaNow = e.target.dataset.agendaNow
    if (nowPlayingId === agendaNow) {
      nowPlayingId = false
    }
    gun.get('fylkestinget').put({now: nowPlayingId})
  }

  async addForslag (e) {
    e.preventDefault()
    this.setState({updating: true})
    // Retrieves new data
    const fromField = document.getElementById('from')
    const proposalField = document.getElementById('proposal')
    const agendaId = this.state.activeAgendaId
    const forslagId = this.state.activeForslagId
    const data = {
      agendaId: agendaId,
      from: fromField.value,
      proposal: proposalField.value,
      timeStamp: new Date().getTime(),
      show: false
    }
    // Change data or adds new data
    if (forslagId !== undefined) {
      console.log('Changing forslag')
      gun.get('fylkestinget').get('forslag').get(forslagId).put(data)
    } else {
      console.log('Adding forslag')
      gun.get('fylkestinget').get('forslag').set(data)
    }
    fromField.value = ''
    proposalField.value = ''
    this.setState({updating: false, activeAgendaId: false, activeForslagId: false, doAddForslag: false})
  }

  render () {
    return (
      <Page username={this.props.user ? this.props.user.userPrincipalName : null} online={this.state.online}>
        {this.state.doAddForslag &&
        <AddForslag
          addForslag={this.addForslag}
          meeting={this.state.meeting}
          updating={this.state.updating}
          toggleForslag={this.toggleForslag}
          activeAgendaId={this.state.activeAgendaId}
          activeForslagId={this.state.activeForslagId}
        />
        }
        {!this.state.doAddForslag &&
          <ListMeetings
            meeting={this.state.meeting}
            adminView={this.props.user}
            toggleForslag={this.toggleForslag}
            setNowPlaying={this.setNowPlaying}
            toggleShowForslag={this.toggleShowForslag}
            deleteForslag={this.deleteForslag}
          />
        }
      </Page>
    )
  }
}

export default Session(Admin)
