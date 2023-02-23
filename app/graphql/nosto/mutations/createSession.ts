export const CREATE_SESSION_MUTATION = /* gql */ `#graphql
  mutation CreateSession($referer: String) {
    newSession(referer: $referer)
  }
`
