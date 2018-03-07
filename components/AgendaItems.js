import AgendaItem from './AgendaItem'

export default ({ meeting, adminView, toggleForslag, setNowPlaying, toggleShowForslag, deleteForslag }) => (
  meeting && meeting.agenda &&
  meeting.agenda.map(item =>
    <AgendaItem
      meeting={meeting}
      item={item}
      adminView={adminView}
      toggleForslag={toggleForslag}
      setNowPlaying={setNowPlaying}
      toggleShowForslag={toggleShowForslag}
      deleteForslag={deleteForslag}
      key={item.refId}
    />
  )
)
