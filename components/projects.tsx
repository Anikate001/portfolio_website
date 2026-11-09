"use client"

import { motion } from "framer-motion"

type Project = {
  title: string
  desc: string
  tags: string[]
  href: string
  demo?: { label: string; href: string }
}

const projects: Project[] = [
  {
    title: "NEXUS: Multi-Agent Research Platform",
    desc: "Five LangGraph agents (Planner, Researcher, Analyst, Writer, Critic) turn a question into a cited research report, with a Critic-driven revision loop and optional human approval. Benchmarked at 10/10 completed runs, 22 s median, 12 citations per report.",
    tags: ["LangGraph", "Gemini", "FastAPI", "WebSockets", "PostgreSQL", "Redis", "Docker"],
    href: "https://github.com/Anikate001/Multi-Agent-System-Architechture",
  },
  {
    title: "DocuMind: RAG Chatbot for PDFs",
    desc: "Ask questions about your PDFs and get answers with citations, or a refusal when the documents don't say. An evaluation harness on a 40-question golden set showed 500-word chunks were losing evidence; retuning raised answer correctness from 53% to 90%.",
    tags: ["RAG", "pgvector", "Supabase", "Sentence-Transformers", "Groq", "Streamlit"],
    href: "https://github.com/Anikate001/DocuMind-rag-chatbot",
    demo: { label: "Live demo", href: "https://documind-anikate.streamlit.app" },
  },
  {
    title: "Mistral-7B QLoRA Fine-Tune",
    desc: "Fine-tuned Mistral-7B-Instruct for customer support with 4-bit QLoRA on a free T4 (0.58% of parameters trained). On 81 held-out questions, ROUGE-L rose 59%, while an LLM judge still preferred the base model's fuller answers: a trade-off two metrics revealed.",
    tags: ["QLoRA", "PEFT", "TRL", "bitsandbytes", "MLflow", "Hugging Face"],
    href: "https://github.com/Anikate001/-Fine-tune-Mistral-7B-with-QLoRA",
    demo: { label: "Model on Hugging Face", href: "https://huggingface.co/Anikate0/mistral-7b-bitext-support-qlora" },
  },
  {
    title: "AI Job Application Agent",
    desc: "A LangGraph agent that fills job applications on Workday, Greenhouse and Lever with Playwright, pausing for human approval before anything is submitted.",
    tags: ["LangGraph", "Playwright", "OpenAI", "SQLite"],
    href: "https://github.com/Anikate001/AI-JOB-APPLICATION-AGENT---TCS",
  },
]

export default function Projects() {
  return (
    <section id="projects" className="relative py-10 md:py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <header className="mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-balance">Projects</h2>
          <p className="text-muted-foreground mt-2">Selective highlights that demonstrate breadth and depth.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {projects.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              className="rounded-2xl border border-[var(--glass-edge)] bg-[var(--glass)] backdrop-blur-md p-5 md:p-6 hover:ring-2 hover:ring-[var(--neon)]/60 hover:shadow-[0_0_30px_var(--neon)] transition"
            >
              <h3 className="text-lg md:text-xl font-semibold">{p.title}</h3>
              <p className="text-sm md:text-base text-muted-foreground mt-2">{p.desc}</p>
              <ul className="mt-3 flex flex-wrap gap-2" aria-label="Technologies">
                {p.tags.map((tag) => (
                  <li key={tag} className="text-xs rounded-full border border-[var(--glass-edge)] px-2.5 py-1 text-muted-foreground">
                    {tag}
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  href={p.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={`Open ${p.title} on GitHub`}
                  className="inline-flex items-center rounded-md border border-[var(--glass-edge)] px-4 py-2 text-sm font-medium text-foreground transition hover:border-[var(--neon)] hover:shadow-[0_0_24px_var(--neon)]"
                >
                  GitHub
                </a>
                {p.demo && (
                  <a
                    href={p.demo.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={`${p.demo.label}: ${p.title}`}
                    className="inline-flex items-center rounded-md bg-[var(--neon)] px-4 py-2 text-sm font-medium text-black transition hover:shadow-[0_0_24px_var(--neon)]"
                  >
                    {p.demo.label}
                  </a>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
