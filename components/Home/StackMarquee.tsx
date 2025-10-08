import { getData } from "@/lib/axios";
import { SERVER_ENDPOINT } from "@/lib/consts";
import React from "react";
import Marquee from "react-fast-marquee";

export const StackMarquee = async () => {
    let response: any = await getData("/api/stack")
    let stack = response.data  // Extract the data array from the response

    return (
        <div className="max-w-7xl mx-auto mt-5 space-y-0">
            <div
            className="text-center"
            >
                <p className="text-sm font-medium text-muted-foreground superfont tracking-wide">
                Technologies We Work With
                </p>
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
                    {stack.map((item: any) => (
                        <div
                            key={item.id}
                            className="mx-5 flex items-center gap-3 px-6 py-3 bg-card/50 border border-border/50 rounded-lg backdrop-blur-sm hover:bg-card/70 transition-all duration-300 flex-shrink-0 min-w-[180px]"
                        >
                            <img className="text-2xl h-12 w-12" alt={`${item.name} logo`} src={`${SERVER_ENDPOINT}${item.logo}`}/>
                            <span className="text-sm font-medium text-foreground whitespace-nowrap superfont">{item.name}</span>
                        </div>
                    ))}
                    </Marquee>
                </div>
            </div>
            
        </div>
    )
};