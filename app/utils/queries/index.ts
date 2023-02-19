import { gql } from "@apollo/client";

export const GET_ALL_CATEGORIES = gql`
  query MyQuery {
    categories {
      id
      name
      created_at
      updated_at
      user_category {
        id
        name
      }
    }
  }
`;

export const CREATE_USER_CATEGORIES = gql`
  mutation insertUserCategories($data: [UserOnCategories_insert_input!]!) {
    insert_UserOnCategories(objects: $data) {
      returning {
        user_id
      }
    }
  }
`;

export const GET_POSTS = gql`
  query GetPosts($offset: Int, $limit: Int) {
    posts_aggregate {
      aggregate {
        count
      }
    }
    posts(order_by: { created_at: desc }, offset: $offset, limit: $limit) {
      content
      id
      created_at
      updated_at
      original_post {
        title
        content
        created_at
        updated_at
        CategoryOnPosts {
          category {
            id
            name
          }
        }
        user {
          name
          image
          id
        }
        images {
          created_at
          id
          link
        }
      }
      images {
        created_at
        id
        link
      }
      likes_aggregate {
        aggregate {
          count
        }
      }
      shares_aggregate {
        aggregate {
          count
        }
      }
      comments_aggregate {
        aggregate {
          count
        }
      }
      user {
        id
        name
        image
      }
      videos {
        created_at
        id
        link
      }
      comments(order_by: { created_at: desc }, limit: 10) {
        id
        text
        parent_comment_id
        user {
          name
          image
          id
        }
        created_at
      }
      CategoryOnPosts {
        category {
          id
          name
        }
      }
    }
  }
`;

export const GET_DIGITAL_POSTS = gql`
  query GetDigitalPosts($offset: Int, $limit: Int) {
    posts_aggregate(where: { type: { _eq: "DIGITAL" } }) {
      aggregate {
        count
      }
    }
    posts(
      where: { type: { _eq: "DIGITAL" } }
      order_by: { created_at: desc }
      offset: $offset
      limit: $limit
    ) {
      content
      id
      created_at
      updated_at
      original_post {
        title
        content
        created_at
        updated_at
        CategoryOnPosts {
          category {
            id
            name
          }
        }
        user {
          name
          image
          id
        }
        images {
          created_at
          id
          link
        }
      }
      images {
        created_at
        id
        link
      }
      likes_aggregate {
        aggregate {
          count
        }
      }
      shares_aggregate {
        aggregate {
          count
        }
      }
      comments_aggregate {
        aggregate {
          count
        }
      }
      user {
        id
        name
        image
      }
      videos {
        created_at
        id
        link
      }
      comments(order_by: { created_at: desc }, limit: 10) {
        id
        text
        parent_comment_id
        user {
          name
          image
          id
        }
        created_at
      }
      CategoryOnPosts {
        category {
          id
          name
        }
      }
    }
  }
`;

export const GET_USER_POSTS = gql`
  query GetUserPosts($offset: Int, $limit: Int, $userId: String) {
    posts_aggregate(where: { user_id: { _eq: $userId } }) {
      aggregate {
        count
      }
    }
    posts(
      where: { user_id: { _eq: $userId } }
      order_by: { created_at: desc }
      offset: $offset
      limit: $limit
    ) {
      content
      id
      created_at
      updated_at
      original_post {
        title
        content
        created_at
        updated_at
        CategoryOnPosts {
          category {
            id
            name
          }
        }
        user {
          name
          image
          id
        }
        images {
          created_at
          id
          link
        }
      }
      images {
        created_at
        id
        link
      }
      likes_aggregate {
        aggregate {
          count
        }
      }
      shares_aggregate {
        aggregate {
          count
        }
      }
      comments_aggregate {
        aggregate {
          count
        }
      }
      user {
        id
        name
        image
      }
      videos {
        created_at
        id
        link
      }
      comments(order_by: { created_at: desc }, limit: 10) {
        id
        text
        parent_comment_id
        user {
          name
          image
          id
        }
        created_at
      }
      CategoryOnPosts {
        category {
          id
          name
        }
      }
    }
  }
`;

export const CREATE_POST_WITH_FILE = gql`
  mutation createPostWithFile(
    $title: String
    $content: String
    $file: String
    $type: String
  ) {
    insert_posts_one(
      object: {
        type: $type
        title: $title
        content: $content
        images: { data: [{ link: $file }] }
      }
    ) {
      content
      id
      created_at
      updated_at
      original_post {
        title
        content
        user {
          name
          image
          id
        }
        images {
          created_at
          id
          link
        }
      }
      images {
        created_at
        id
        link
      }
      likes_aggregate {
        aggregate {
          count
        }
      }
      shares_aggregate {
        aggregate {
          count
        }
      }
      comments_aggregate {
        aggregate {
          count
        }
      }
      user {
        id
        name
        image
      }
      videos {
        created_at
        id
        link
      }
      comments(order_by: { created_at: desc }, limit: 10) {
        id
        text
        parent_comment_id
        user {
          id
          name
          image
        }
        created_at
      }
      CategoryOnPosts {
        category {
          id
          name
        }
      }
    }
  }
`;
export const CREATE_POST = gql`
  mutation createPost($title: String, $content: String, $type: String) {
    insert_posts_one(
      object: { type: $type, title: $title, content: $content }
    ) {
      content
      id
      created_at
      updated_at
      original_post {
        title
        content
        user {
          name
          image
          id
        }
        images {
          created_at
          id
          link
        }
      }
      images {
        created_at
        id
        link
      }
      likes_aggregate {
        aggregate {
          count
        }
      }
      shares_aggregate {
        aggregate {
          count
        }
      }
      comments_aggregate {
        aggregate {
          count
        }
      }
      user {
        id
        name
        image
      }
      videos {
        created_at
        id
        link
      }
      comments(order_by: { created_at: desc }, limit: 10) {
        id
        text
        parent_comment_id
        user {
          id
          name
          image
        }
        created_at
      }
      CategoryOnPosts {
        category {
          id
          name
        }
      }
    }
  }
`;

