import React from 'react'
import { Button } from '../ui/button'
import { Card } from '../ui/card'
import Marquee from 'react-fast-marquee'
import { Star } from 'lucide-react'
import Link from 'next/link'

const Reviews = () => {
    const testimonials = [
        {
            name: "Joe MacAlpine",
            company: "Beauty By Hammer LLC.",
            content:
            "John at CodeCraft is highly efficient and consistently delivers a top-quality product. He’s easy to work with, always accessible, and has all the answers. His professionalism and customer service are unmatched. Five stars!",
            rating: 5,
        },
        {
            name: "Kushal Verma",
            company: "Verma Contracting Inc.",
            content:
            `Outstanding Website Developer – Fast, Reliable, and Highly Skilled. Working with John has been an absolute pleasure from start to finish. If you're looking for someone who creates high-quality websites, delivers results quickly, and is 100% reliable, look no further.`,
            rating: 5,
        },
        {
            name: "Sanjeev Chhibber",
            company: "Photographer Langing Page",
            content:
            "The developer John was very professional and when me and my business needed help setting up a website. He went above and beyond and gave us more than what we could’ve asked for. His website designs were very eye catching and he got it done within a reasonable timeframe. His prices are affordable as well. I enjoyed working with him and I implore others to do so as well.",
            rating: 5,
        },
    ]
    return (
        <div className="max-w-7xl mx-auto py-20">
            <div
            className="text-center"
            >
                <h2 className="superfont text-3xl md:text-5xl font-bold mb-4">
                    What Our Clients <span className="text-primary">Say</span>
                </h2>
                <p className="text-xl text-muted-foreground">What our clients say.</p>
            </div>
            <div className="relative">
                <div
                className="flex overflow-hidden"
                style={{
                    maskImage:
                    "linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 12.5%, rgb(0, 0, 0) 87.5%, rgba(0, 0, 0, 0) 100%)",
                }}
                >
                    <Marquee
                        autoFill={true}
                        gradient={true}
                        gradientColor="transparent"
                        
                        pauseOnHover={true}
                        className="overflow-hidden py-12 items-center my-0"

                    >
                    {testimonials.map((item: any) => (
                        <div
                            key={item.id}
                            className="mx-5 flex flex-col items-center gap-3 px-6 py-3 bg-card/50 rounded-lg backdrop-blur-sm  transition-all duration-300 flex-shrink-0 min-w-[180px] max-w-2xl"
                        >
                            <Card className="p-8 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 border-2 hover:border-primary/30">
                            <div className="text-center">
                                <div className="flex justify-center mb-4">
                                
                                <div className='flex items-center justify-center'>
                                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                                </div>
                                </div>
                                <p className="text-lg text-muted-foreground mb-6 italic ">
                                "{item.content}"
                                </p>
                                <div>
                                <p className="font-semibold">{item.name}</p>
                                <p className="text-sm text-muted-foreground">{item.company}</p>
                                </div>
                            </div>
                            </Card>
                            
                        </div>
                    ))}
                    </Marquee>
                </div>
                <div className='flex items-center justify-center'>
                    <Link href="https://www.google.com/search?sca_esv=759f56e08d27413b&si=AMgyJEtREmoPL4P1I5IDCfuA8gybfVI2d5Uj7QMwYCZHKDZ-E14O5iFPCIt-skpZXfY1LoPWTqdnTPRonXdcZvjrCDkHGKFZjgm3usiAFWVZ-0RXGM49Yp6QpKzklGor6l7mGCFzQvN7rBXHWL-wMsvab_GmwzupxQ%3D%3D&q=CodeCraft+Studios+LLC+Reviews&sa=X&ved=2ahUKEwiyg_eJjsiPAxVH7skDHZBCC4gQ0bkNegQIIxAE&biw=1745&bih=828&dpr=1.1" target="_blank">
                        <Button size={"lg"}>View More Reviews</Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Reviews
