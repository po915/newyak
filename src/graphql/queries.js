/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUserinfo = /* GraphQL */ `
  query GetUserinfo($id: ID!) {
    getUserinfo(id: $id) {
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
export const listUserinfos = /* GraphQL */ `
  query ListUserinfos(
    $filter: ModelUserinfoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserinfos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getContact = /* GraphQL */ `
  query GetContact($id: ID!) {
    getContact(id: $id) {
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
export const listContacts = /* GraphQL */ `
  query ListContacts(
    $filter: ModelContactFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listContacts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getChat = /* GraphQL */ `
  query GetChat($id: ID!) {
    getChat(id: $id) {
      id
      contactID
      message
      createdAt
      senderID
      updatedAt
    }
  }
`;
export const listChats = /* GraphQL */ `
  query ListChats(
    $filter: ModelChatFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listChats(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
  }
`;
export const getMedia = /* GraphQL */ `
  query GetMedia($id: ID!) {
    getMedia(id: $id) {
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
export const listMedias = /* GraphQL */ `
  query ListMedias(
    $filter: ModelMediaFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMedias(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        ownerID
        title
        type
        status
        url
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getArticle = /* GraphQL */ `
  query GetArticle($id: ID!) {
    getArticle(id: $id) {
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
export const listArticles = /* GraphQL */ `
  query ListArticles(
    $filter: ModelArticleFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listArticles(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getComment = /* GraphQL */ `
  query GetComment($id: ID!) {
    getComment(id: $id) {
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
export const listComments = /* GraphQL */ `
  query ListComments(
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
      nextToken
    }
  }
`;
export const getReply = /* GraphQL */ `
  query GetReply($id: ID!) {
    getReply(id: $id) {
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
export const listReplys = /* GraphQL */ `
  query ListReplys(
    $filter: ModelReplyFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listReplys(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
  }
`;
export const contactByUser = /* GraphQL */ `
  query ContactByUser(
    $ownerID: ID
    $sortDirection: ModelSortDirection
    $filter: ModelContactFilterInput
    $limit: Int
    $nextToken: String
  ) {
    contactByUser(
      ownerID: $ownerID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const chatByContact = /* GraphQL */ `
  query ChatByContact(
    $contactID: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelChatFilterInput
    $limit: Int
    $nextToken: String
  ) {
    chatByContact(
      contactID: $contactID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
  }
`;
export const mediaByOwner = /* GraphQL */ `
  query MediaByOwner(
    $ownerID: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelMediaFilterInput
    $limit: Int
    $nextToken: String
  ) {
    mediaByOwner(
      ownerID: $ownerID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        ownerID
        title
        type
        status
        url
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const articleByOwner = /* GraphQL */ `
  query ArticleByOwner(
    $ownerID: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelArticleFilterInput
    $limit: Int
    $nextToken: String
  ) {
    articleByOwner(
      ownerID: $ownerID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const articleByStatus = /* GraphQL */ `
  query ArticleByStatus(
    $status: String
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelArticleFilterInput
    $limit: Int
    $nextToken: String
  ) {
    articleByStatus(
      status: $status
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const commentByArticle = /* GraphQL */ `
  query CommentByArticle(
    $articleID: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    commentByArticle(
      articleID: $articleID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
      nextToken
    }
  }
`;
export const replyByComment = /* GraphQL */ `
  query ReplyByComment(
    $commentID: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelReplyFilterInput
    $limit: Int
    $nextToken: String
  ) {
    replyByComment(
      commentID: $commentID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
  }
`;
export const searchUserinfos = /* GraphQL */ `
  query SearchUserinfos(
    $filter: SearchableUserinfoFilterInput
    $sort: SearchableUserinfoSortInput
    $limit: Int
    $nextToken: String
    $from: Int
  ) {
    searchUserinfos(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
    ) {
      items {
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
      nextToken
      total
    }
  }
`;
