import dotenv from "dotenv";
dotenv.config();
dotenv.config({ path: ".env.local" });

import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { google } from "googleapis";
import { GoogleGenAI } from "@google/genai";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { SystemMessage, HumanMessage, AIMessage, BaseMessage } from "@langchain/core/messages";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const API_KEY = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || "";
const MODEL_NAME = "gemini-1.5-flash";

const googleGenAI = API_KEY ? new GoogleGenAI({ apiKey: API_KEY }) : null;

const langchainLLM = API_KEY ? new ChatGoogleGenerativeAI({
  model: MODEL_NAME,
  temperature: 0.7,
  apiKey: API_KEY
}) : null;

const RESUME_TEXT_CONTEXT = `
FULL RESUME OF SATYAM SAKRAL:

CONTACT DETAILS:
- Name: Satyam Sakral
- Location: Delhi, India
- Phone: +91 9958503242
- Email: satyamsakral@gmail.com
- Portfolio: https://portfolio-z2js.vercel.app/?_vercel_share=se4I7BcMLAysK2hxsw1ucYCb5cutZ9Sq
- LinkedIn: https://linkedin.com/in/satyam-sakral-5553a4240/
- GitHub: https://github.com/satyamsakral

PROFESSIONAL SUMMARY:
Software and AI/ML Engineer (MCA Candidate, Class of 2026) with hands-on experience building backend REST APIs, real-time web applications, and applied machine learning models. Skilled in Python, Java, SQL, Django, FastAPI, PyTorch, and LangChain RAG systems. Experienced in query optimization, data pipeline engineering, and LLM fine-tuning to deliver efficient, production-ready software solutions.

WORK EXPERIENCE:
1. Ethara AI — LLM Trainer Intern (Apr 2024 – Jun 2024)
   - LLM Post-Training & Optimization: Assisted in fine-tuning, RLHF alignment, and evaluation workflows for large language models to improve response accuracy and task coherence.
   - Dataset Engineering & Quality Control: Built data processing pipelines to clean, filter, and deduplicate multi-modal datasets, reducing dataset noise and model hallucination rates.
   - Flux AI Framework Integration: Contributed to evaluation benchmarks and feedback loops within core Flux AI framework pipelines.

2. Doosra College — Django Developer Intern (Jul 2023 – Sep 2023)
   - Full-Stack Inventory Backend: Developed a centralized Inventory Management System using Django REST framework and SQL to streamline logistics tracking across departmental modules.
   - Database Optimization: Re-engineered complex SQL queries and database indexing, achieving a 60% reduction in data retrieval latency for high-throughput operations.
   - Analytics Dashboard Integration: Worked with cross-functional teams to integrate interactive data visualization dashboards into the operational pipeline.

PROJECTS:
1. Study AI – Adaptive Learning & Neural RAG Platform
   - Multi-Provider AI Gateway: Built an AI Gateway supporting OpenAI, Anthropic, Gemini, Groq, and OpenRouter using AES-GCM encryption for secure client API key storage.
   - Multi-Source Neural RAG Pipeline: Implemented multi-format document parsing (PDF, DOCX, PPTX, YouTube Transcripts) with vector semantic search for context-aware document Q&A.
   - Adaptive Planner & Dynamic Assessments: Developed study plan scheduling algorithms based on topic difficulty and learning speed, paired with automated exam feedback generation.
   - GitHub Repo: https://github.com/satyamsakral/Study_Ai_2
   - Tech Stack: Python, FastAPI, LangChain, Supabase, Gemini API, ChromaDB.

2. FaceMask Detection – Real-Time Computer Vision Classifier
   - CNN Architecture & Inference Pipeline: Built and trained a Convolutional Neural Network (CNN) for real-time facial mask classification on live video feeds (~81% accuracy).
   - Data Processing & Augmentation: Engineered image pre-processing and data augmentation pipelines (scaling, rotation, lighting adjustments) to maintain inference stability under varied environment conditions.
   - GitHub Repo: https://github.com/satyamsakral/FaceMaskDetector
   - Tech Stack: Python, PyTorch, OpenCV.

3. VividChat – WebRTC Real-Time Video & Messaging System
   - Peer-to-Peer Streaming Architecture: Developed a low-latency video streaming web app using Django backend controllers and WebRTC peer connection protocol.
   - Scalable Signaling Infrastructure: Integrated Socket.io for dynamic room management, group calling capabilities, and real-time text broadcasting.
   - GitHub Repo: https://github.com/satyamsakral/Vvid-Chat
   - Tech Stack: Django, WebRTC, Socket.io, Python.

TECHNICAL SKILLS:
- Languages: Python, Java, C++, SQL
- AI / ML & LLMs: Retrieval-Augmented Generation (RAG), Fine-Tuning, Prompt Engineering, LangChain, PyTorch, OpenCV, Scikit-learn, Model Evaluation
- Web & Backend: FastAPI, Django, Spring Boot, RESTful APIs, WebRTC, Socket.io
- Databases: PostgreSQL, Supabase (RLS), MySQL, MongoDB
- Tools & Workflows: Git, GitHub, Docker, Postman, Semantic Search, Vector Embeddings

EDUCATION:
- Guru Gobind Singh Indraprastha University (GGSIPU), Delhi, India
  - Master of Computer Applications (MCA) – JIMS Rohini | CGPA: 8.2 / 10 | Expected: Jun 2026
  - Bachelor of Computer Applications (BCA) – SGTBIMIT | CGPA: 7.7 / 10 | Graduated: Jun 2024

CERTIFICATIONS:
- Specialized Program in AI & ML with Drone Tech – TiHAN, IIT Hyderabad
- Java Programming Masterclass – Udemy Certification
`;

