import type { BreadcrumbList, WithContext } from 'schema-dts'

import { buildBreadcrumbJsonLd } from '../../schemas/breadcrumb.schema.js'
import type { BreadcrumbSchemaProps } from '../../types/schema'
import { JsonLd } from '../JsonLd.component'

export function BreadcrumbSchema(props: BreadcrumbSchemaProps) {
    const data: WithContext<BreadcrumbList> = buildBreadcrumbJsonLd(props)
    return <JsonLd data={data} />
}
