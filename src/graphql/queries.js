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
      email
      phone
      website
      country
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
        email
        phone
        website
        country
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
          email
          phone
          website
          country
          createdAt
          updatedAt
        }
        comments {
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
          email
          phone
          website
          country
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
          email
          phone
          website
          country
          createdAt
          updatedAt
        }
        comments {
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
          email
          phone
          website
          country
          createdAt
          updatedAt
        }
        comments {
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
          email
          phone
          website
          country
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
  }
`;
export const replyByPost = /* GraphQL */ `
  query ReplyByPost(
    $commentID: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelReplyFilterInput
    $limit: Int
    $nextToken: String
  ) {
    replyByPost(
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
        email
        phone
        website
        country
        createdAt
        updatedAt
      }
      nextToken
      total
    }
  }
`;
export const searchArticles = /* GraphQL */ `
  query SearchArticles(
    $filter: SearchableArticleFilterInput
    $sort: SearchableArticleSortInput
    $limit: Int
    $nextToken: String
    $from: Int
  ) {
    searchArticles(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
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
          email
          phone
          website
          country
          createdAt
          updatedAt
        }
        comments {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
      total
    }
  }
`;