export const CREATE_SHARED_POST = gql`
  mutation createSharedPost(
    $title: String
    $content: String
    $original_post_id: String
    $type: String
  ) {
    insert_posts_one(
      object: {
        type: $type
        title: $title
        original_post_id: $original_post_id
        content: $content
      }
    ) {
      created_at
      updated_at
      id
      content

      original_post {
        title
        content
        created_at
        updated_at
        CategoryOnPosts {
          category {
            id
            name
          }
        }
        user {
          name
          image
          id
        }
        images {
          created_at
          id
          link
        }
      }
      images {
        created_at
        id
        link
      }
      likes_aggregate {
        aggregate {
          count
        }
      }
      shares_aggregate {
        aggregate {
          count
        }
      }
      comments_aggregate {
        aggregate {
          count
        }
      }
      user {
        id
        name
        image
      }
      videos {
        created_at
        id
        link
      }
      comments(order_by: { created_at: desc }, limit: 10) {
        id
        text
        parent_comment_id
        user {
          id
          name
          image
        }
        created_at
      }
      CategoryOnPosts {
        category {
          id
          name
        }
      }
    }
  }
`;

export const CREATE_COMMENT = gql`
  mutation createPostComment($postId: String, $text: String) {
    insert_comments_one(object: { postId: $postId, text: $text }) {
      id
      user_id
      text
      created_at
      parent_comment_id
      user {
        id
        image
        name
        firstname
        lastname
      }
    }
  }
`;

export const CREATE_COMMENT_RESPONSE = gql`
  mutation createResponseComment(
    $parentCommentId: String
    $text: String
    $postId: String
  ) {
    insert_comments_one(
      object: {
        postId: $postId
        text: $text
        parent_comment_id: $parentCommentId
      }
    ) {
      id
      user_id
      text
      created_at
      parent_comment_id
      user {
        id
        image
        name
        firstname
        lastname
      }
    }
  }
`;

export const GET_POST_COMMENTS = gql`
  query getPostComments($postId: String) {
    comments(where: { postId: { _eq: $postId } }) {
      id
      text
      user {
        id
        name
        image
      }
      postId
      parent_comment_id
      likes_aggregate {
        aggregate {
          count
        }
      }
      shares_aggregate {
        aggregate {
          count
        }
      }
      images {
        id
        link
      }
    }
  }
`;

export const GET_USER_SELECTED_CATEGORIES = gql`
  query getUserSelectedCategories {
    UserOnCategories {
      category {
        id
        name
      }
    }
  }
`;

export const UPLOAD_POST_IMAGE = gql`
  mutation uploadFile(
    $base64Str: String!
    $post_id: String
    $filename: String
  ) {
    uploadMedia(base64Str: $base64Str, post_id: $post_id, filename: $filename)
  }
`;

export const FILTER_POSTS_BY_CATEGORY = gql`
  query GetPosts($offset: Int, $limit: Int, $filter: [String!]) {
    posts_aggregate(
      where: { CategoryOnPosts: { category_id: { _in: $filter } } }
    ) {
      aggregate {
        count
      }
    }
    posts(
      order_by: { created_at: desc }
      offset: $offset
      limit: $limit
      where: { CategoryOnPosts: { category_id: { _in: $filter } } }
    ) {
      content
      id
      created_at
      updated_at
      images {
        created_at
        id
        link
      }
      likes_aggregate {
        aggregate {
          count
        }
      }
      shares_aggregate {
        aggregate {
          count
        }
      }
      comments_aggregate {
        aggregate {
          count
        }
      }
      user {
        id
        name
        image
      }
      videos {
        created_at
        id
        link
      }
      comments(order_by: { created_at: desc }, limit: 10) {
        id
        text
        parent_comment_id
        user {
          name
          image
          id
        }
        created_at
      }
      CategoryOnPosts {
        post_id
        category {
          id
          name
        }
      }
    }
  }
`;

export const FILTER_DIGITAL_POSTS_BY_CATEGORY = gql`
  query GetDigitalPosts($offset: Int, $limit: Int, $filter: [String!]) {
    posts_aggregate(
      where: { type: { _eq: "DIGITAL" } }
      where: { CategoryOnPosts: { category_id: { _in: $filter } } }
    ) {
      aggregate {
        count
      }
    }
    posts(
      where: { type: { _eq: "DIGITAL" } }
      where: { CategoryOnPosts: { category_id: { _in: $filter } } }
      order_by: { created_at: desc }
      offset: $offset
      limit: $limit
    ) {
      content
      id
      created_at
      updated_at
      images {
        created_at
        id
        link
      }
      likes_aggregate {
        aggregate {
          count
        }
      }
      shares_aggregate {
        aggregate {
          count
        }
      }
      comments_aggregate {
        aggregate {
          count
        }
      }
      user {
        id
        name
        image
      }
      videos {
        created_at
        id
        link
      }
      comments(order_by: { created_at: desc }, limit: 10) {
        id
        text
        parent_comment_id
        user {
          name
          image
          id
        }
        created_at
      }
      CategoryOnPosts {
        post_id
        category {
          id
          name
        }
      }
    }
  }
`;

export const SUBSCRIBE_NEW_COMMENTS = gql`
  subscription newComments($post_id: String!) {
    comments(where: { postId: { _eq: $post_id } }) {
      id
      text
      parent_comment_id
      user {
        name
        image
        id
      }
      created_at
    }
  }
`;

export const UPDATE_POST = gql`
  mutation updatePost($id: String!, $content: String) {
    update_posts_by_pk(pk_columns: { id: $id }, _set: { content: $content }) {
      id
      title
      content
      comments(order_by: { created_at: desc }, limit: 10) {
        text
      }
      created_at
      updated_at
      user {
        id
        name
        image
      }
      images {
        created_at
        id
        link
      }
      likes_aggregate {
        aggregate {
          count
        }
      }
      shares_aggregate {
        aggregate {
          count
        }
      }
      comments_aggregate {
        aggregate {
          count
        }
      }
    }
  }
`;

