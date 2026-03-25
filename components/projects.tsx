"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

const projects = [
  {
    title: "Real-Time Object Detection",
    desc: "YOLOv5-based real-time object detection system, trained and deployed with a custom dataset for accurate detection.",
    href: "https://github.com/Anikate001/real-time-object-detection",
  },
  {
    title: "Few-Shot Multimodal Classifier",
    desc: "Built a model that classifies images & text using few-shot learning. Combines multimodal embeddings for flexible AI tasks.",
    href: "https://github.com/Anikate001/Few-Shot-Multimodal-Classifier",
  },
  {
    title: "Fake News Detection",
    desc: "NLP-based model for detecting and classifying fake news articles using text analysis and machine learning techniques.",
    href: "https://github.com/Anikate001/Fake_News_Detection",
  },
  {
    title: "Movie Recommendation System",
    desc: "Collaborative filtering and content-based recommendation engine using cosine similarity and matrix factorization.",
    href: "https://github.com/Anikate001/Movie-Recommendation-System",
  },
  {
    title: "Credit Card Fraud Detection",
    desc: "ML model for detecting fraudulent transactions using classification techniques and anomaly detection algorithms.",
    href: "https://github.com/Anikate001/CREDIT_CARD_FRAUD_DETECTION",
  },
  {
    title: "Stock Prediction Model",
    desc: "Time-series forecasting model for predicting stock prices using LSTM and ensemble learning methods.",
    href: "https://github.com/Anikate001/Stock_Prediction_Model",
  },
  {
    title: "ReadySetHire",
    desc: "Job recommendation and recruitment matching platform using collaborative filtering and profile analysis.",
    href: "https://github.com/Anikate001/ReadySetHire",
  },
  {
    title: "Plant Disease Recognition Model",
    desc: "Deep learning model for identifying plant diseases via image classification using CNN architectures.",
    href: "https://github.com/Anikate001/Plant-Disease-Recognition-Model",
  },
  {
    title: "Autonomous Retail Shelf Assistant",
    desc: "Computer vision system for monitoring retail shelves, detecting empty spots, and alerting staff for restocking.",
    href: "https://github.com/Anikate001/Autonomous-Retail-Shelf-Assistant",
  },
  {
    title: "Portfolio Website",
    desc: "Personal portfolio website showcasing ML projects, certifications, and professional experience with interactive UI.",
    href: "https://github.com/Anikate001/portfolio_website",
  },
  {
    title: "Fine-tune Mistral 7B with QLoRA",
    desc: "Efficient fine-tuning of Mistral 7B using QLoRA (Quantized LoRA) for domain-specific language tasks.",
    href: "https://github.com/Anikate001/Fine-tune-Mistral-7B-with-QLoRA",
  },
  {
    title: "RAG Chatbot",
    desc: "Retrieval-Augmented Generation chatbot combining LLMs with vector databases for intelligent information retrieval.",
    href: "https://github.com/Anikate001/rag-chatbot",
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
              <div className="mt-4">
                <Button
                  asChild
                  className="bg-[var(--glass)] border border-[var(--glass-edge)] hover:bg-[var(--glass-strong)] hover:shadow-[0_0_24px_var(--neon)] hover:animate-[pulseGlow_1.6s_ease-in-out_infinite]"
                >
                  <a href={p.href} target="_blank" rel="noreferrer noopener" aria-label={`Open ${p.title} on GitHub`}>
                    GitHub
                  </a>
                </Button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