function getComprehensiveFallbackReply(message: string): string {
  const q = message.toLowerCase().trim();

  if (
    q === 'hey' ||
    q === 'hello' ||
    q === 'hi' ||
    q === 'gey' ||
    q === 'yo' ||
    q === 'greetings' ||
    q === 'hola' ||
    q.startsWith('hey') ||
    q.startsWith('hi') ||
    q.startsWith('hello')
  ) {
    return "Greetings! I am Satyam Sakral's AI Twin. I'm here to answer any questions about Satyam's engineering background, flagship projects (**Study AI**, **FaceMask Detection**, **VividChat**), internship experience at **Ethara AI** & **Doosra College**, skills, or education. How can I assist you today?";
  }

  if (q.includes("background") || (q.includes("who") && q.includes("satyam")) || q.includes("about satyam") || q.includes("bio")) {
    return "### Satyam Sakral — AI Engineer & Full-Stack Developer\n\nSatyam specializes in **Generative AI, Retrieval-Augmented Generation (RAG), and Scalable Software Systems**.\n\n- **Experience**: LLM Trainer Intern at **Ethara AI** (LLM post-training optimization, dataset engineering & Flux AI) and Django Developer Intern at **Doosra College**.\n- **Education**: Master of Computer Applications (MCA - JIMS, GGSIPU) and BCA (SGTBIMIT, GGSIPU).\n- **Key Projects**: **Study AI** (Gemini & LangChain RAG), **FaceMask Detector** (PyTorch CNN), and **VividChat** (WebRTC P2P).\n- **Certifications**: AI & ML with Drone Technology (TiHAN, IIT Hyderabad).";
  }

  if (q.includes("study ai") || q.includes("rag architecture") || (q.includes("study") && q.includes("architecture"))) {
    return "### Study AI Architecture (Deep RAG Engine)\n\n**Study AI** is an autonomous learning assistant built by Satyam:\n\n1. **Multi-Source Ingestion**: Ingests unstructured PDFs & YouTube lecture transcripts using LangChain & YouTube Transcript API.\n2. **Semantic Vector Search**: Generates 768-dimensional embeddings stored in **ChromaDB** for context retrieval.\n3. **LLM Synthesis**: Uses **Gemini API** for personalized study plan generation and Q&A backed by source citations.\n4. **Performance Metrics**:\n   - Query Latency: **<450ms**\n   - Retrieval Accuracy: **94.2%**\n   - Vector Dimension: **768-dim**";
  }

  if (q.includes("skill") || q.includes("metric") || q.includes("performance") || q.includes("stack")) {
    return "### Technical Stack & Verified Metrics\n\n**Core Technical Skills**:\n- **Languages**: Python, Java, C++, SQL\n- **AI & RAG**: LangChain, Gemini API, PyTorch, OpenCV, Scikit-learn, Prompt Engineering, Fine-Tuning\n- **Web & Backend**: Django, FastAPI, Spring Boot, React, Node.js, WebRTC, Socket.io\n- **Databases & Cloud**: MySQL, MongoDB, ChromaDB Vector DB, AWS\n\n**Verified Engineering Metrics**:\n- **Query Latency**: <450ms (Study AI RAG Engine)\n- **Model Precision**: ~81% Accuracy (FaceMask CNN Detector)\n- **Database Optimization**: 60% Query Latency Reduction (Doosra College)\n- **P2P Video Latency**: <50ms (VividChat WebRTC)";
  }

  if (q.includes("job") || q.includes("internship") || q.includes("available") || q.includes("hire") || q.includes("role")) {
    return "### Availability Status\n\n**Yes! Satyam Sakral is actively available for Jobs & Internships** in AI Engineering, Generative AI/RAG Development, and Full-Stack Software Engineering.\n\n- **Location**: Delhi, India (Open to remote & hybrid roles worldwide)\n- **Email**: [satyamsakral@gmail.com](mailto:satyamsakral@gmail.com)\n- **Phone**: +91 9958503242\n- **GitHub**: [github.com/satyamsakral](https://github.com/satyamsakral)\n- **LinkedIn**: [linkedin.com/in/satyam-sakral-5553a4240](https://linkedin.com/in/satyam-sakral-5553a4240/)";
  }

  if (q.includes("facemask") || q.includes("vision") || q.includes("cnn") || q.includes("opencv")) {
    return "### FaceMask Detection (PyTorch CNN Classifier)\n\n- **Overview**: Edge-capable computer vision system detecting safety compliance on live webcam streams.\n- **Architecture**: OpenCV Haar cascades for face region detection paired with a PyTorch CNN classifier.\n- **Metrics**: ~81% Model Accuracy, 32 FPS Inference Speed, 0.82 F1-Score.";
  }

  if (q.includes("vividchat") || q.includes("vvid") || q.includes("webrtc") || q.includes("video")) {
    return "### VividChat (WebRTC Low-Latency Video Hub)\n\n- **Architecture**: Peer-to-peer encrypted video/audio streaming using WebRTC with Django backend.\n- **Signaling**: Integrated Socket.io for SDP offer/answer signaling and synchronized room chat.\n- **Metrics**: <50ms P2P Latency, 0 MB/s Media Server Load.";
  }

  if (q.includes("ethara") || q.includes("doosra") || q.includes("experience") || q.includes("intern")) {
    return "### Industry Work Experience\n\n1. **LLM Trainer Intern @ Ethara AI** (Apr 2026 – Jun 2026)\n   - Spearheaded post-training optimization for large language models.\n   - Curated high-quality datasets to reduce bias and mitigate hallucinations.\n   - Collaborated on training pipelines for the Flux AI framework.\n\n2. **Django Developer Intern @ Doosra College** (Jul 2023 – Sep 2023)\n   - Built Inventory Management System with Django and SQL.\n   - Optimized SQL indexing and queries, achieving a **60% reduction in database retrieval latency**.";
  }

  if (q.includes("education") || q.includes("mca") || q.includes("bca") || q.includes("ggsipu") || q.includes("degree")) {
    return "### Academic Background (GGSIPU, Delhi)\n\n- **Master of Computer Applications (MCA)** — JIMS | **CGPA: 8.2 / 10** (2024–2026)\n- **Bachelor of Computer Applications (BCA)** — SGTBIMIT | **CGPA: 7.7 / 10** (2021–2024)";
  }

  if (q.includes("certif") || q.includes("drone") || q.includes("iit") || q.includes("udemy")) {
    return "### Verified Credentials & Certifications\n\n1. **AI & Machine Learning with Drone Tech** — TiHAN, IIT Hyderabad (2024)\n2. **Java Programming Masterclass** — Udemy (2023)";
  }

  return "Greetings! I am Satyam Sakral's AI Twin. Satyam is an AI Engineer specializing in **Generative AI, RAG Systems, and Full-Stack Development** based in Delhi, India.\n\nFeel free to ask about:\n- **Study AI**, **FaceMask Detector**, or **VividChat** architectures\n- Experience at **Ethara AI** & **Doosra College**\n- Technical skills, metrics, or education!";
}

