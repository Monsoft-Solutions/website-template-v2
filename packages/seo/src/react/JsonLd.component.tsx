import type { Thing, WithContext } from 'schema-dts'

import { sanitizeForJsonLd } from '../utils'

type JsonLdProps<T extends Thing> = {
    data: WithContext<T>
}

export function JsonLd<T extends Thing>({ data }: JsonLdProps<T>) {
    const json = sanitizeForJsonLd(data)
    return (
        <script
            type='application/ld+json'
            dangerouslySetInnerHTML={{ __html: json }}
        />
    )
}
