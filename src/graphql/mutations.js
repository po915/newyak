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
export const createMediaGroup = /* GraphQL */ `
  mutation CreateMediaGroup(
    $input: CreateMediaGroupInput!
    $condition: ModelMediaGroupConditionInput
  ) {
    createMediaGroup(input: $input, condition: $condition) {
      id
      ownerID
      title
      memo
      status
      medias {
        items {
          id
          groupID
          type
          path
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
export const updateMediaGroup = /* GraphQL */ `
  mutation UpdateMediaGroup(
    $input: UpdateMediaGroupInput!
    $condition: ModelMediaGroupConditionInput
  ) {
    updateMediaGroup(input: $input, condition: $condition) {
      id
      ownerID
      title
      memo
      status
      medias {
        items {
          id
          groupID
          type
          path
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
export const deleteMediaGroup = /* GraphQL */ `
  mutation DeleteMediaGroup(
    $input: DeleteMediaGroupInput!
    $condition: ModelMediaGroupConditionInput
  ) {
    deleteMediaGroup(input: $input, condition: $condition) {
      id
      ownerID
      title
      memo
      status
      medias {
        items {
          id
          groupID
          type
          path
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
export const createMedia = /* GraphQL */ `
  mutation CreateMedia(
    $input: CreateMediaInput!
    $condition: ModelMediaConditionInput
  ) {
    createMedia(input: $input, condition: $condition) {
      id
      groupID
      type
      path
      createdAt
      updatedAt
    }
  }
`;
export const updateMedia = /* GraphQL */ `
  mutation UpdateMedia(
    $input: UpdateMediaInput!
    $condition: ModelMediaConditionInput
  ) {
    updateMedia(input: $input, condition: $condition) {
      id
      groupID
      type
      path
      createdAt
      updatedAt
    }
  }
`;
export const deleteMedia = /* GraphQL */ `
  mutation DeleteMedia(
    $input: DeleteMediaInput!
    $condition: ModelMediaConditionInput
  ) {
    deleteMedia(input: $input, condition: $condition) {
      id
      groupID
      type
      path
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
