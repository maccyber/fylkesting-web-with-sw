const monthNames = {
  '01': 'januar',
  '02': 'februar',
  '03': 'mars',
  '04': 'april',
  '05': 'mai',
  '06': 'juni',
  '07': 'juli',
  '08': 'august',
  '09': 'september',
  '10': 'oktober',
  '11': 'november',
  '12': 'desember'
}

function formatDate (date) {
  if (!date) return ''
  const dateList = date.split('.')
  return `${dateList[0]}. ${monthNames[dateList[1]]} ${dateList[2]}`
}

export default ({meeting}) => (
  <div className='meeting-header'>
    <h1>{meeting.board}</h1>
    <div>Dato: {formatDate(meeting.date)}</div>
    <div>Møtested: {meeting.place}</div>
    <div>Status: {meeting.status}</div>
    <style jsx>
      {`
        .meeting-header {
          text-align: left;
          padding: 10px;
          border-radius: 0;
          background-color: #FFF;
          box-shadow: 0 2px 2px 0 rgba(0,0,0,.16), 0 0 2px 0 rgba(0,0,0,.12);
          margin-top: 10px;
        }
      `}
    </style>
  </div>
)
