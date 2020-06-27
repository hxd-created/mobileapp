import { commitMutation, graphql } from 'react-relay';

const mutation = graphql`
  mutation SigninMutation($username: String!, $password: String!) {
    passportMutations {
      Signin(username: $username, password: $password) {
        accessToken
        refreshToken
      }
    }
  }
`;

function commit(
  environment,
  username: string,
  password: string,
  onCompleted,
) {
  const variables = {
    username,
    password,
  };

  return commitMutation(environment, {
    mutation,
    variables,
    onCompleted,
  });

}

export default commit;
