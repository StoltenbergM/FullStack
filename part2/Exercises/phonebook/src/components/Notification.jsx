const Notification = ({ message, errorNotification }) => {
  const notificationStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: '10px',
    marginBottom: '10px'
}
  if (errorNotification) { // when the error is true it becomes red
    notificationStyle.color = 'red'
  }

  if (message === null) {
    return null
  }

  return (
    <div style={notificationStyle}>
      {message}
    </div>
  )
}

export default Notification