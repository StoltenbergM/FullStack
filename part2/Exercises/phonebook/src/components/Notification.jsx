const Notification = ({ message }) => {
  const notificationStyle = {
    color: 'green',
    background: 'lightgrey',
    fontStyle: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: '10px',
    marginBottom: '10px'
}
  if (message === null) {
    return null
  }

  return (
    <div className='error' style={notificationStyle}>
      {message}
    </div>
  )
}

export default Notification