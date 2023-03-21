import { parseCookie } from './general'

export const getDYCookie = async (request: Request) => {
  const dyId = parseCookie(request, '_dyid')
  const dyIdSever = parseCookie(request, '_dyid_server')
  const dyJSession = parseCookie(request, '_dyjsession')

  return { dyId: dyId, dyIdSever: dyIdSever, dyJSession: dyJSession }
}

export const generateDYRequestHeaders = (apiToken: string) => ({
  'Content-Type': 'application/json',
  'dy-api-key': apiToken,
})

export const generateDYRequestBody = ({
  dyId,
  dyIdSever,
  dyJSession,
  request,
}: {
  dyId: string | undefined
  dyIdSever: string | undefined
  dyJSession: string | undefined
  request: Request
}) => ({
  user: {
    dyid: dyId ? dyId : '',
    dyid_server: dyIdSever ? dyIdSever : '',
  },
  session: {
    dy: dyJSession ? dyJSession : '',
  },
  selector: {
    names: [''],
  },
  context: {
    page: {
      type: 'HOMEPAGE',
      location: 'chubbiesshorts.com',
      locale: 'en_US',
      data: [],
    },
  },
  device: {
    userAgent: request.headers.get('user-agent') || '',
  },
})
