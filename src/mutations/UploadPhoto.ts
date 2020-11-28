import { commitMutation, graphql } from 'react-relay';

const mutation = graphql`
  mutation UploadPhotoMutation(
    $albumID: Int!,
    $filename: String!,
    $description: String!,
    $data: String!,
    $communityID: Int
  ) {
    photosMutations{
      upload(
        albumID: $albumID,
        filename: $filename,
        description: $description,
        data: $data,
        communityID: $communityID
      ){
        id
        realID
        albumID
        owner {
          ... on Community {
            id
            avatar {
              id
            }
            cover {
              id
            }
          }
          ... on User {
            id
            avatar {
              id
            }
          }
        }
        description
        createdAt
        originalURL
        mediumURL
        previewURL
      }
    }
  }
`;

function commit(
  environment,
  albumID,
  filename,
  description,
  data,
  communityID,
  onCompleted,
) {
  const variables = {
    albumID,
    filename,
    description,
    data,
    communityID,
  };

  return commitMutation(environment, {
    mutation,
    variables,
    onCompleted: (rsp, err) => {
      if (err) {
        onCompleted(null, err);
        return;
      }
      onCompleted(rsp.photosMutations.upload, null);
    },
  });

}

export default commit;

export const uploadPhotoMutationAsync = (environment, albumID, filename, description, data, communityID) => {
  return new Promise((resolve, reject) => {
    commit(environment, albumID, filename, description, data, communityID, (rsp, err) => {
      if(err !== null) {
        return reject(err);
      }
      return resolve(rsp);
    })
  })
}
