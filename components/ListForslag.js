import AgendaItem from './AgendaItem'

function repackForslag (meeting) {
  if (meeting.agenda && meeting.forslag) {
    const agenda = meeting.agenda.map(agenda => {
      const forslag = meeting.forslag.filter(forslag => forslag.agendaId === agenda.id && forslag.show === true)
      return Object.assign({}, agenda, {forslag: forslag})
    })
    const filteredAgenda = agenda.filter(agenda => agenda.forslag.length > 0)
    return filteredAgenda
  } else {
    return []
  }
}

export default ({ meeting }) => (
  <div>
    <h1>Oversikt over innkommede forslag</h1>
    {meeting && meeting.agenda && meeting.forslag
      ? repackForslag(meeting).map(item => <AgendaItem meeting={meeting} item={item} />)
      : 'Det er ikke registrert noen forslag ennå'}
  </div>
)
