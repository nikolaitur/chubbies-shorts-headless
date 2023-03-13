export const CREATE_SESSION_MUTATION = /* gql */ `#graphql
  mutation CreateSessionMutation($referer: String) {
    newSession(referer: $referer)
  }
`
