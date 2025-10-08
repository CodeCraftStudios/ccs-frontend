import React from 'react'
import { Card, CardContent } from '../ui/card'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { ExternalLink } from 'lucide-react'
import { getData } from '@/lib/axios'
import { SERVER_ENDPOINT } from '@/lib/consts'
import Link from 'next/link'

const Portfolio = async () => {
  const response:any = await getData('/api/portfolio/list')
  const portfolioItems = response.data || []

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="superfont text-3xl md:text-5xl font-bold mb-4">
            <span className="text-primary">PORTFOLIO</span>
          </h2>
          <p className="text-xl text-muted-foreground">See Our Work</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {portfolioItems.map((project:any) => (
            <div key={project.id} className="group">
              <Card className="overflow-hidden hover-lift py-0 h-full bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-300">
                <div className="relative overflow-hidden aspect-video ">
                  <img
                    src={`${SERVER_ENDPOINT}${project.cover}`}
                    alt={project.name}
                    className="w-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <CardContent className="px-6 py-0">
                  <img
                    src={`${SERVER_ENDPOINT}${project.logo}`}
                    className='h-20'
                    alt={`${project.name} - ${project.short_description}`}
                  />
                  {project.short_description && (
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {project.short_description}
                    </p>
                  )}
                  <div>
                    <Link href={`/project/${project.slug}`}>
                      <Button size="sm" className="w-full my-4">
                        View Project
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Portfolio