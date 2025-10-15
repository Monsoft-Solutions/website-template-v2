import { WebPageSchema } from '@workspace/seo/react'
import { Button } from '@workspace/ui/components/button'

import { seoConfig } from '@/lib/seo-config'

export default function Page() {
    return (
        <div className='flex min-h-svh items-center justify-center'>
            {/* JSON-LD minimal usage for homepage */}
            <WebPageSchema
                name={seoConfig.defaultMetadata.title}
                url={seoConfig.siteUrl}
                description={seoConfig.defaultMetadata.description}
            />
            <div className='flex flex-col items-center justify-center gap-4'>
                <h1 className='text-2xl font-bold'>Hello World</h1>
                <Button size='sm'>Button</Button>
            </div>
        </div>
    )
}