export const GET_POST = gql`
  query getPost($id: String!) {
    posts_by_pk(id: $id) {
      id
      title
      content
      content
      id
      created_at
      updated_at
      original_post {
        title
        content
        created_at
        updated_at
        CategoryOnPosts {
          category {
            id
            name
          }
        }
        user {
          name
          image
          id
        }
        images {
          created_at
          id
          link
        }
      }
      images {
        created_at
        id
        link
      }
      likes_aggregate {
        aggregate {
          count
        }
      }
      shares_aggregate {
        aggregate {
          count
        }
      }
      comments_aggregate {
        aggregate {
          count
        }
      }
      user {
        id
        name
        image
      }
      videos {
        created_at
        id
        link
      }
      comments(order_by: { created_at: desc }, limit: 20) {
        id
        text
        parent_comment_id
        user {
          name
          image
          id
        }
        created_at
      }
      CategoryOnPosts {
        category {
          id
          name
        }
      }
    }
  }
`;

export const DELETE_POST = gql`
  mutation deletePost($id: String!) {
    update_posts_by_pk(pk_columns: { id: $id }, _set: { is_deleted: true }) {
      id
      content
      updated_at
    }
  }
`;

export const SUBSCRIBE_TO_NEW_POST_COMMENT = gql`
  subscription subscribeToNewCommentOnPost($postId: String!) {
    comments(
      where: { postId: { _eq: $postId } }
      order_by: { updated_at: desc }
      limit: 1
    ) {
      text
      updated_at
      id
      parent_comment_id
      user {
        name
        image
        id
      }
    }
  }
`;
export const SUBSCRIBE_TO_NEW_ARTICLE_COMMENT = gql`
  subscription subscribeToNewCommentOnPost($articleId: String!) {
    comments(
      where: { articleId: { _eq: $articleId } }
      order_by: { updated_at: desc }
      limit: 1
    ) {
      text
      updated_at
      id
      parent_comment_id
      user {
        name
        image
        id
      }
    }
  }
`;

export const CREATE_GROUP = gql`
  mutation CreateGroup(
    $name: String!
    $description: String
    $image: String
    $logo: String
  ) {
    insert_groups_one(
      object: {
        name: $name
        description: $description
        image: $image
        logo: $logo
      }
    ) {
      id
      name
      description
      image
      logo
      created_at
      updated_at
    }
  }
`;

export const CREATE_PAGE = gql`
  mutation CreatePage(
    $name: String!
    $description: String
    $image: String
    $logo: String
  ) {
    insert_pages_one(
      object: {
        name: $name
        overview: $description
        image: $image
        logo: $logo
      }
    ) {
      id
      name
      overview
      image
      logo
      created_at
      updated_at
    }
  }
`;

export const GET_USER_GROUP = gql`
  query GetGroup($groupId: String!, $userId: String!) {
    groups_by_pk(id: $groupId) {
      id
      name
      description
      logo
      image
      creator {
        id
        name
        image
      }
      UserOnGroups_aggregate {
        aggregate {
          count
        }
      }
      UserOnGroups(
        limit: 6
        where: {
          _or: [{ user_id: { _eq: $userId } }, { user_id: { _is_null: false } }]
        }
      ) {
        user {
          id
          name
          image
        }
      }
    }
  }
`;
export const GET_USER_GROUP_MEMBERS = gql`
  query GetGroup($groupId: String!, $userId: String!, $membersOffset: Int!) {
    groups_by_pk(id: $groupId) {
      id
      name
      description
      logo
      image
      creator {
        id
        name
        image
      }
      UserOnGroups_aggregate {
        aggregate {
          count
        }
      }
      UserOnGroups(
        offset: $membersOffset
        limit: 20
        where: {
          _or: [{ user_id: { _eq: $userId } }, { user_id: { _is_null: false } }]
        }
      ) {
        user {
          id
          name
          image
        }
      }
    }
  }
`;

export const JOIN_GROUP = gql`
  mutation JoinGroup($userId: String!, $groupId: String!) {
    insert_UserOnGroups_one(object: { user_id: $userId, group_id: $groupId }) {
      user {
        id
        name
        image
      }
      group {
        id
        name
      }
    }
  }
`;

export const GET_USER_PROFILE_RESUME = gql`
  query GetUserProfileResume($userId: String!) {
    connections_aggregate(
      where: {
        _and: [
          { accepted: { _eq: true } }
          {
            _or: [
              { destination_user_id: { _eq: $userId } }
              { origin_user_id: { _eq: $userId } }
            ]
          }
        ]
      }
    ) {
      aggregate {
        count
      }
    }
    users_by_pk(id: $userId) {
      name
      email
      id
      image
      UserOnGroups(limit: 20) {
        group {
          name
          id
          image
        }
      }
      UserOnGroups_aggregate {
        aggregate {
          count
        }
      }
      UserOnPages_aggregate {
        aggregate {
          count
        }
      }
    }
  }
`;

export const GET_USER_GROUPS_AND_RECOMMENDATIONS = gql`
  query GetUserGroups($userId: String!) {
    users_by_pk(id: $userId) {
      name
      email
      id
      image
      groups {
        name
        id
        image
      }
      UserOnGroups(limit: 20) {
        group {
          name
          id
          image
        }
      }
      UserOnGroups_aggregate {
        aggregate {
          count
        }
      }
      UserOnPages_aggregate {
        aggregate {
          count
        }
      }
      connections_aggregate(where: { accepted: { _eq: true } }) {
        aggregate {
          count
        }
      }
    }
  }
`;

