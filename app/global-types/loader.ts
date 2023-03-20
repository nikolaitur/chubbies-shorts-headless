import { loader as RootLoader } from '~/root'
import { loader as FrameLoader } from '~/routes/($lang)/__frame'
import { loader as CollectionLoader } from '~/routes/($lang)/__frame/collections/$collectionHandle'
import { loader as ProductLoader } from '~/routes/($lang)/__frame/products/$productHandle'
import { ExtractDeferredLoaderDataType, ExtractJSONLoaderDataType } from './type-helpers'

export type LoaderData = {
  root: ExtractJSONLoaderDataType<typeof RootLoader>
  frame: ExtractJSONLoaderDataType<typeof FrameLoader>
  product?: ExtractJSONLoaderDataType<typeof ProductLoader> | null
  collection: ExtractDeferredLoaderDataType<typeof CollectionLoader>
}

export type CartBlocksAboveCartItemsSettings = LoaderData['frame']['cartBlocksAboveCartItems']
