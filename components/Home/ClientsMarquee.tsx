import { getData } from "@/lib/axios";
import { SERVER_ENDPOINT } from "@/lib/consts";
import React from "react";
import Marquee from "react-fast-marquee";

export const ClientsMarquee = async () => {
    let response: any = await getData("/api/portfolio/list")
    let portfolio = response.data  // Extract the data array from the response

    return (
        <div className="max-w-7xl mx-auto py-20">
            <div
            className="text-center"
            >
                <h2 className="superfont text-3xl md:text-5xl font-bold mb-4">
                    Our <span className="text-primary">Clients</span>
                </h2>
                <p className="text-xl text-muted-foreground">Trusted by industry leaders</p>
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
                    {portfolio.map((item: any) => (
                        <div
                            key={item.id}
                            className="mx-5 flex flex-col items-center gap-3 px-6 py-3 bg-card/50 rounded-lg backdrop-blur-sm  transition-all duration-300 flex-shrink-0 min-w-[180px]"
                        >
                            <img className="h-20" alt={`${item.name} logo`} src={`${SERVER_ENDPOINT}${item.logo}`}/>
                            
                        </div>
                    ))}
                    </Marquee>
                </div>
            </div>
            
        </div>
    )
};