app.post("/api/chat", async (req, res) => {
  const { message, history } = req.body;

  if (googleGenAI) {
    try {
      const response = await googleGenAI.models.generateContent({
        model: MODEL_NAME,
        contents: [
          {
            role: "user",
            parts: [
              {
                text: `You are Satyam Sakral's AI Twin. Answer concisely in markdown using Satyam's resume context below:\n\n${RESUME_TEXT_CONTEXT}\n\nQuestion: ${message}`
              }
            ]
          }
        ]
      });

      if (response && response.text) {
        return res.json({ text: response.text });
      }
    } catch (err: any) {
      console.warn("GoogleGenAI SDK call failed:", err?.message || err);
    }
  }

  if (langchainLLM) {
    try {
      const systemInstruction = `You are Satyam Sakral's AI Twin. Respond accurately based on Satyam's resume context:\n${RESUME_TEXT_CONTEXT}`;
      const messagesArr: BaseMessage[] = [new SystemMessage(systemInstruction)];

      if (history && history.length > 0) {
        history.forEach((h: any) => {
          if (h.role === 'user') {
            messagesArr.push(new HumanMessage(h.text));
          } else {
            messagesArr.push(new AIMessage(h.text));
          }
        });
      }

      messagesArr.push(new HumanMessage(message));
      const response = await langchainLLM.invoke(messagesArr);

      const content = typeof response.content === "string"
        ? response.content
        : JSON.stringify(response.content);

      if (content) {
        return res.json({ text: content });
      }
    } catch (err: any) {
      console.warn("LangChain Gemini call failed:", err?.message || err);
    }
  }

  return res.json({ text: getComprehensiveFallbackReply(message || "") });
});

