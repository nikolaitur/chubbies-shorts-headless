import hash from 'object-hash'
import { defer, from, of, switchMap, tap } from 'rxjs'

export interface RestApiParams {
  host: string
  cache?: Cache
  waitUntil: (promise: Promise<unknown>) => void
}

export class RestApi {
  host: string
  headers: HeadersInit & Record<string, string>
  cache?: Cache
  waitUntil: (promise: Promise<unknown>) => void

  constructor(params: RestApiParams) {
    this.cache = params.cache
    this.waitUntil = params.waitUntil
    this.host = params.host
    this.headers = {
      'content-type': 'application/json',
    }
  }

  getCacheKey(params: GetParams) {
    const { path } = params
    const cacheUrl = new URL(this.host + path)
    cacheUrl.pathname = '/cache' + cacheUrl.pathname + this.generateUniqueKeyFrom(params)

    return new Request(cacheUrl.toString(), {
      headers: { 'cache-control': 'public, max-age=60' },
    })
  }

  generateUniqueKeyFrom(params: GetParams) {
    return `/${hash(params)}`
  }

  fetch({ path, query, body, method = 'GET', headers = {} }: FetchParams) {
    return from(
      fetch(this.host + path + this.getQuerystring(query), {
        method,
        headers: {
          ...this.headers,
          ...headers,
        },
        body,
      }),
    )
  }

  getQuerystring(query?: Record<string, any>) {
    if (!query) {
      return ''
    }

    const params = new URLSearchParams()

    Object.entries(query).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach(value => params.append(key, value))
      } else if (value) {
        params.append(key, value)
      }
    })

    return '?' + params.toString()
  }

  get<T = any>(params: GetParams) {
    const { path, query, headers = {} } = params
    const cacheKey = this.getCacheKey(params)
    const cache = this.cache

    const apiFetch$ = this.fetch({
      method: 'GET',
      path,
      query,
      headers,
    })

    const parseResponse = switchMap((response: Response) => {
      if (response.ok) {
        return response.json() as Promise<T>
      } else {
        throw Error(`Error ${response.status}`)
      }
    })

    if (!cache) {
      return apiFetch$.pipe(parseResponse)
    }

    return from(defer(() => cache.match(cacheKey))).pipe(
      switchMap(response => {
        if (!response) {
          return apiFetch$.pipe(
            tap(response => {
              this.waitUntil(cache.put(cacheKey, response.clone()))
            }),
          )
        }
        return of(response)
      }),
      parseResponse,
    )
  }

  post<T = any>({ path, query, body, headers }: PostParams) {
    return this.fetch({
      method: 'POST',
      path,
      query,
      body: body ? JSON.stringify(body) : undefined,
      headers,
    }).pipe(
      switchMap(response => {
        if (response.ok) {
          return response.json() as Promise<T>
        } else {
          throw Error(`Error ${response.status}`)
        }
      }),
    )
  }

  put<T = any>({ path, query, body, headers }: PutParams) {
    return this.fetch({
      method: 'PUT',
      path,
      query,
      body: body ? JSON.stringify(body) : undefined,
      headers,
    }).pipe(
      switchMap(response => {
        if (response.ok) {
          return response.json() as Promise<T>
        } else {
          throw Error(`Error ${response.status}`)
        }
      }),
    )
  }

  delete<T = any>({ path, query, body, headers }: DeleteParams) {
    return this.fetch({
      method: 'DELETE',
      path,
      query,
      body: body ? JSON.stringify(body) : undefined,
      headers,
    }).pipe(
      switchMap(response => {
        if (response.ok) {
          return response.json() as Promise<T>
        } else {
          throw Error(`Error ${response.status}`)
        }
      }),
    )
  }
}

export interface FetchParams {
  path: string
  method?: 'GET' | 'POST' | 'DELETE' | 'PUT'
  query?: Record<string, any>
  body?: string
  headers?: Record<string, any>
}

export interface GetParams {
  path: string
  query?: Record<string, any>
  headers?: Record<string, any>
}

export interface PostParams {
  path: string
  query?: Record<string, any>
  body?: object
  headers?: Record<string, any>
}

export interface PutParams {
  path: string
  query?: Record<string, any>
  body?: object
  headers?: Record<string, any>
}

export interface DeleteParams {
  path: string
  query?: Record<string, any>
  body?: object
  headers?: Record<string, any>
}
