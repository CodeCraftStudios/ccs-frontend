import "./ProjectOverview.css"
import { processPortfolioOverviewForSSR } from "@/lib/blogContentProcessor"

interface ProjectOverviewProps {
  overview: string
}

export default function ProjectOverview({ overview }: ProjectOverviewProps) {
  const processedOverview = processPortfolioOverviewForSSR(overview)

  return (
    <div className="project-overview space-y-4">
      <h2 className="font-superfont text-2xl md:text-3xl font-bold text-white mb-6">Overview</h2>
      <div
        className="overview-content"
        dangerouslySetInnerHTML={{ __html: processedOverview }}
      />
    </div>
  )
}