export const GET_PAGE = gql`
  query GetPage(
    $pageId: String!
    $followersOffset: Int!
    $followersLimit: Int!
    $userId: String!
  ) {
    pages_by_pk(id: $pageId) {
      id
      name
      image
      logo
      employees
      overview
      location
      creator {
        id
        name
        image
      }
      created_at
      updated_at
      pages_projects {
        id
        description
        created_at
        image
        link
        title
      }
      services
      specialities
      website
      posts(offset: 0, limit: 20) {
        id
        title
        content
        original_post {
          title
          content
          created_at
          updated_at
          CategoryOnPosts {
            category {
              id
              name
            }
          }
          user {
            name
            image
            id
          }
          images {
            created_at
            id
            link
          }
        }
        images {
          created_at
          id
          link
        }
        comments(order_by: { created_at: desc }, limit: 10) {
          id
          text
          shares_aggregate {
            aggregate {
              count
            }
          }
          likes_aggregate {
            aggregate {
              count
            }
          }
          created_at
          updated_at
          user {
            id
            name
            image
          }
        }
        CategoryOnPosts {
          category {
            id
            name
          }
        }
      }
      UserOnPages_aggregate {
        aggregate {
          count
        }
      }
      UserOnPages(
        offset: $followersOffset
        limit: $followersLimit
        where: {
          _or: [{ user_id: { _eq: $userId } }, { user_id: { _is_null: false } }]
        }
      ) {
        user {
          id
          name
          image
        }
        created_at
      }
    }
  }
`;

export const UPDATE_PAGE_SERVICES = gql`
  mutation UpdatePageServices($data: jsonb, $pageId: String!) {
    update_pages_by_pk(pk_columns: { id: $pageId }, _set: { services: $data }) {
      id
      name
      image
      logo
      employees
      overview
      location
      creator {
        id
        name
        image
      }
      created_at
      updated_at
      pages_projects {
        id
        description
        created_at
        image
        link
        title
      }
      services
      specialities
      website
      posts(offset: 0, limit: 20) {
        id
        title
        content
        original_post {
          title
          content
          created_at
          updated_at
          CategoryOnPosts {
            category {
              id
              name
            }
          }
          user {
            name
            image
            id
          }
          images {
            created_at
            id
            link
          }
        }
        images {
          created_at
          id
          link
        }
        comments(order_by: { created_at: desc }, limit: 10) {
          id
          text
          shares_aggregate {
            aggregate {
              count
            }
          }
          likes_aggregate {
            aggregate {
              count
            }
          }
          created_at
          updated_at
          user {
            id
            name
            image
          }
        }
        CategoryOnPosts {
          category {
            id
            name
          }
        }
      }
      UserOnPages_aggregate {
        aggregate {
          count
        }
      }
      UserOnPages(offset: 0, limit: 20) {
        user {
          id
          name
          image
        }
        created_at
      }
    }
  }
`;

export const UPDATE_PAGE_ABOUT = gql`
  mutation UpdatePageAbout(
    $pageId: String!
    $overview: String!
    $specialities: String!
    $employees: Int!
    $website: String
    $location: String
  ) {
    update_pages_by_pk(
      pk_columns: { id: $pageId }
      _set: {
        overview: $overview
        specialities: $specialities
        employees: $employees
        website: $website
        location: $location
      }
    ) {
      id
      name
      image
      logo
      employees
      overview
      location
      creator {
        id
        name
        image
      }
      created_at
      updated_at
      pages_projects {
        id
        description
        created_at
        image
        link
        title
      }
      services
      specialities
      website
      posts(offset: 0, limit: 20) {
        id
        title
        content
        original_post {
          title
          content
          created_at
          updated_at
          CategoryOnPosts {
            category {
              id
              name
            }
          }
          user {
            name
            image
            id
          }
          images {
            created_at
            id
            link
          }
        }
        images {
          created_at
          id
          link
        }
        comments(order_by: { created_at: desc }, limit: 10) {
          id
          text
          shares_aggregate {
            aggregate {
              count
            }
          }
          likes_aggregate {
            aggregate {
              count
            }
          }
          created_at
          updated_at
          user {
            id
            name
            image
          }
        }
        CategoryOnPosts {
          category {
            id
            name
          }
        }
      }
      UserOnPages_aggregate {
        aggregate {
          count
        }
      }
      UserOnPages(offset: 0, limit: 20) {
        user {
          id
          name
          image
        }
        created_at
      }
    }
  }
`;

export const FOLLOW_PAGE = gql`
  mutation FollowPage($userId: String!, $pageId: String!) {
    insert_UserOnPages_one(object: { page_id: $pageId, user_id: $userId }) {
      page_id
      user_id
      created_at
      updated_at
    }
  }
`;

export const CREATE_PAGE_PROJECT = gql`
  mutation AddPageProject(
    $pageId: String!
    $title: String!
    $description: String!
    $image: String!
  ) {
    insert_pages_projects_one(
      object: {
        page_id: $pageId
        title: $title
        description: $description
        image: $image
      }
    ) {
      created_at
      description
      id
      image
      link
      title
      updated_at
    }
  }
`;

export const GET_USER_PROFILE = gql`
  query GetUserProfile($userId: String!, $viewerId: String!) {
    users_by_pk(id: $userId) {
      id
      country
      city
      email
      image
      name
      connections(where: { origin_user_id: { _eq: $viewerId } }) {
        id
        destination_user_id
        origin_user_id
        updated_at
        accepted
      }
      UserProfile {
        basic_information
        professional_summary
        work_experience
        education
        services
      }
      certifications {
        id
        title
        institution
        location
        file_link
        created_at
      }
      scientific_articles {
        id
        title
        description
        file_link
        image
        created_at
      }
      white_papers {
        id
        title
        description
        file_link
        image
        created_at
      }
    }
  }
`;

export const ADD_USER_SCIENTIFIC_ARTICLE = gql`
  mutation AddUserArticle(
    $title: String!
    $description: String!
    $userId: String!
    $image: String!
    $file_link: String!
  ) {
    insert_scientific_articles_one(
      object: {
        title: $title
        description: $description
        image: $image
        file_link: $file_link
        userId: $userId
      }
    ) {
      id
      title
      description
      file_link
      image
      created_at
    }
  }
`;

