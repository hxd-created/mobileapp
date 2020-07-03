import { graphql } from 'react-relay';


export const get = graphql`
  query feedQueryGetQuery($ownerKind: OwnerKind!, $ownerID: String!, $limit: Int!) {
    feed {
      connection:get(ownerKind: $ownerKind, ownerID: $ownerID, limit: $limit) {
        cursor
        edges {
          id
          ...Story_story
          attachments {
            __typename
            ...Story_story
          }
        }
      }
    }
  }
`;

export const my = graphql`
  query feedQueryMyQuery($limit: Int!) {
    feed {
      connection:my(limit: $limit) {
        cursor
        edges {
          id
          ...Story_story
          attachments {
            __typename
            ...Story_story
          }
        }
      }
    }
  }
`;

export const voted = graphql`
  query feedQueryVotedQuery($limit: Int!) {
    feed {
      connection:voted(limit: $limit) {
        cursor
        edges {
          id
          ...Story_story
          attachments {
            __typename
            ...Story_story
          }
        }
      }
    }
  }
`;

export const rubric = graphql`
  query feedQueryRubricQuery($rubricID: String!, $limit: Int!) {
    feed {
      connection:rubric(rubricID: $rubricID, limit: $limit) {
        cursor
        edges {
          id
          ...Story_story
          attachments {
            __typename
            ...Story_story
          }
        }
      }
    }
  }
`;


export const next = graphql`
  query feedQueryNextQuery($cursor: String!, $limit: Int!) {
    feed {
      next(cursor: $cursor, limit: $limit) {
        cursor
        edges {
          id
          ...Story_story
          attachments {
            __typename
            ...Story_story
          }
        }
      }
    }
  }
`;
