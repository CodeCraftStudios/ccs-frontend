import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { getData } from '@/lib/axios'
import { SERVER_ENDPOINT } from '@/lib/consts'
import { Button } from '../ui/button'

const Solutions = async () => {
  const response:any = await getData('/api/solution/list') // Adjust endpoint as needed
  const solutions = response.data || []

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="superfont text-3xl md:text-5xl font-bold mb-4">
            <span className="text-primary">SOLUTIONS</span>
          </h2>
          <p className="text-xl text-muted-foreground">For Specific Clients</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutions.map((solution:any) => (
            <div key={solution.id}>
              <Card className="h-full hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 border-2 hover:border-primary/30 overflow-hidden pt-0">
                <div className="relative aspect-[3/2] overflow-hidden">
                  <img
                    src={`${SERVER_ENDPOINT}${solution.image}`}
                    alt={solution.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                </div>
                <CardHeader>
                  <CardTitle className="text-2xl">{solution.name}</CardTitle>
                  <p className="text-sm text-primary font-semibold mt-2">
                    Starting at {solution.starting_at}
                  </p>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {solution.short_description}
                  </p>
                
                <Button className='mt-5 mb-2'>Learn More</Button>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Solutions