export const ADD_USER_WHITE_PAPER = gql`
  mutation AddUserWhitePaper(
    $title: String!
    $description: String!
    $userId: String!
    $image: String!
    $file_link: String!
  ) {
    insert_white_papers_one(
      object: {
        title: $title
        description: $description
        image: $image
        file_link: $file_link
        userId: $userId
      }
    ) {
      id
      title
      description
      file_link
      image
      created_at
    }
  }
`;

export const UPDATE_USER_PROFILE = gql`
  mutation UpdateUserProfile(
    $information: String!
    $services: jsonb
    $userId: String!
    $professional: String!
    $experience: String!
    $education: String!
  ) {
    update_UserProfile(
      where: { userId: { _eq: $userId } }
      _set: {
        basic_information: $information
        professional_summary: $professional
        education: $education
        work_experience: $experience
        services: $services
      }
    ) {
      returning {
        basic_information
        professional_summary
        work_experience
        education
        services
      }
    }
  }
`;

export const INSERT_USER_PROFILE = gql`
  mutation InsertUserProfile(
    $information: String!
    $services: jsonb
    $userId: String!
    $professional: String!
    $experience: String!
    $education: String!
  ) {
    insert_UserProfile_one(
      object: {
        basic_information: $information
        professional_summary: $professional
        education: $education
        work_experience: $experience
        userId: $userId
        services: $services
      }
    ) {
      basic_information
      professional_summary
      work_experience
      education
      services
    }
  }
`;

export const CREATE_CONNECTION_REQUEST = gql`
  mutation createUserConnection($userId: String!, $endUserId: String!) {
    insert_connections_one(
      object: { origin_user_id: $userId, destination_user_id: $endUserId }
    ) {
      id
      origin_user_id
      destination_user_id
      accepted
      updated_at
      created_at
    }
  }
`;

export const GET_USER_CONNECTIONS = gql`
  query GetUserAllUserInvitations($userId: String!) {
    connections_aggregate(
      where: {
        _and: [
          { accepted: { _eq: false } }
          {
            _or: [
              { destination_user_id: { _eq: $userId } }
              { origin_user_id: { _eq: $userId } }
            ]
          }
        ]
      }
    ) {
      aggregate {
        count
      }
    }
    connections(
      where: {
        _and: [
          { accepted: { _eq: false } }
          {
            _or: [
              { destination_user_id: { _eq: $userId } }
              { origin_user_id: { _eq: $userId } }
            ]
          }
        ]
      }
    ) {
      id
      accepted
      origin_user_id
      destination_user_id
      created_at
      updated_at
      endUser {
        name
        email
        image
        id
      }
      user {
        id
        name
        image
        email
      }
    }
  }
`;

export const ACCEPT_CONNECTION = gql`
  mutation AcceptConnection($id: String!) {
    update_connections_by_pk(
      _set: { accepted: true }
      pk_columns: { id: $id }
    ) {
      accepted
      id
      updated_at
    }
  }
`;

export const GET_USER_ACCEPTED_CONNECTIONS = gql`
  query GetUserAllUserConnections($userId: String!) {
    connections_aggregate(
      where: {
        _and: [
          { accepted: { _eq: true } }
          {
            _or: [
              { destination_user_id: { _eq: $userId } }
              { origin_user_id: { _eq: $userId } }
            ]
          }
        ]
      }
    ) {
      aggregate {
        count
      }
    }
    connections(
      where: {
        _and: [
          { accepted: { _eq: true } }
          {
            _or: [
              { destination_user_id: { _eq: $userId } }
              { origin_user_id: { _eq: $userId } }
            ]
          }
        ]
      }
    ) {
      id
      accepted
      origin_user_id
      destination_user_id
      created_at
      updated_at
      endUser {
        name
        email
        image
        id
      }
      user {
        id
        name
        image
        email
      }
    }
  }
`;

export const CREATE_CONVERSATION = gql`
  mutation CreateConversation(
    $userId: String!
    $endUserId: String!
    $id: String!
  ) {
    insert_conversations_one(
      object: {
        user_conversations: {
          data: [{ userId: $userId }, { userId: $endUserId }]
        }
        id: $id
      }
    ) {
      id
      created_at
      updated_at
      user_conversations {
        user {
          name
          email
          id
          image
        }
      }
    }
  }
`;

export const GET_USER_CONVERSATIONS = gql`
  query GetUserConversations($userId: String!) {
    user_conversations(
      where: { userId: { _eq: $userId } }
      order_by: { updated_at: desc }
    ) {
      id
      updated_at
      conversation {
        id
        users {
          user {
            id
            name
            email
            image
          }
        }
        messages {
          content
          id
          created_at
        }
        created_at
        updated_at
      }
      user {
        name
        image
        id
        email
      }
    }
  }
`;

export const GET_CONVERSATION_MESSAGES = gql`
  query GetConversationMessages($conversationId: String!) {
    messages(
      where: { conversationId: { _eq: $conversationId } }
      order_by: { created_at: desc }
    ) {
      id
      conversationId
      content
      created_at
      files {
        link
        id
      }
      user {
        id
        name
        image
      }
      file
    }
  }
`;

export const SUBSCRIBE_TO_NEW_MESSAGES = gql`
  subscription ConversationMessages($conversationId: String!) {
    messages(
      where: { conversationId: { _eq: $conversationId } }
      order_by: { created_at: desc }
      limit: 1
    ) {
      id
      conversationId
      content
      created_at
      files {
        link
        id
      }
      user {
        id
        name
        image
      }
      file
    }
  }
`;

export const ADD_CONVERSATION_MESSAGE = gql`
  mutation AddConversationMessage(
    $content: String!
    $conversationId: String!
    $files: [message_files_insert_input!]!
  ) {
    insert_messages_one(
      object: {
        content: $content
        files: { data: $files }
        conversationId: $conversationId
      }
    ) {
      id
      conversationId
      content
      created_at
      files {
        link
        id
      }
      user {
        id
        name
        image
      }
      file
    }
  }
`;

