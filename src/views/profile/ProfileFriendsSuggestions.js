import classnames from "classnames"
import Avatar from "@components/avatar"
import { UserPlus } from "react-feather"
import { Card, CardBody, Button } from "reactstrap"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { API, graphqlOperation } from "aws-amplify"
import * as queries from "@src/graphql/queries"
import { useHistory } from "react-router-dom"

const ProfileFriendsSuggestions = ({ userinfo }) => {
  const [friends, setFriends] = useState([])

  const history = useHistory()

  useEffect(() => {
    API.graphql(
      graphqlOperation(queries.listContacts, {
        filter: { ownerID: { eq: userinfo.id } },
      })
    ).then((res) => {
      setFriends(res.data.listContacts.items)
    })
  }, [])

  const goToProfile = (id) => {
    history.push("/user/" + id)
  }

  const renderSuggestion = () => {
    return friends.map((friend, index) => {
      return (
        <div
          key={index}
          className={classnames(
            "d-flex justify-content-start align-items-center",
            {
              "mt-2": index === 0,
              "mt-1": index !== 0,
            }
          )}>
          {friend.info?.avatar ? (
            <Avatar
              className="mr-75"
              img={friend.info.avatar}
              imgHeight="40"
              imgWidth="40"
              onClick={()=>goToProfile(friend.info.id)}
            />
          ) : (
            <Avatar
              className="mr-75"
              content={friend.info.name}
              initials
              color="light-primary"
              imgHeight="40"
              imgWidth="40"
              onClick={()=>goToProfile(friend.info.id)}
            />
          )}

          <div className="profile-user-info">
            <h6 className="mb-0">{friend.info.name}</h6>
          </div>
        </div>
      )
    })
  }

  return (
    <Card>
      <CardBody>
        {friends.length > 0 ? renderSuggestion() : <p>There is no Friends yet.</p>}
      </CardBody>
    </Card>
  )
}

export default ProfileFriendsSuggestions
