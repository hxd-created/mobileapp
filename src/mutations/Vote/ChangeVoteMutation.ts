import { commitMutation, graphql } from 'react-relay';

const mutation = graphql`
  mutation ChangeVoteMutation(
    $objectKind: String!,
    $objectID: String!,
    $direction: Int!
  ) {
    votingMutations {
      change(objectKind: $objectKind, objectID: $objectID, direction: $direction) {
        id
        votes
        myVote
      }
    }
  }
`;

function commit(
  environment,
  objectKind: string,
  objectID: string,
  direction,
  onCompleted,
)

{
  const variables = {
    objectKind,
    objectID,
    direction
  };
  return commitMutation(environment, {
    mutation,
    variables,
    onCompleted
  });

}

export default commit;