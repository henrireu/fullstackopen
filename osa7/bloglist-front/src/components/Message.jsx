import { useSelector } from 'react-redux'

const Message = () => {
  const message = useSelector((state) => state.message)

  if(message.message) {
    if(message.color === 'green') {
      return (
        <h2 className='message'>{message.message}</h2>
      )
    }
    if(message.color === 'red') {
      return (
        <h2 className='errormessage'>{message.message}</h2>
      )
    }
  }
}

export default Message