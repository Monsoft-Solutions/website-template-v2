// no-op
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeHighlight from 'rehype-highlight'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'
import { defaultSchema } from 'rehype-sanitize'
import rehypeSlug from 'rehype-slug'
import rehypeStringify from 'rehype-stringify'
import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import 'server-only'

type PostMarkdownProps = {
    content: string
    className?: string
}

// Create a safe schema that extends the default schema to allow syntax highlighting
const sanitizeSchema = {
    ...defaultSchema,
    attributes: {
        ...defaultSchema.attributes,
        // Allow className on code and pre elements for syntax highlighting
        code: [...(defaultSchema.attributes?.code || []), 'className'],
        pre: [...(defaultSchema.attributes?.pre || []), 'className'],
        // Allow className on span elements for syntax highlighting tokens
        span: [...(defaultSchema.attributes?.span || []), 'className'],
        // Allow className on div elements for code blocks
        div: [...(defaultSchema.attributes?.div || []), 'className'],
        // Allow className on anchor elements for autolink headings
        a: [...(defaultSchema.attributes?.a || []), 'className', 'href', 'id'],
        // Allow id on heading elements for slug generation
        h1: [...(defaultSchema.attributes?.h1 || []), 'id'],
        h2: [...(defaultSchema.attributes?.h2 || []), 'id'],
        h3: [...(defaultSchema.attributes?.h3 || []), 'id'],
        h4: [...(defaultSchema.attributes?.h4 || []), 'id'],
        h5: [...(defaultSchema.attributes?.h5 || []), 'id'],
        h6: [...(defaultSchema.attributes?.h6 || []), 'id'],
    },
}

/**
 * Server component that renders Markdown to HTML using remark/rehype.
 * HTML content is sanitized using rehype-sanitize to prevent XSS attacks
 * while preserving necessary attributes for syntax highlighting and navigation.
 */
export async function PostMarkdown({
    content,
    className = '',
}: PostMarkdownProps) {
    const file = await remark()
        .use(remarkGfm)
        .use(remarkRehype, { allowDangerousHtml: true })
        .use(rehypeRaw)
        .use(rehypeSanitize, sanitizeSchema)
        .use(rehypeSlug)
        .use(rehypeAutolinkHeadings, {
            behavior: 'wrap',
            properties: { className: ['anchor'] },
        })
        .use(rehypeHighlight)
        .use(rehypeStringify)
        .process(content)

    const html = String(file)

    return (
        <div
            className={`prose prose-neutral dark:prose-invert max-w-none ${className}`}
            dangerouslySetInnerHTML={{ __html: html }}
        />
    )
}
