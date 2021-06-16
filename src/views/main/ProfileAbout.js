import { Card, CardBody, CardText } from 'reactstrap'

const ProfileAbout = ({ data }) => {

  const joinAt = new Date(data.createdAt)

  const time = joinAt.getFullYear() + "-" + joinAt.getMonth()

  return (
    <Card>
      <CardBody>
        <h5 className='mb-75'>About</h5>
        <CardText>{data.bio}</CardText>
        <div className='mt-2'>
          <h5 className='mb-75'>Joined:</h5>
          <CardText>{time}</CardText>
        </div>
        <div className='mt-2'>
          <h5 className='mb-75'>Country:</h5>
          <CardText>{data.country}</CardText>
        </div>
        <div className='mt-2'>
          <h5 className='mb-75'>Email:</h5>
          <CardText>{data.email}</CardText>
        </div>
        <div className='mt-2'>
          <h5 className='mb-75'>Website:</h5>
          <CardText>{data.website}</CardText>
        </div>
        <div className='mt-2'>
          <h5 className='mb-75'>Phone:</h5>
          <CardText>{data.phone}</CardText>
        </div>
      </CardBody>
    </Card>
  )
}

export default ProfileAbout
