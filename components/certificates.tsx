import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const certificates = [
  // Keeping titles as provided
  "Machine Learning on Google Cloud",
  "IBM RAG and Agentic AI ",
  " Google Data Analytics",
  "IBM Generative AI Engineering",
  "The Bits and Bytes of Computer Networking by Google",
  "Cloud Computing",
  "MARKETING ANALYSIS",
]

const courseraTitles = new Set([
  "Machine Learning on Google Cloud",
  "IBM RAG and Agentic AI",
  "Google Data Analytics",
  "IBM Generative AI Engineering",
  "The Bits and Bytes of Computer Networking by Google",
])

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
          {certificates.map((nameRaw) => {
            const name = nameRaw.trim()
            const providerNote = courseraTitles.has(name) ? "Coursera" : "NPTEL"
            return (
              <Card
                key={name}
                className="group rounded-2xl border border-[var(--glass-edge)] bg-[var(--glass)] backdrop-blur-md transition-shadow hover:ring-2 hover:ring-[var(--neon)]/60 hover:shadow-[0_0_36px_var(--neon)]"
              >
                <CardHeader>
                  <CardTitle className="text-pretty">{name}</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">{providerNote}</CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
