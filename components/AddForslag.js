import { COLORS } from '../config'
import Button from './Button'

function getAgendaTitle (meeting, activeAgendaId) {
  let title
  if (meeting && meeting.agenda && activeAgendaId) {
    const agenda = meeting.agenda.find(item => item.id === activeAgendaId)
    title = `${agenda.agendanumber} - ${agenda.title}`
  }
  return (<h1>{title}</h1>)
}

function getForslagData (meeting, activeForslagId, field) {
  let data = ''
  if (meeting && meeting.forslag && activeForslagId) {
    const forslag = meeting.forslag.find(item => item.refId === activeForslagId)
    data = forslag[field]
  }
  return data
}

export default ({addForslag, meeting, updating, toggleForslag, activeAgendaId, activeForslagId}) => (
  <form onSubmit={addForslag}>
    {getAgendaTitle(meeting, activeAgendaId)}
    <input type='text' id='from' placeholder='Forslagsstiller' defaultValue={getForslagData(meeting, activeForslagId, 'from')} required />
    <textarea id='proposal' placeholder='Forslagstekst' defaultValue={getForslagData(meeting, activeForslagId, 'proposal')} required />
    <div>
      <Button onClick={toggleForslag} backgroundColor={COLORS.secondary} value='Avbryt' />
      <Button type='submit' backgroundColor={COLORS.secondary} value={activeForslagId !== false ? 'Lagre' : 'Legg til'} />
    </div>
    <style jsx>
      {`
        input {
          width: 80%;
          height: 40px;
          margin: 10px;
          font-size: 20px;
        }

        input:focus {
          outline:0;
        }

        input:active {
          outline: 0;
        }

        textarea {
          width: 80%;
          height: 200px;
          margin: 10px;
          font-size: 20px;
          clear: both;
        }

        textarea:focus {
          outline:0;
        }

        textarea:active {
          outline: 0;
        }
      `}
    </style>
  </form>
)
