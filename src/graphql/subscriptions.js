/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUserinfo = /* GraphQL */ `
  subscription OnCreateUserinfo {
    onCreateUserinfo {
      id
      name
      gender
      dob
      bio
      avatar
      banner
      email
      phone
      website
      country
      status
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateUserinfo = /* GraphQL */ `
  subscription OnUpdateUserinfo {
    onUpdateUserinfo {
      id
      name
      gender
      dob
      bio
      avatar
      banner
      email
      phone
      website
      country
      status
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteUserinfo = /* GraphQL */ `
  subscription OnDeleteUserinfo {
    onDeleteUserinfo {
      id
      name
      gender
      dob
      bio
      avatar
      banner
      email
      phone
      website
      country
      status
      createdAt
      updatedAt
    }
  }
`;
export const onCreateContact = /* GraphQL */ `
  subscription OnCreateContact {
    onCreateContact {
      id
      ownerID
      friendID
      info {
        id
        name
        gender
        dob
        bio
        avatar
        banner
        email
        phone
        website
        country
        status
        createdAt
        updatedAt
      }
      accepted
      blocked
      unseenMsgs
      chats {
        items {
          id
          contactID
          message
          createdAt
          senderID
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateContact = /* GraphQL */ `
  subscription OnUpdateContact {
    onUpdateContact {
      id
      ownerID
      friendID
      info {
        id
        name
        gender
        dob
        bio
        avatar
        banner
        email
        phone
        website
        country
        status
        createdAt
        updatedAt
      }
      accepted
      blocked
      unseenMsgs
      chats {
        items {
          id
          contactID
          message
          createdAt
          senderID
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteContact = /* GraphQL */ `
  subscription OnDeleteContact {
    onDeleteContact {
      id
      ownerID
      friendID
      info {
        id
        name
        gender
        dob
        bio
        avatar
        banner
        email
        phone
        website
        country
        status
        createdAt
        updatedAt
      }
      accepted
      blocked
      unseenMsgs
      chats {
        items {
          id
          contactID
          message
          createdAt
          senderID
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateChat = /* GraphQL */ `
  subscription OnCreateChat {
    onCreateChat {
      id
      contactID
      message
      createdAt
      senderID
      updatedAt
    }
  }
`;
export const onUpdateChat = /* GraphQL */ `
  subscription OnUpdateChat {
    onUpdateChat {
      id
      contactID
      message
      createdAt
      senderID
      updatedAt
    }
  }
`;
export const onDeleteChat = /* GraphQL */ `
  subscription OnDeleteChat {
    onDeleteChat {
      id
      contactID
      message
      createdAt
      senderID
      updatedAt
    }
  }
`;
export const onCreateMedia = /* GraphQL */ `
  subscription OnCreateMedia {
    onCreateMedia {
      id
      ownerID
      title
      type
      status
      url
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateMedia = /* GraphQL */ `
  subscription OnUpdateMedia {
    onUpdateMedia {
      id
      ownerID
      title
      type
      status
      url
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteMedia = /* GraphQL */ `
  subscription OnDeleteMedia {
    onDeleteMedia {
      id
      ownerID
      title
      type
      status
      url
      createdAt
      updatedAt
    }
  }
`;
export const onCreateArticle = /* GraphQL */ `
  subscription OnCreateArticle {
    onCreateArticle {
      id
      title
      content
      coverImg
      likes
      dislikes
      status
      ownerID
      owner {
        id
        name
        gender
        dob
        bio
        avatar
        banner
        email
        phone
        website
        country
        status
        createdAt
        updatedAt
      }
      comments {
        items {
          id
          content
          ownerID
          owner {
            id
            name
            gender
            dob
            bio
            avatar
            banner
            email
            phone
            website
            country
            status
            createdAt
            updatedAt
          }
          articleID
          replys {
            items {
              id
              content
              ownerID
              commentID
              createdAt
              updatedAt
            }
            nextToken
          }
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateArticle = /* GraphQL */ `
  subscription OnUpdateArticle {
    onUpdateArticle {
      id
      title
      content
      coverImg
      likes
      dislikes
      status
      ownerID
      owner {
        id
        name
        gender
        dob
        bio
        avatar
        banner
        email
        phone
        website
        country
        status
        createdAt
        updatedAt
      }
      comments {
        items {
          id
          content
          ownerID
          owner {
            id
            name
            gender
            dob
            bio
            avatar
            banner
            email
            phone
            website
            country
            status
            createdAt
            updatedAt
          }
          articleID
          replys {
            items {
              id
              content
              ownerID
              commentID
              createdAt
              updatedAt
            }
            nextToken
          }
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteArticle = /* GraphQL */ `
  subscription OnDeleteArticle {
    onDeleteArticle {
      id
      title
      content
      coverImg
      likes
      dislikes
      status
      ownerID
      owner {
        id
        name
        gender
        dob
        bio
        avatar
        banner
        email
        phone
        website
        country
        status
        createdAt
        updatedAt
      }
      comments {
        items {
          id
          content
          ownerID
          owner {
            id
            name
            gender
            dob
            bio
            avatar
            banner
            email
            phone
            website
            country
            status
            createdAt
            updatedAt
          }
          articleID
          replys {
            items {
              id
              content
              ownerID
              commentID
              createdAt
              updatedAt
            }
            nextToken
          }
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment {
    onCreateComment {
      id
      content
      ownerID
      owner {
        id
        name
        gender
        dob
        bio
        avatar
        banner
        email
        phone
        website
        country
        status
        createdAt
        updatedAt
      }
      articleID
      replys {
        items {
          id
          content
          ownerID
          owner {
            id
            name
            gender
            dob
            bio
            avatar
            banner
            email
            phone
            website
            country
            status
            createdAt
            updatedAt
          }
          commentID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment {
    onUpdateComment {
      id
      content
      ownerID
      owner {
        id
        name
        gender
        dob
        bio
        avatar
        banner
        email
        phone
        website
        country
        status
        createdAt
        updatedAt
      }
      articleID
      replys {
        items {
          id
          content
          ownerID
          owner {
            id
            name
            gender
            dob
            bio
            avatar
            banner
            email
            phone
            website
            country
            status
            createdAt
            updatedAt
          }
          commentID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment {
    onDeleteComment {
      id
      content
      ownerID
      owner {
        id
        name
        gender
        dob
        bio
        avatar
        banner
        email
        phone
        website
        country
        status
        createdAt
        updatedAt
      }
      articleID
      replys {
        items {
          id
          content
          ownerID
          owner {
            id
            name
            gender
            dob
            bio
            avatar
            banner
            email
            phone
            website
            country
            status
            createdAt
            updatedAt
          }
          commentID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateReply = /* GraphQL */ `
  subscription OnCreateReply {
    onCreateReply {
      id
      content
      ownerID
      owner {
        id
        name
        gender
        dob
        bio
        avatar
        banner
        email
        phone
        website
        country
        status
        createdAt
        updatedAt
      }
      commentID
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateReply = /* GraphQL */ `
  subscription OnUpdateReply {
    onUpdateReply {
      id
      content
      ownerID
      owner {
        id
        name
        gender
        dob
        bio
        avatar
        banner
        email
        phone
        website
        country
        status
        createdAt
        updatedAt
      }
      commentID
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteReply = /* GraphQL */ `
  subscription OnDeleteReply {
    onDeleteReply {
      id
      content
      ownerID
      owner {
        id
        name
        gender
        dob
        bio
        avatar
        banner
        email
        phone
        website
        country
        status
        createdAt
        updatedAt
      }
      commentID
      createdAt
      updatedAt
    }
  }
`;
