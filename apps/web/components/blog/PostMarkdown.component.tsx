// no-op
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeHighlight from 'rehype-highlight'
import rehypeRaw from 'rehype-raw'
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

/**
 * Server component that renders Markdown to HTML using remark/rehype.
 * We do not allow arbitrary raw HTML by default; rehype-raw is kept but can be removed
 * or replaced with a sanitizer if content may include HTML.
 */
export async function PostMarkdown({
    content,
    className = '',
}: PostMarkdownProps) {
    const file = await remark()
        .use(remarkGfm)
        .use(remarkRehype, { allowDangerousHtml: true })
        // Note: If content may contain user-provided HTML, consider rehype-sanitize
        .use(rehypeRaw)
        .use(rehypeSlug)
        .use(rehypeAutolinkHeadings, {
            behavior: 'wrap',
            properties: { className: ['anchor'] },
        })
        .use(rehypeHighlight)
        .use(rehypeStringify, { allowDangerousHtml: true })
        .process(content)

    const html = String(file)

    return (
        <div
            className={`prose prose-neutral dark:prose-invert max-w-none ${className}`}
            dangerouslySetInnerHTML={{ __html: html }}
        />
    )
}