export const GET_USER_ACTIVITY_RECAP = gql`
  query GetActivity($userId: String!) {
    posts_aggregate(where: { user_id: { _eq: $userId } }) {
      aggregate {
        count
      }
    }
    posts(where: { user_id: { _eq: $userId } }) {
      id
      user {
        id
        image
        name
      }
      created_at
    }
    comments_aggregate(where: { user_id: { _eq: $userId } }) {
      aggregate {
        count
      }
    }
    comments(where: { user_id: { _eq: $userId } }) {
      id
      created_at
      post {
        user {
          name
          id
          image
        }
        id
      }
    }
    connections_aggregate(
      where: {
        _and: [
          { accepted: { _eq: true } }
          {
            _or: [
              { destination_user_id: { _eq: $userId } }
              { origin_user_id: { _eq: $userId } }
            ]
          }
        ]
      }
    ) {
      aggregate {
        count
      }
    }
    connections(
      where: {
        _and: [
          { accepted: { _eq: true } }
          {
            _or: [
              { destination_user_id: { _eq: $userId } }
              { origin_user_id: { _eq: $userId } }
            ]
          }
        ]
      }
    ) {
      id
      created_at
      updated_at
      user {
        name
        id
        image
      }
      endUser {
        name
        id
        image
      }
    }
  }
`;

export const CREATE_QUESTION = gql`
  mutation CreateQuestion(
    $categoryId: String!
    $topic: String!
    $content: String!
  ) {
    insert_questions_one(
      object: { categoryId: $categoryId, topic: $topic, content: $content }
    ) {
      id
      topic
      content
      created_at
      updated_at
      user {
        id
        name
        image
      }
      category {
        id
        name
      }
      questions_followers_aggregate {
        aggregate {
          count
        }
      }
      answers_aggregate {
        aggregate {
          count
        }
      }
      answers {
        id
        user {
          name
          id
          image
        }
        content
        created_at
        comments_aggregate {
          aggregate {
            count
          }
        }
        comments(offset: 0, limit: 10) {
          id
          text
          created_at
        }
        votes_aggregate {
          aggregate {
            count
          }
        }
      }
    }
  }
`;

export const GET_QUESTIONS_BY_CATEGORY = gql`
  query GetQuestions(
    $offset: Int
    $limit: Int
    $userId: String!
    $filter: [String!]
  ) {
    questions_aggregate {
      aggregate {
        count
      }
    }
    answers_aggregate {
      aggregate {
        count
      }
    }
    questions(
      offset: $offset
      limit: $limit
      where: { categoryId: { _in: $filter } }
      order_by: { created_at: desc }
    ) {
      id
      user {
        name
        id
        image
      }
      created_at
      updated_at
      topic
      content
      questions_followers_aggregate {
        aggregate {
          count
        }
      }
      answers_aggregate {
        aggregate {
          count
        }
      }
      answers(offset: 0, limit: 10, order_by: { created_at: desc }) {
        id
        user {
          name
          id
          image
        }
        content
        created_at
        comments_aggregate {
          aggregate {
            count
          }
        }
        comments(offset: 0, limit: 10) {
          id
          text
          created_at
        }
        votes_aggregate {
          aggregate {
            count
          }
        }
        votes(
          offset: 0
          limit: 10
          where: {
            _or: [{ userId: { _eq: $userId } }, { userId: { _is_null: false } }]
          }
        ) {
          id
          user {
            id
            name
            image
          }
          created_at
          answerId
        }
        views_aggregate {
          aggregate {
            count
          }
        }
        views(
          offset: 0
          limit: 10
          where: {
            _or: [{ userId: { _eq: $userId } }, { userId: { _is_null: false } }]
          }
        ) {
          id
          user {
            id
            name
            image
          }
          created_at
          answerId
        }
      }
      category {
        id
        name
      }
    }
  }
`;

export const GET_QUESTIONS = gql`
  query GetQuestions($offset: Int, $limit: Int, $userId: String!) {
    questions_aggregate {
      aggregate {
        count
      }
    }
    answers_aggregate {
      aggregate {
        count
      }
    }
    questions(offset: $offset, limit: $limit, order_by: { created_at: desc }) {
      id
      user {
        name
        id
        image
      }
      created_at
      updated_at
      topic
      content
      questions_followers_aggregate {
        aggregate {
          count
        }
      }
      answers_aggregate {
        aggregate {
          count
        }
      }
      answers(offset: 0, limit: 10, order_by: { created_at: desc }) {
        id
        user {
          name
          id
          image
        }
        content
        created_at
        comments_aggregate {
          aggregate {
            count
          }
        }
        comments(offset: 0, limit: 10) {
          id
          text
          created_at
        }
        votes_aggregate {
          aggregate {
            count
          }
        }
        votes(
          offset: 0
          limit: 10
          where: {
            _or: [{ userId: { _eq: $userId } }, { userId: { _is_null: false } }]
          }
        ) {
          id
          user {
            id
            name
            image
          }
          created_at
          answerId
        }
        views_aggregate {
          aggregate {
            count
          }
        }
        views(
          offset: 0
          limit: 10
          where: {
            _or: [{ userId: { _eq: $userId } }, { userId: { _is_null: false } }]
          }
        ) {
          id
          user {
            id
            name
            image
          }
          created_at
          answerId
        }
      }
      category {
        id
        name
      }
    }
  }
`;

export const CREATE_ANSWER = gql`
  mutation CreateAnswer($questionId: String!, $content: String!) {
    insert_answers_one(object: { questionId: $questionId, content: $content }) {
      id
      created_at
      content
      comments_aggregate {
        aggregate {
          count
        }
      }
      votes_aggregate {
        aggregate {
          count
        }
      }
      votes(offset: 0, limit: 10) {
        id
        user {
          id
          name
          image
        }
        created_at
        answerId
      }
      comments {
        id
        user {
          name
          id
          image
        }
        created_at
        text
      }
    }
  }
`;

