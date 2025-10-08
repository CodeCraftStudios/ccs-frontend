import "./BlogContent.css"
import { processBlogContentForSSR } from "@/lib/blogContentProcessor"

interface BlogContentProps {
  content: string
}

export default function BlogContent({ content }: BlogContentProps) {
  const processedContent = processBlogContentForSSR(content)

  return (
    <div className="blog-content">
      <div
        className="content-wrapper"
        dangerouslySetInnerHTML={{ __html: processedContent }}
      />
    </div>
  )
}
