import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const certificates = [
  "Google Cloud AI/ML Professional",
  "IBM Machine Learning with Python",
  "IBM Deep Learning with PyTorch",
  "IBM Neural Networks with PyTorch",
  "IBM Generative AI Development",
  "IBM Agentic AI with CrewAI & AutoGen",
  "IBM Agentic AI with LangChain & LangGraph",
  "Board Infinity AI Agents",
  "Meta APIs",
  "Microsoft AI & Machine Learning",
  "NVIDIA AI Infrastructure & Operations",
  "NVIDIA Networking",
  "JP Morgan Software Engineering",
  "Anthropic Model Context Protocol (MCP)",
  "University of Pennsylvania FinTech: Foundations, Payments & Regulations",
]

const certificateProviders = {
  "Google Cloud AI/ML Professional": "Google",
  "IBM Machine Learning with Python": "IBM",
  "IBM Deep Learning with PyTorch": "IBM",
  "IBM Neural Networks with PyTorch": "IBM",
  "IBM Generative AI Development": "IBM",
  "IBM Agentic AI with CrewAI & AutoGen": "IBM",
  "IBM Agentic AI with LangChain & LangGraph": "IBM",
  "Board Infinity AI Agents": "Board Infinity",
  "Meta APIs": "Meta",
  "Microsoft AI & Machine Learning": "Microsoft",
  "NVIDIA AI Infrastructure & Operations": "NVIDIA",
  "NVIDIA Networking": "NVIDIA",
  "JP Morgan Software Engineering": "JP Morgan",
  "Anthropic Model Context Protocol (MCP)": "Anthropic",
  "University of Pennsylvania FinTech: Foundations, Payments & Regulations": "University of Pennsylvania",
}

export default function Certificates() {
  return (
    <section id="certificates" aria-labelledby="certificates-title" className="relative py-16 md:py-24">
      <div className="container mx-auto px-4">
        <header className="mb-8 md:mb-12">
          <h2 id="certificates-title" className="text-3xl md:text-4xl font-semibold text-balance">
            Certificates
          </h2>
          <p className="text-muted-foreground mt-2">
            A selection of certifications highlighting learning across ML, data, networking, and cloud.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((name) => {
            const provider = certificateProviders[name] || "Verified"
            return (
              <Card
                key={name}
                className="group rounded-2xl border border-[var(--glass-edge)] bg-[var(--glass)] backdrop-blur-md transition-shadow hover:ring-2 hover:ring-[var(--neon)]/60 hover:shadow-[0_0_36px_var(--neon)]"
              >
                <CardHeader>
                  <CardTitle className="text-pretty text-base md:text-lg">{name}</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground text-sm">- by {provider}</CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
