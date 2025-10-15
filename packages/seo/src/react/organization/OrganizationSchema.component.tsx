import type { Organization, WithContext } from 'schema-dts'

import { buildOrganizationJsonLd } from '../../schemas/organization.schema'
import type { OrganizationSchemaProps } from '../../types/schema'
import { JsonLd } from '../JsonLd.component'

export function OrganizationSchema(props: OrganizationSchemaProps) {
    const data: WithContext<Organization> = buildOrganizationJsonLd(props)
    return <JsonLd data={data} />
}
