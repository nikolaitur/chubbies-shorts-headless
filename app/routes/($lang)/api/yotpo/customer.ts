import { LoaderArgs } from '@shopify/remix-oxygen'

// placed the api here to avoid the CORS issue
export async function loader({ request }: LoaderArgs) {
  const url = new URL(request.url)
  const email = url.searchParams.get('email') || ''

  const response = await fetch(
    `https://loyalty.yotpo.com/api/v2/customers?customer_email=${encodeURIComponent(
      email,
    )}&country_iso_code=null&with_referral_code=false&with_history=true`,
    {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'x-guid': 'BD6EtNJMM9btDBC6ejjeCQ',
        'x-api-key': 'i7Trl8xKDg9JD0iuGGOWcwtt',
      },
    },
  )

  const data = await response.json()

  return {
    status: 200,
    data,
  }
}
