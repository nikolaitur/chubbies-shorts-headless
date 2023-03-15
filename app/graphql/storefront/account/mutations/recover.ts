export const RECOVER_MUTATION = `#graphql
  mutation RecoverMutation($email: String!) {
    customerRecover(email: $email) {
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`