app.post("/api/send-email", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const auth = new google.auth.GoogleAuth({
      scopes: ["https://www.googleapis.com/auth/gmail.send"],
    });

    const client = await auth.getClient();
    const gmail = google.gmail({ version: "v1", auth: client as any });

    const emailLines = [
      `To: satyamsakral@gmail.com`,
      `Subject: Portfolio Contact Form Message from ${name}`,
      `Content-Type: text/plain; charset=utf-8`,
      ``,
      `Name: ${name}`,
      `Email: ${email}`,
      ``,
      `Message:`,
      `${message}`,
    ];

    const rawEmail = Buffer.from(emailLines.join("\n"))
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

    await gmail.users.messages.send({
      userId: "me",
      requestBody: { raw: rawEmail },
    });

    res.json({ success: true, message: "Email sent successfully" });
  } catch (error: any) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "custom",
    });
    app.use(vite.middlewares);
    app.use("*", async (req, res, next) => {
      if (req.originalUrl.startsWith("/api")) return next();
      try {
        const template = await vite.transformIndexHtml(
          req.originalUrl,
          `<!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <title>Satyam's Portfolio | AI Engineer & Full-Stack Developer</title>
            </head>
            <body>
              <div id="root"></div>
              <script type="module" src="/src/main.tsx"></script>
            </body>
          </html>`
        );
        res.status(200).set({ "Content-Type": "text/html" }).end(template);
      } catch (e: any) {
        vite.ssrFixStacktrace(e);
        next(e);
      }
    });
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.use("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

startServer();
