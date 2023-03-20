import { LoaderArgs, TypedDeferredData, TypedResponse } from '@remix-run/server-runtime'
import { UnionToIntersection } from 'type-fest'

export type ExtractDeferredLoaderDataType<
  T extends (P: LoaderArgs) => Promise<TypedDeferredData<{ [K: string]: any }>>,
> = Pick<Awaited<ReturnType<T>>, 'data'>['data']

export type ExtractJSONLoaderDataType<
  T extends (P: LoaderArgs) => Promise<TypedResponse<{ [K: string]: any }>>,
> = Awaited<ReturnType<Pick<Awaited<ReturnType<T>>, 'json'>['json']>>

export type PartialRecord<K extends string, T> = {
  [P in K]?: T
}

export type PartialUnionToIntersection<U> = Partial<UnionToIntersection<U>>

export type FlattenMetaobjectFields<Fields extends any[], Keys extends string> = PartialRecord<
  Keys,
  Omit<Fields[number], 'key' | 'reference' | 'references'> & {
    reference?: PartialUnionToIntersection<NonNullable<Fields[number]['reference']>>
    references?: PartialUnionToIntersection<NonNullable<Fields[number]['references']>>
  }
>
