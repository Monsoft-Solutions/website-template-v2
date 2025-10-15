import type { WebSite, WithContext } from 'schema-dts'

import { buildWebSiteJsonLd } from '../../schemas/website.schema.js'
import type { WebSiteSchemaProps } from '../../types/schema'
import { JsonLd } from '../JsonLd.component'

export function WebSiteSchema(props: WebSiteSchemaProps) {
    const data: WithContext<WebSite> = buildWebSiteJsonLd(props)
    return <JsonLd data={data} />
}
