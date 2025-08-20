"use client"

import type React from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Github,
  Linkedin,
  ExternalLink,
  Download,
  Code,
  Zap,
  Users,
  Award,
  Send,
  Menu,
  X,
  CheckCircle,
  AlertCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react"

import { useState, useEffect } from "react"

export default function ModernPortfolio() {
  const [isVisible, setIsVisible] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null
    message: string
  }>({ type: null, message: "" })
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  const toggleExperience = (index: number) => {
    setExpandedIndex(prev => (prev === index ? null : index))
  }

  // Smooth scroll function
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
    setIsMenuOpen(false)
  }

  // Handle form submission with Formspree
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: "" })

    try {
      const response = await fetch("https://formspree.io/f/xzzvlvpp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _replyto: formData.email,
        }),
      })

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message: "Thank you for your message! I'll get back to you soon.",
        })
        setFormData({ name: "", email: "", message: "" })
      } else {
        throw new Error("Failed to send message")
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Sorry, there was an error sending your message. Please try again or contact me directly.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    // Clear status when user starts typing
    if (submitStatus.type) {
      setSubmitStatus({ type: null, message: "" })
    }
  }

  const downloadCV = async () => {
    const url = "/Soe_Moe_Htet_CV.pdf"

    setSubmitStatus({ type: null, message: "Checking file..." })

    try {
      let res = await fetch(url, { method: "HEAD" })
      if (!res.ok) {
        res = await fetch(url, { method: "GET" })
      }

      if (!res.ok) {
        setSubmitStatus({
          type: "error",
          message: `CV not available on site (HTTP ${res.status}). Check the file in public/ and deployed assets.`,
        })
        window.open(url, "_blank")
        return
      }

      const blobRes = await fetch(url)
      if (!blobRes.ok) {
        setSubmitStatus({
          type: "error",
          message: `Failed to fetch CV file (HTTP ${blobRes.status}).`,
        })
        return
      }

      const blob = await blobRes.blob()
      const blobUrl = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = blobUrl
      a.download = "Soe_Moe_Htet_CV.pdf"
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(blobUrl)

      setSubmitStatus({
        type: "success",
        message: "Download started — if the file still fails, check file path / case-sensitivity / deployment.",
      })
    } catch (err: any) {
      console.error("downloadCV error:", err)
      setSubmitStatus({
        type: "error",
        message:
          "Network error while trying to download CV. Open the CV URL in a new tab to inspect the server response.",
      })
      
      window.open(url, "_blank")
    }
  }


  const skills = {
    frontend: ["HTML", "CSS", "JavaScript", "Next.js"],
    backend: ["PHP", "Laravel", "Node.js", "NestJS"],
    tools: ["Git", "AWS S3", "Digital Ocean", "WebSocket"],
    concepts: ["OOP", "Functional Programming", "Design Patterns", "Clean Architecture"],
  }

  const experiences = [
    {
      title: "Freelance Developer",
      company: "Self-employed",
      period: "07/2024 - Present",
      location: "Rangoon, YA, Myanmar",
      type: "Contract",
      description: [
        "Designed and delivered robust backend solutions for local businesses using Laravel, Node.js, and Next.js, emphasizing scalable APIs, microservices, and enterprise-grade system architecture.",
        "Developed a Firebase-powered e-commerce platform using event-driven architecture with Laravel events, enabling real-time updates and decoupled workflows.",
        "Built a government Learning Management System (LMS) website leveraging structured system design to support large-scale user access and secure content delivery.",
        "Engineered internal management systems for government projects, including multi-vendor e-commerce platforms and POS solutions with modular, maintainable architecture.",
        "Developed a POS dashboard for rice-selling operations with clear workflows for inventory, sales, and reporting.",
        "Optimized deployment workflows using DigitalOcean, reducing server provisioning time for small-scale regional clients.",
        "Implemented WebSocket-driven real-time features for e-commerce platforms to enhance customer engagement and responsiveness.",
        "Mentored junior developers in Clean Architecture and best practices to improve code quality and maintainability."
      ],
      highlights: ["Event-driven", "Real-time", "Clean Architecture"]
    },
    {
      title: "Backend Engineer",
      company: "Fresh Moe Myanmar",
      period: "12/2024 - 03/2025",
      location: "Rangoon, YA, Myanmar",
      type: "Full-time",
      description: [
        "Spearheaded the transition from monolithic architecture to microservices, improving performance, scalability, and maintainability.",
        "Directed the migration from Laravel to Nest.js to deliver a more modular and efficient backend architecture.",
        "Architected and developed a multi-tier dashboard system (Root, Super Admin, HR, Admin) with tailored functionalities and granular RBAC.",
        "Implemented advanced role and permission management and hierarchical security protocols across the organization.",
        "Designed dynamic, location-aware features with configurations for countries including Myanmar and the UAE.",
        "Developed dedicated dashboards for portfolio and B2B management to optimize workflows.",
        "Engineered a Single Sign-On (SSO) solution for seamless, secure cross-platform access.",
        "Led design and implementation of CI/CD pipelines using Docker to automate deployment workflows."
      ],
      highlights: ["Microservices", "SSO", "CI/CD"]
    },
    {
      title: "Web Developer",
      company: "Hapeye Co. Ltd",
      period: "01/2024 - 06/2024",
      location: "Rangoon, YA, Myanmar",
      type: "Full-time",
      description: [
        "Developed online tools and systems to streamline sales and content management, improving operational efficiency.",
        "Enhanced interactivity and usability by designing and implementing new features for more engaging web experiences.",
        "Integrated applications and platforms to ensure seamless communication and reliable workflows across systems.",
        "Supported and optimized dashboards and management systems for better organization, tracking, and decision-making."
      ],
      highlights: ["Integration", "Dashboards", "UX improvements"]
    },
    {
      title: "Full Stack Developer",
      company: "Revelio",
      period: "01/2023 - 12/2023",
      location: "Rangoon, YA, Myanmar",
      type: "Full-time",
      description: [
        "Designed and executed comprehensive test coverage across routes, minimizing errors and enhancing platform stability.",
        "Improved UI/UX by leading feature development with Vue.js and Ant Design for intuitive, responsive interfaces.",
        "Architected and executed database migration from MySQL to MongoDB to improve performance and scalability.",
        "Streamlined end-to-end delivery by building a unified delivery ecosystem — admin dashboard, shop user app, and rider app — integrating all parts of the process."
      ],
      highlights: ["Testing", "DB Migration", "Delivery Ecosystem"]
    },
  ];

  const stats = [
    { icon: Code, label: "Projects Completed", value: "25+" },
    { icon: Users, label: "Clients Served", value: "15+" },
    { icon: Zap, label: "Years Experience", value: "2+" },
    { icon: Award, label: "Technologies", value: "10+" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-500"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-white/10 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <button
              onClick={() => scrollToSection("hero")}
              className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent hover:scale-105 transition-transform"
            >
              SMHtet
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              <button
                onClick={() => scrollToSection("about")}
                className="text-white/80 hover:text-white transition-colors"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("experience")}
                className="text-white/80 hover:text-white transition-colors"
              >
                Experience
              </button>
              <button
                onClick={() => scrollToSection("skills")}
                className="text-white/80 hover:text-white transition-colors"
              >
                Skills
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-white/80 hover:text-white transition-colors"
              >
                Contact
              </button>
            </div>

            <div className="flex gap-3 items-center">
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20"
                onClick={() => window.open("https://github.com", "_blank")}
              >
                <Github className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20"
                onClick={() => window.open("https://linkedin.com", "_blank")}
              >
                <Linkedin className="w-4 h-4" />
              </Button>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden text-white hover:bg-white/20"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-white/20">
              <div className="flex flex-col space-y-4 mt-4">
                <button
                  onClick={() => scrollToSection("about")}
                  className="text-white/80 hover:text-white transition-colors text-left"
                >
                  About
                </button>
                <button
                  onClick={() => scrollToSection("experience")}
                  className="text-white/80 hover:text-white transition-colors text-left"
                >
                  Experience
                </button>
                <button
                  onClick={() => scrollToSection("skills")}
                  className="text-white/80 hover:text-white transition-colors text-left"
                >
                  Skills
                </button>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="text-white/80 hover:text-white transition-colors text-left"
                >
                  Contact
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div
            className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="text-center mb-16">
              <div className="relative inline-block mb-8">
                <div className="w-40 h-40 bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 rounded-full p-1 mx-auto">
                  <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center">
                    <img src="/logo.png" alt="Logo" />
                  </div>
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full border-4 border-slate-900"></div>
              </div>

              <h1 className="text-6xl md:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Soe Moe Htet
                </span>
              </h1>

              <div className="text-2xl md:text-3xl text-white/90 mb-6 font-light">
                Software Developer &
                <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent font-semibold">
                  {" "}
                  Architecture Enthusiast
                </span>
              </div>

              <p className="text-xl text-white/70 max-w-4xl mx-auto leading-relaxed mb-12">
                Crafting scalable, efficient solutions with Clean Architecture principles. Transforming complex problems
                into elegant code that drives business success.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white border-0"
                  onClick={() => scrollToSection("contact")}
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Let's Connect
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 bg-transparent"
                  onClick={downloadCV}
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download CV
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm border border-white/10">
                      <stat.icon className="w-8 h-8 text-cyan-400" />
                    </div>
                    <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                    <div className="text-white/60 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-8">
                About{" "}
                <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Me</span>
              </h2>
              <div className="space-y-6 text-white/80 text-lg leading-relaxed">
                <p>
                  I'm a passionate software developer with a relentless drive to create clean, efficient, and scalable
                  solutions. My journey spans from medical studies to becoming a full-stack developer, bringing a unique
                  analytical perspective to software architecture.
                </p>
                <p>
                  Specializing in backend development and system architecture, I've led successful migrations from
                  monolithic to microservices, implemented complex authentication systems, and mentored teams in
                  adopting Clean Architecture principles.
                </p>
                <p>
                  When I'm not coding, I'm exploring new technologies, contributing to open-source projects, and sharing
                  knowledge with the developer community.
                </p>
              </div>

              <div className="flex flex-wrap gap-6 mt-8 text-white/60">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-cyan-400" />
                  <span>Taungoo, Bago</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-cyan-400" />
                  <span>Available for projects</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-3xl p-8 backdrop-blur-sm border border-white/10">
                <h3 className="text-2xl font-bold text-white mb-6">Quick Facts</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-white/10">
                    <span className="text-white/70">Location</span>
                    <span className="text-white font-semibold">Myanmar</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-white/10">
                    <span className="text-white/70">Experience</span>
                    <span className="text-white font-semibold">2+ Years</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-white/10">
                    <span className="text-white/70">Languages</span>
                    <span className="text-white font-semibold">English, Burmese</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-white/70">Education</span>
                    <span className="text-white font-semibold text-end">M.B.B.S (2018-2022) <br></br> CS50 (2022)  <br></br> Associate In CS - UoP (2025 - Present)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">
              Technical{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Expertise
              </span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              A comprehensive toolkit for building modern, scalable applications
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="group">
              <div className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-3xl p-8 backdrop-blur-sm border border-white/10 hover:border-cyan-500/50 transition-all duration-300 h-full">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Code className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Frontend</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {skills.frontend.map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="bg-white/10 text-white border-white/20 hover:bg-white/20"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
                <p className="text-white/70 text-sm">
                  Creating responsive, interactive user interfaces with modern frameworks and best practices.
                </p>
              </div>
            </div>

            <div className="group">
              <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-3xl p-8 backdrop-blur-sm border border-white/10 hover:border-purple-500/50 transition-all duration-300 h-full">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Backend</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {skills.backend.map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="bg-white/10 text-white border-white/20 hover:bg-white/20"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
                <p className="text-white/70 text-sm">
                  Building robust, scalable server-side applications with modern architectures and patterns.
                </p>
              </div>
            </div>

            <div className="group">
              <div className="bg-gradient-to-br from-pink-500/10 to-red-500/10 rounded-3xl p-8 backdrop-blur-sm border border-white/10 hover:border-pink-500/50 transition-all duration-300 h-full">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Tools & Cloud</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {skills.tools.map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="bg-white/10 text-white border-white/20 hover:bg-white/20"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
                <p className="text-white/70 text-sm">
                  Leveraging cloud services and development tools for efficient deployment and collaboration.
                </p>
              </div>
            </div>

            <div className="group">
              <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-3xl p-8 backdrop-blur-sm border border-white/10 hover:border-green-500/50 transition-all duration-300 h-full">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Concepts</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {skills.concepts.map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="bg-white/10 text-white border-white/20 hover:bg-white/20"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
                <p className="text-white/70 text-sm">
                  Applying proven architectural patterns and principles for maintainable, testable code.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">
              Professional{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Journey
              </span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Building impactful solutions across diverse industries and technologies
            </p>
          </div>

         <div className="space-y-8">
            {experiences.map((exp, index) => {
              const isExpanded = expandedIndex === index
              const previewCount = 2 // number of bullets to show when collapsed
              const previewItems = exp.description.slice(0, previewCount)
              const remainingItems = exp.description.slice(previewCount)

              return (
                <div key={index} className="group">
                  <div className="bg-gradient-to-br from-white/5 to-white/10 rounded-3xl p-8 backdrop-blur-sm border border-white/10 hover:border-cyan-500/30 transition-all duration-300">
                    <div className="flex flex-col lg:flex-row lg:items-start gap-8">
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
                          <div>
                            <h3 className="text-2xl font-bold text-white mb-2">{exp.title}</h3>
                            <div className="flex items-center gap-3 text-cyan-400 font-semibold text-lg">
                              <span>{exp.company}</span>
                              <Badge variant="outline" className="border-cyan-500/50 text-cyan-400 text-xs">
                                {exp.type}
                              </Badge>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-6">
                          {exp.highlights.map((highlight, idx) => (
                            <Badge
                              key={idx}
                              variant="secondary"
                              className="bg-purple-500/20 text-purple-300 border-purple-500/30"
                            >
                              {highlight}
                            </Badge>
                          ))}
                        </div>

                        <ul className="space-y-3 mb-4">
                          {/* preview items */}
                          {previewItems.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-white/80">
                              <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                              <span>{item}</span>
                            </li>
                          ))}

                          {/* expanded items */}
                          {isExpanded &&
                            remainingItems.map((item, idx) => (
                              <li key={previewCount + idx} className="flex items-start gap-3 text-white/80">
                                <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                                <span>{item}</span>
                              </li>
                            ))}
                        </ul>

                        {/* Toggle button */}
                        {exp.description.length > previewCount && (
                          <div className="mb-6">
                            <button
                              onClick={() => toggleExperience(index)}
                              aria-expanded={isExpanded}
                              className="inline-flex items-center gap-2 text-sm text-cyan-300 hover:text-white transition-colors"
                            >
                              {isExpanded ? (
                                <>
                                  <ChevronUp className="w-4 h-4" />
                                  Show less
                                </>
                              ) : (
                                <>
                                  <ChevronDown className="w-4 h-4" />
                                  Show more
                                </>
                              )}
                            </button>
                          </div>
                        )}
                      </div>

                      <div className="lg:text-right text-white/60 lg:min-w-[200px]">
                        <div className="text-lg font-semibold text-white mb-2">{exp.period}</div>
                        <div className="flex items-center gap-2 lg:justify-end">
                          <MapPin className="w-4 h-4" />
                          <span>{exp.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-3xl p-12 backdrop-blur-sm border border-white/10">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-6">
                Let's Build Something{" "}
                <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  Amazing
                </span>
              </h2>
              <p className="text-xl text-white/70 max-w-2xl mx-auto">
                Ready to transform your ideas into scalable, efficient solutions? Let's discuss how we can work together
                to bring your vision to life.
              </p>
            </div>

            {/* Contact Form */}
            <Card className="bg-white/5 border-white/10 mb-12">
              <CardHeader>
                <CardTitle className="text-white text-center">Send me a message</CardTitle>
                <CardDescription className="text-white/70 text-center">
                  I'll get back to you as soon as possible
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Input
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                        disabled={isSubmitting}
                      />
                    </div>
                    <div>
                      <Input
                        name="email"
                        type="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>
                  <div>
                    <Textarea
                      name="message"
                      placeholder="Your Message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                      disabled={isSubmitting}
                    />
                  </div>

                  {/* Status Messages */}
                  {submitStatus.type && (
                    <Alert
                      className={`${
                        submitStatus.type === "success"
                          ? "bg-green-500/10 border-green-500/30 text-green-300"
                          : "bg-red-500/10 border-red-500/30 text-red-300"
                      }`}
                    >
                      {submitStatus.type === "success" ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        <AlertCircle className="h-4 w-4" />
                      )}
                      <AlertDescription>{submitStatus.message}</AlertDescription>
                    </Alert>
                  )}

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white border-0 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Direct Contact */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
              <Button
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white border-0"
                onClick={() => (window.location.href = "mailto:smHtet182@gmail.com")}
              >
                <Mail className="w-5 h-5 mr-2" />
                smHtet182@gmail.com
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 bg-transparent"
                onClick={() => (window.location.href = "tel:+959798819540")}
              >
                <Phone className="w-5 h-5 mr-2" />
                09 798 819540
              </Button>
            </div>

            {/* Social Links */}
            <div className="flex justify-center gap-6">
              <Button
                variant="ghost"
                size="lg"
                className="text-white/70 hover:text-white hover:bg-white/10"
                onClick={() => window.open("https://github.com", "_blank")}
              >
                <Github className="w-6 h-6 mr-2" />
                GitHub
              </Button>
              <Button
                variant="ghost"
                size="lg"
                className="text-white/70 hover:text-white hover:bg-white/10"
                onClick={() => window.open("https://linkedin.com", "_blank")}
              >
                <Linkedin className="w-6 h-6 mr-2" />
                LinkedIn
              </Button>
              <Button
                variant="ghost"
                size="lg"
                className="text-white/70 hover:text-white hover:bg-white/10"
                onClick={() => window.open("https://portfolio.example.com", "_blank")}
              >
                <ExternalLink className="w-6 h-6 mr-2" />
                Portfolio
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <button
            onClick={() => scrollToSection("hero")}
            className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-4 hover:scale-105 transition-transform inline-block"
          >
            Soe Moe Htet
          </button>
          <p className="text-white/60">
            © 2025 Soe Moe Htet. Crafted with passion using Next.js and modern web technologies.
          </p>
        </div>
      </footer>
    </div>
  )
}