function objectToArray (data) {
  let list = data ? Object.keys(data).map(key => Object.assign({}, data[key], {refId: key})) : []
  let final = []
  list.sort(sortAgenda)
  list.forEach(item => {
    if (item.title && item.title.startsWith('Møteinnkalling')) {
      final.unshift(item)
    } else if (item.title && item.title.startsWith('Godkjenning - Møteprotokoll')) {
      final.unshift(item)
    } else {
      final.push(item)
    }
  })
  return final
}

function sortAgenda (a, b) {
  if (a.agendanumber && b.agendanumber) {
    return parseInt(a.agendanumber, 10) > parseInt(b.agendanumber, 10)
  } else {
    return a > b
  }
}

module.exports = data => {
  const snowflakes = ['agenda', 'documents', 'forslag']
  let meeting = {}
  Object.keys(data).filter(key => !['_', '#'].includes(key)).map(key => {
    meeting[key] = !snowflakes.includes(key) ? data[key] : objectToArray(data[key])
  })
  return meeting
}
