import ForslagItem from './ForslagItem'

function getForslag (meeting, item, adminView) {
  let forslag = []
  if (meeting && meeting.forslag && item) {
    const filteredForslag = meeting.forslag.filter(forslag => forslag.agendaId === item.id)
    forslag = adminView ? filteredForslag : filteredForslag.filter(forslag => !!forslag.show)
  }
  return forslag
}

export default ({ meeting, item, adminView, toggleShowForslag, deleteForslag, toggleForslag, large }) => (
  <div>
    {
      getForslag(meeting, item, adminView).map((forslag, index) =>
        <ForslagItem
          data={forslag}
          key={index}
          index={index}
          adminView={adminView}
          toggleShowForslag={toggleShowForslag}
          deleteForslag={deleteForslag}
          toggleForslag={toggleForslag}
          large={large}
        />
      )
    }
  </div>
)
