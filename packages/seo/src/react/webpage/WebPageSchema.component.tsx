import type { WebPage, WithContext } from 'schema-dts'

import { buildWebPageJsonLd } from '../../schemas/webpage.schema.js'
import type { WebPageSchemaProps } from '../../types/schema'
import { JsonLd } from '../JsonLd.component'

export function WebPageSchema(props: WebPageSchemaProps) {
    const data: WithContext<WebPage> = buildWebPageJsonLd(props)
    return <JsonLd data={data} />
}
