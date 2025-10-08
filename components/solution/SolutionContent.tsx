import "./SolutionContent.css"
import { processPortfolioOverviewForSSR } from "@/lib/blogContentProcessor"

interface SolutionContentProps {
  description: string
}

export default function SolutionContent({ description }: SolutionContentProps) {
  const processedDescription = processPortfolioOverviewForSSR(description)

  return (
    <div className="solution-content">
      <div
        className="solution-wrapper"
        dangerouslySetInnerHTML={{ __html: processedDescription }}
      />
    </div>
  )
}
