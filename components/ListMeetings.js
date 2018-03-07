import MeetingHeader from './MeetingHeader'
import AgendaItems from './AgendaItems'

export default ({ meeting, adminView, toggleForslag, setNowPlaying, toggleShowForslag, deleteForslag }) => (
  meeting
    ? <div>
      <MeetingHeader meeting={meeting} />
      <AgendaItems
        meeting={meeting}
        adminView={adminView}
        toggleForslag={toggleForslag}
        setNowPlaying={setNowPlaying}
        toggleShowForslag={toggleShowForslag}
        deleteForslag={deleteForslag}
      />
    </div>
    : 'Ingen møter er registrert'
)
