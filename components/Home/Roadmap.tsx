import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'

const Roadmap = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
  <div className="max-w-7xl mx-auto">
    <div className="text-center mb-16">
      <h2 className="superfont text-3xl md:text-5xl font-bold mb-4">
        <span className="text-primary">Roadmap</span> For Our Projects
      </h2>
      <p className="text-sm text-muted-foreground">
        *Estimations are based on our average projects and don't represent actual time frames.
      </p>
    </div>

    <div className="max-w-4xl mx-auto">
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary via-primary/50 to-primary opacity-30"></div>

        <div className="space-y-16">
          {[
            {
              step: 1,
              title: "We Meet",
              time: "Est. 1-3 days",
              description:
                "We hop on a call with you, and ask a couple of questions based on your requirements, like what kind service do you request, what colors, fonts, and themes do you have in mind.",
              color: "orange",
              side: "right",
            },
            {
              step: 2,
              title: "We Figure Out Pricing",
              time: "Est. 1-5 days",
              description:
                "We proceed to consult our developers, designers and staff about costs, estimated time frame, tools that we would use, and such. We call you back and discuss pricing.",
              color: "blue",
              side: "left",
            },
            {
              step: 3,
              title: "Contract Signed, and Downpayment Processed",
              time: "Est. 1-7 days",
              description:
                "Once we come up with an agreed price, timeline, and process downpayment and contract, we then begin the project.",
              color: "green",
              side: "right",
            },
            {
              step: 4,
              title: "Research Phase",
              time: "Est. 1-14 days",
              description:
                "We start researching about your niche, audience, and branding. We begin analyzing data and similar services from your competitors, like what's the age to most people, what states, countries, and regions do people search from.",
              color: "purple",
              side: "left",
            },
            {
              step: 5,
              title: "Design Phase",
              time: "Est. 1-14 days",
              description:
                "We begin planning and designing your service, creating prototypes, testing different ideas, colors, fonts, images, etc.",
              color: "orange",
              side: "right",
            },
            {
              step: 6,
              title: "Frontend Development",
              time: "Est. 1-30 days",
              description:
                "Our team begins to code the frontend (what users interact with), using many technologies, and modules.",
              color: "blue",
              side: "left",
            },
            {
              step: 7,
              title: "Backend Development",
              time: "Est. 1-30 days",
              description:
                "Around the same time as Frontend Development, we begin designing the database, tables, creating the API's that connect with the Frontend, Controllers, and other techy stuff.",
              color: "green",
              side: "right",
            },
            {
              step: 8,
              title: "Revisions",
              time: "Est. 1-15 days per revision",
              description:
                "For every project, you get 3 FREE revisions, and after that, the rate applied in the contract. We go back and forth to ensure your satisfaction.",
              color: "purple",
              side: "left",
            },
            {
              step: 9,
              title: "Service Deployment",
              time: "Est. 1-3 days",
              description: "We deploy your service out to the world so that everyone can access it.",
              color: "orange",
              side: "right",
            },
            {
              step: 10,
              title: "Project Finalized",
              time: "Hooray!",
              description:
                "Once the project is live, we process the rest of the payment, payout our hardworking team, and then give you a lifetime support, with relatively cheap costs to update your service.",
              color: "blue",
              side: "left",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="relative"
            >
              <div className={`flex items-center ${item.side === "left" ? "flex-row-reverse" : ""}`}>
                {/* Step number circle */}
                <div className={`${item.side === "left" ? "ml-8" : "mr-8"} flex-shrink-0 relative z-10`}>
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center font-bold text-lg border-4 transition-all duration-300 hover:scale-110
                    ${item.color === "orange" ? "bg-orange-500 border-orange-400 text-white" : ""}
                    ${item.color === "blue" ? "bg-blue-500 border-blue-400 text-white" : ""}
                    ${item.color === "green" ? "bg-green-500 border-green-400 text-white" : ""}
                    ${item.color === "purple" ? "bg-primary border-primary/70 text-primary-foreground" : ""}
                  `}
                  >
                    {item.step}
                  </div>
                </div>

                {/* Content card */}
                <div
                  className={`flex-1 max-w-md ${item.side === "left" ? "mr-8" : "ml-8"}`}
                >
                  <Card
                    className={`border-2 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]
                    ${item.color === "orange" ? "border-orange-500/30 hover:border-orange-500/50 hover:shadow-orange-500/10" : ""}
                    ${item.color === "blue" ? "border-blue-500/30 hover:border-blue-500/50 hover:shadow-blue-500/10" : ""}
                    ${item.color === "green" ? "border-green-500/30 hover:border-green-500/50 hover:shadow-green-500/10" : ""}
                    ${item.color === "purple" ? "border-primary/30 hover:border-primary/50 hover:shadow-primary/10" : ""}
                  `}
                  >
                    <CardHeader>
                      <CardTitle className="text-xl">{item.title}</CardTitle>
                      <p
                        className={`text-sm font-medium
                        ${item.color === "orange" ? "text-orange-400" : ""}
                        ${item.color === "blue" ? "text-blue-400" : ""}
                        ${item.color === "green" ? "text-green-400" : ""}
                        ${item.color === "purple" ? "text-primary" : ""}
                      `}
                      >
                        {item.time}
                      </p>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{item.description}</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
</section>
  )
}

export default Roadmap