export const GET_ANSWERS = gql`
  query GetAnswers(
    $offset: Int
    $limit: Int
    $questionId: String!
    $userId: String!
  ) {
    answers(
      offset: $offset
      limit: $limit
      where: { questionId: { _eq: $questionId } }
    ) {
      id
      created_at
      content
      user {
        id
        name
        image
      }
      comments_aggregate {
        aggregate {
          count
        }
      }
      votes_aggregate {
        aggregate {
          count
        }
      }
      votes(
        offset: 0
        limit: 10
        where: {
          _or: [{ userId: { _eq: $userId } }, { userId: { _is_null: false } }]
        }
      ) {
        id
        user {
          id
          name
          image
        }
        created_at
        answerId
      }
      comments {
        id
        user {
          name
          id
          image
        }
        created_at
        text
      }
    }
  }
`;

export const CREATE_ANSWER_COMMENT = gql`
  mutation createAnswerComment($answerId: String, $text: String) {
    insert_comments_one(object: { answerId: $answerId, text: $text }) {
      id
      user_id
      text
      created_at
      parent_comment_id
      postId
      answerId
      user {
        id
        image
        name
        firstname
        lastname
      }
    }
  }
`;
export const CREATE_ARTICLE_COMMENT = gql`
  mutation createArticleComment($articleId: String, $text: String) {
    insert_comments_one(object: { articleId: $articleId, text: $text }) {
      id
      user_id
      text
      created_at
      parent_comment_id
      postId
      answerId
      articleId
      user {
        id
        image
        name
        firstname
        lastname
      }
    }
  }
`;
export const CREATE_MEDIA_POST_COMMENT = gql`
  mutation createMediaPostComment($mediaPostId: String, $text: String) {
    insert_comments_one(object: { mediaPostId: $mediaPostId, text: $text }) {
      id
      user_id
      text
      created_at
      parent_comment_id
      postId
      answerId
      mediaPostId
      user {
        id
        image
        name
        firstname
        lastname
      }
    }
  }
`;

export const GET_ANSWER_COMMENTS = gql`
  query GetAnswerComments($answerId: String!, $offset: Int, $limit: Int) {
    comments(
      where: { answer: { id: { _eq: $answerId } } }
      offset: $offset
      limit: $limit
    ) {
      id
      created_at
      user {
        name
        id
        image
      }
      text
    }
  }
`;
export const GET_ARTICLE_COMMENTS = gql`
  query GetArticleComments($articleId: String!, $offset: Int, $limit: Int) {
    comments(
      where: { article: { id: { _eq: $articleId } } }
      offset: $offset
      limit: $limit
    ) {
      id
      created_at
      user {
        name
        id
        image
      }
      text
    }
  }
`;
export const GET_MEDIA_POST_COMMENTS = gql`
  query GetMediaPostComments($mediaPostId: String!, $offset: Int, $limit: Int) {
    comments(
      where: { mediaPost: { id: { _eq: $mediaPostId } } }
      offset: $offset
      limit: $limit
    ) {
      id
      created_at
      user {
        name
        id
        image
      }
      text
    }
  }
`;

export const ADD_QUESTION_FOLLOWER = gql`
  mutation AddQuestionFollower($questionId: String!) {
    insert_questions_followers_one(object: { questionId: $questionId }) {
      question {
        id
      }
      user {
        id
        name
        image
      }
    }
  }
`;

export const CREATE_ANSWER_VOTE = gql`
  mutation createAnswerVote($answerId: String!, $userId: String!) {
    insert_votes_one(object: { answerId: $answerId, userId: $userId }) {
      answer {
        id
      }
      user {
        id
        name
        image
      }
    }
  }
`;

export const CREATE_ANSWER_VIEW = gql`
  mutation createAnswerView($answerId: String!) {
    insert_views_one(object: { answerId: $answerId }) {
      answer {
        id
      }
      user {
        id
        name
        image
      }
    }
  }
`;

export const CREATE_MEDIA_ARTICLE = gql`
  mutation createMediaArticle(
    $title: String!
    $document: String
    $image: String
    $description: String!
    $categoryId: String!
    $content: jsonb!
  ) {
    insert_media_articles_one(
      object: {
        title: $title
        description: $description
        categoryId: $categoryId
        content: $content
        image: $image
        document: $document
      }
    ) {
      id
      user {
        id
        name
        image
      }
      title
      description
      content
      image
      created_at
    }
  }
`;

export const GET_MEDIA_ARTICLES = gql`
  query GetMediaArticles($offset: Int, $limit: Int) {
    media_articles(
      offset: $offset
      limit: $limit
      order_by: { created_at: desc }
    ) {
      id
      user {
        id
        name
        image
      }
      title
      description
      image
      content
      likes_aggregate {
        aggregate {
          count
        }
      }
      shares_aggregate {
        aggregate {
          count
        }
      }
      recommendations_aggregate {
        aggregate {
          count
        }
      }
      comments_aggregate {
        aggregate {
          count
        }
      }
      comments {
        id
        text
        created_at
        articleId
        user {
          id
          name
          image
        }
      }
      created_at
      updated_at
      category {
        name
        id
      }
    }
  }
`;

export const GET_MEDIA_ARTICLES_BY_CATEGORY = gql`
  query GetMediaArticles($offset: Int, $limit: Int, $filter: [String!]) {
    media_articles(
      offset: $offset
      limit: $limit
      where: { categoryId: { _in: $filter } }
      order_by: { created_at: desc }
    ) {
      id
      user {
        id
        name
        image
      }
      title
      description
      image
      content
      likes_aggregate {
        aggregate {
          count
        }
      }
      recommendations_aggregate {
        aggregate {
          count
        }
      }
      comments_aggregate {
        aggregate {
          count
        }
      }
      created_at
      updated_at
      category {
        name
        id
      }
    }
  }
`;

