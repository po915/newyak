/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUserinfo = /* GraphQL */ `
  mutation CreateUserinfo(
    $input: CreateUserinfoInput!
    $condition: ModelUserinfoConditionInput
  ) {
    createUserinfo(input: $input, condition: $condition) {
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
      createdAt
      updatedAt
    }
  }
`;
export const updateUserinfo = /* GraphQL */ `
  mutation UpdateUserinfo(
    $input: UpdateUserinfoInput!
    $condition: ModelUserinfoConditionInput
  ) {
    updateUserinfo(input: $input, condition: $condition) {
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
      createdAt
      updatedAt
    }
  }
`;
export const deleteUserinfo = /* GraphQL */ `
  mutation DeleteUserinfo(
    $input: DeleteUserinfoInput!
    $condition: ModelUserinfoConditionInput
  ) {
    deleteUserinfo(input: $input, condition: $condition) {
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
      createdAt
      updatedAt
    }
  }
`;
export const createFriend = /* GraphQL */ `
  mutation CreateFriend(
    $input: CreateFriendInput!
    $condition: ModelFriendConditionInput
  ) {
    createFriend(input: $input, condition: $condition) {
      id
      selfID
      friendID
      friend {
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
        createdAt
        updatedAt
      }
      status
      createdAt
      updatedAt
    }
  }
`;
export const updateFriend = /* GraphQL */ `
  mutation UpdateFriend(
    $input: UpdateFriendInput!
    $condition: ModelFriendConditionInput
  ) {
    updateFriend(input: $input, condition: $condition) {
      id
      selfID
      friendID
      friend {
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
        createdAt
        updatedAt
      }
      status
      createdAt
      updatedAt
    }
  }
`;
export const deleteFriend = /* GraphQL */ `
  mutation DeleteFriend(
    $input: DeleteFriendInput!
    $condition: ModelFriendConditionInput
  ) {
    deleteFriend(input: $input, condition: $condition) {
      id
      selfID
      friendID
      friend {
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
        createdAt
        updatedAt
      }
      status
      createdAt
      updatedAt
    }
  }
`;
export const createItem = /* GraphQL */ `
  mutation CreateItem(
    $input: CreateItemInput!
    $condition: ModelItemConditionInput
  ) {
    createItem(input: $input, condition: $condition) {
      id
      ownerID
      title
      description
      content
      status
      createdAt
      updatedAt
    }
  }
`;
export const updateItem = /* GraphQL */ `
  mutation UpdateItem(
    $input: UpdateItemInput!
    $condition: ModelItemConditionInput
  ) {
    updateItem(input: $input, condition: $condition) {
      id
      ownerID
      title
      description
      content
      status
      createdAt
      updatedAt
    }
  }
`;
export const deleteItem = /* GraphQL */ `
  mutation DeleteItem(
    $input: DeleteItemInput!
    $condition: ModelItemConditionInput
  ) {
    deleteItem(input: $input, condition: $condition) {
      id
      ownerID
      title
      description
      content
      status
      createdAt
      updatedAt
    }
  }
`;
export const createArticle = /* GraphQL */ `
  mutation CreateArticle(
    $input: CreateArticleInput!
    $condition: ModelArticleConditionInput
  ) {
    createArticle(input: $input, condition: $condition) {
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
export const updateArticle = /* GraphQL */ `
  mutation UpdateArticle(
    $input: UpdateArticleInput!
    $condition: ModelArticleConditionInput
  ) {
    updateArticle(input: $input, condition: $condition) {
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
export const deleteArticle = /* GraphQL */ `
  mutation DeleteArticle(
    $input: DeleteArticleInput!
    $condition: ModelArticleConditionInput
  ) {
    deleteArticle(input: $input, condition: $condition) {
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
export const createComment = /* GraphQL */ `
  mutation CreateComment(
    $input: CreateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    createComment(input: $input, condition: $condition) {
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
export const updateComment = /* GraphQL */ `
  mutation UpdateComment(
    $input: UpdateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    updateComment(input: $input, condition: $condition) {
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
export const deleteComment = /* GraphQL */ `
  mutation DeleteComment(
    $input: DeleteCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    deleteComment(input: $input, condition: $condition) {
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
export const createReply = /* GraphQL */ `
  mutation CreateReply(
    $input: CreateReplyInput!
    $condition: ModelReplyConditionInput
  ) {
    createReply(input: $input, condition: $condition) {
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
        createdAt
        updatedAt
      }
      commentID
      createdAt
      updatedAt
    }
  }
`;
export const updateReply = /* GraphQL */ `
  mutation UpdateReply(
    $input: UpdateReplyInput!
    $condition: ModelReplyConditionInput
  ) {
    updateReply(input: $input, condition: $condition) {
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
        createdAt
        updatedAt
      }
      commentID
      createdAt
      updatedAt
    }
  }
`;
export const deleteReply = /* GraphQL */ `
  mutation DeleteReply(
    $input: DeleteReplyInput!
    $condition: ModelReplyConditionInput
  ) {
    deleteReply(input: $input, condition: $condition) {
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
        createdAt
        updatedAt
      }
      commentID
      createdAt
      updatedAt
    }
  }
`;
