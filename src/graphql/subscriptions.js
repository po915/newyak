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
      email
      phone
      website
      country
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
      email
      phone
      website
      country
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
      email
      phone
      website
      country
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
        email
        phone
        website
        country
        createdAt
        updatedAt
      }
      comments {
        items {
          id
          content
          ownerID
          articleID
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
        email
        phone
        website
        country
        createdAt
        updatedAt
      }
      comments {
        items {
          id
          content
          ownerID
          articleID
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
        email
        phone
        website
        country
        createdAt
        updatedAt
      }
      comments {
        items {
          id
          content
          ownerID
          articleID
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
        email
        phone
        website
        country
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
        email
        phone
        website
        country
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
        email
        phone
        website
        country
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
        email
        phone
        website
        country
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
        email
        phone
        website
        country
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
        email
        phone
        website
        country
        createdAt
        updatedAt
      }
      commentID
      createdAt
      updatedAt
    }
  }
`;