export const GET_MEDIA_ARTICLE = gql`
  query getMediaArticle($articleId: String!) {
    media_articles(
      limit: 5
      order_by: { recommendations_aggregate: { count: desc }, created_at: desc }
    ) {
      id
      user {
        id
        name
        image
      }
      title
      description
      image
      content
      document
      created_at
      likes_aggregate {
        aggregate {
          count
        }
      }
      recommendations_aggregate {
        aggregate {
          count
        }
      }
      comments_aggregate {
        aggregate {
          count
        }
      }
      updated_at
      category {
        name
        id
      }
    }
    media_articles_by_pk(id: $articleId) {
      id
      user {
        id
        name
        image
      }
      title
      description
      image
      content
      document
      created_at
      likes_aggregate {
        aggregate {
          count
        }
      }
      recommendations_aggregate {
        aggregate {
          count
        }
      }
      comments_aggregate {
        aggregate {
          count
        }
      }
      updated_at
      category {
        name
        id
      }
    }
  }
`;

export const GET_USER_RECOMMENDATIONS = gql`
  query getUserRecommendations($filter: [String!], $userId: String!) {
    users(
      where: {
        _and: [
          { id: { _neq: $userId } }
          { UserOnCategories: { category: { id: { _in: $filter } } } }
        ]
      }
      offset: 0
      limit: 10
    ) {
      connections_aggregate(where: { accepted: { _eq: true } }) {
        aggregate {
          count
        }
      }
      name
      email
      id
      city
      country
      image
      UserOnGroups(limit: 20) {
        group {
          name
          id
          image
        }
      }
      UserOnGroups_aggregate {
        aggregate {
          count
        }
      }
      UserOnPages_aggregate {
        aggregate {
          count
        }
      }
    }
  }
`;

export const GET_USER_GROUPS = gql`
  query UserGroups($userId: String!) {
    UserOnGroups_aggregate(where: { user_id: { _eq: $userId } }) {
      aggregate {
        count
      }
    }
    UserOnGroups(where: { user_id: { _eq: $userId } }) {
      group {
        name
        logo
        description
        created_at
        id
        updated_at
        image
        UserOnGroups_aggregate {
          aggregate {
            count
          }
        }
      }
    }
  }
`;

export const GET_USER_PAGES = gql`
  query UserPages($userId: String!) {
    UserOnPages_aggregate(where: { user_id: { _eq: $userId } }) {
      aggregate {
        count
      }
    }
    UserOnPages(where: { user_id: { _eq: $userId } }) {
      page {
        name
        overview
        logo
        image
        location
        id
        updated_at
        created_at
        UserOnPages_aggregate {
          aggregate {
            count
          }
        }
      }
    }
  }
`;

export const GET_POST_NOTIFICATIONS = gql`
  query PostNotifications($offset: Int, $limit: Int, $userId: String) {
    posts_aggregate(where: { user_id: { _eq: $userId } }) {
      aggregate {
        count
      }
    }
    posts(
      where: { user_id: { _neq: $userId } }
      offset: $offset
      limit: $limit
      order_by: { created_at: desc }
    ) {
      id
      title
      content
      created_at
      user {
        id
        name
        image
        email
      }
      page {
        id
        name
      }
      group {
        id
        name
      }
    }
  }
`;

export const GET_RECOMMENDED_USERS = gql`
  query GetRecommendedUsers(
    $categoryIds: [String!]
    $offset: Int
    $limit: Int
  ) {
    users(
      where: { UserOnCategories: { category_id: { _in: $categoryIds } } }
      offset: $offset
      limit: $limit
    ) {
      connections_aggregate(where: { accepted: { _eq: true } }) {
        aggregate {
          count
        }
      }
      name
      email
      id
      image
      UserOnGroups(limit: 20) {
        group {
          name
          id
          image
        }
      }
      UserOnGroups_aggregate {
        aggregate {
          count
        }
      }
      UserOnPages_aggregate {
        aggregate {
          count
        }
      }
    }
  }
`;

export const GET_RECOMMENDED_PAGES = gql`
  query GetPagesRecommendations(
    $filter: [String!]
    $limit: Int
    $offset: Int
    $userId: String
  ) {
    pages(
      where: {
        _and: [
          { UserOnPages: { user_id: { _neq: $userId } } }
          { creator: { UserOnCategories: { category_id: { _in: $filter } } } }
        ]
      }
      offset: $offset
      limit: $limit
    ) {
      id
      name
      logo
      location
      image
      website
      UserOnPages_aggregate {
        aggregate {
          count
        }
      }
      overview
      creator {
        id
        name
        image
      }
    }
  }
`;

export const GET_RECOMMENDED_GROUPS = gql`
  query GetGroupRecommendations(
    $filter: [String!]
    $limit: Int
    $offset: Int
    $userId: String
  ) {
    groups(
      where: {
        _and: [
          { UserOnGroups: { user_id: { _neq: $userId } } }
          { creator: { UserOnCategories: { category_id: { _in: $filter } } } }
        ]
      }
      offset: $offset
      limit: $limit
    ) {
      id
      name
      logo
      image
      UserOnGroups_aggregate {
        aggregate {
          count
        }
      }
      creator {
        id
        name
        image
      }
      description
      created_at
    }
  }
`;



export const LIKE_COMMENT = gql`
  mutation LikeComment($commentId: String, $userId: String){
  insert_likes_one(object:{
    user_id: $userId,
    comment_id: $commentId
  }){
    id
    comment{
      id
      postId
    }
    user{
      id
      name
    }
  }
}



`


export const LIKE_POST = gql`
  mutation LikeComment($postId: String, $userId: String){
  insert_likes_one(object:{
    user_id: $userId,
    post_id: $postId
  }){
    id
    post{
      id
    }
    user{
      id
      name
    }
  }
}



`