import React, { useState, useEffect } from "react";
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Menu,
  X,
  ChevronDown,
  Send,
} from "lucide-react";

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId).scrollIntoView({ behavior: "smooth" });
    setActiveSection(sectionId);
    setIsMenuOpen(false);
  };

  const projects = [
    {
      title: "AI-Powered Task Manager",
      description:
        "A smart task management app with AI-driven priority suggestions and natural language processing.",
      tech: ["React", "Node.js", "OpenAI API", "MongoDB"],
      github: "https://github.com/yourusername/ai-task-manager",
      live: "https://ai-task-manager.demo.com",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      title: "E-Commerce Platform",
      description:
        "Full-stack e-commerce solution with real-time inventory, payment processing, and admin dashboard.",
      tech: ["Next.js", "PostgreSQL", "Stripe", "Tailwind CSS"],
      github: "https://github.com/yourusername/ecommerce-platform",
      live: "https://ecommerce-demo.com",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "Real-time Chat Application",
      description:
        "WebSocket-based chat app with file sharing, typing indicators, and message encryption.",
      tech: ["React", "Socket.io", "Express", "Redis"],
      github: "https://github.com/yourusername/chat-app",
      live: "https://chat-app-demo.com",
      gradient: "from-green-500 to-teal-500",
    },
    {
      title: "Data Visualization Dashboard",
      description:
        "Interactive dashboard for complex data analysis with real-time updates and custom charts.",
      tech: ["React", "D3.js", "Python", "FastAPI"],
      github: "https://github.com/yourusername/data-dashboard",
      live: "https://data-dashboard-demo.com",
      gradient: "from-orange-500 to-red-500",
    },
  ];

  const experiences = [
    {
      title: "Senior Full Stack Developer",
      company: "Tech Innovation Inc.",
      period: "2022 - Present",
      description:
        "Led development of scalable web applications serving 100K+ users. Implemented microservices architecture and improved system performance by 40%.",
      skills: ["React", "Node.js", "AWS", "Docker", "MongoDB"],
    },
    {
      title: "Frontend Developer",
      company: "Digital Solutions Co.",
      period: "2020 - 2022",
      description:
        "Developed responsive web applications with modern frameworks. Collaborated with design teams to create pixel-perfect user interfaces.",
      skills: ["Vue.js", "TypeScript", "Sass", "Webpack", "Jest"],
    },
    {
      title: "Junior Developer",
      company: "StartUp Studios",
      period: "2019 - 2020",
      description:
        "Built interactive web components and integrated third-party APIs. Participated in agile development processes and code reviews.",
      skills: ["JavaScript", "HTML5", "CSS3", "Git", "REST APIs"],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-x-hidden">
      {/* Animated Background Elements */}
      

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/5 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Portfolio
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {["home", "about", "experience", "projects", "contact"].map(
                  (item) => (
                    <button
                      key={item}
                      onClick={() => scrollToSection(item)}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:scale-105 ${
                        activeSection === item
                          ? "bg-white/20 text-white shadow-lg"
                          : "text-gray-300 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      {item.charAt(0).toUpperCase() + item.slice(1)}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-white/10 transition-colors duration-200"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden backdrop-blur-lg bg-black/20 border-t border-white/10">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {["home", "about", "experience", "projects", "contact"].map(
                (item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-colors duration-200"
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </button>
                )
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Home Section */}
      <section
        id="home"
        className="min-h-screen flex items-center justify-center relative pt-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="backdrop-blur-lg bg-white/5 rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl transform hover:scale-105 transition-all duration-500">
            <div className="mb-8 relative">
              <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-purple-500 to-pink-500 p-1 shadow-2xl">
                <div className="w-full h-full bg-gray-800 rounded-full flex items-center justify-center text-4xl font-bold">
                  YN
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-green-500 rounded-full border-4 border-white/20 animate-pulse"></div>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-pulse">
              Your Name
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Full Stack Developer & UI/UX Enthusiast
            </p>
            <p className="text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
              Passionate about creating beautiful, functional web applications
              that make a difference. Specialized in React, Node.js, and modern
              web technologies.
            </p>

            <div className="flex justify-center space-x-6">
              <button
                onClick={() => scrollToSection("projects")}
                className="bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-3 rounded-full font-semibold hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
              >
                View My Work
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="border border-white/20 backdrop-blur-sm bg-white/5 px-8 py-3 rounded-full font-semibold hover:bg-white/10 hover:scale-105 transform transition-all duration-300"
              >
                Get In Touch
              </button>
            </div>
          </div>

          <div className="mt-12 animate-bounce">
            <ChevronDown size={32} className="mx-auto text-gray-400" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              About Me
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="backdrop-blur-lg bg-white/5 rounded-3xl p-8 border border-white/10 shadow-2xl hover:shadow-purple-500/10 transition-all duration-500">
              <h3 className="text-2xl font-bold mb-6 text-purple-300">
                My Journey
              </h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                With over 5 years of experience in web development, I've had the
                privilege of working on diverse projects ranging from startup
                MVPs to enterprise-level applications. My passion lies in
                creating intuitive user experiences backed by robust, scalable
                code.
              </p>
              <p className="text-gray-300 mb-6 leading-relaxed">
                I believe in the power of clean code, thoughtful design, and
                continuous learning. When I'm not coding, you can find me
                exploring new technologies, contributing to open-source
                projects, or mentoring fellow developers.
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  "Problem Solver",
                  "Team Player",
                  "Innovation Driven",
                  "Detail Oriented",
                ].map((trait) => (
                  <span
                    key={trait}
                    className="px-3 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full text-sm"
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="backdrop-blur-lg bg-white/5 rounded-2xl p-6 border border-white/10 shadow-xl hover:shadow-blue-500/10 transition-all duration-500">
                <h4 className="text-xl font-semibold mb-4 text-blue-300">
                  Technical Skills
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { name: "React/Next.js", level: 95 },
                    { name: "Node.js", level: 90 },
                    { name: "TypeScript", level: 85 },
                    { name: "Python", level: 80 },
                    { name: "AWS/Cloud", level: 75 },
                    { name: "Database Design", level: 85 },
                  ].map((skill) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{skill.name}</span>
                        <span className="text-gray-400">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-1000"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="backdrop-blur-lg bg-white/5 rounded-2xl p-6 border border-white/10 shadow-xl hover:shadow-green-500/10 transition-all duration-500">
                <h4 className="text-xl font-semibold mb-4 text-green-300">
                  Achievements
                </h4>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Led development of apps serving 100K+ users
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Improved system performance by 40% through optimization
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Contributed to 50+ open-source projects
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Mentored 20+ junior developers
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Experience
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-green-500 to-blue-500 mx-auto rounded-full"></div>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-green-500 to-blue-500 rounded-full hidden md:block"></div>

            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <div
                  key={index}
                  className={`flex items-center ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div className="flex-1 md:pr-8">
                    <div
                      className={`backdrop-blur-lg bg-white/5 rounded-3xl p-8 border border-white/10 shadow-2xl hover:shadow-green-500/10 transition-all duration-500 ${
                        index % 2 === 0 ? "md:mr-8" : "md:ml-8"
                      }`}
                    >
                      <div className="mb-4">
                        <h3 className="text-2xl font-bold text-green-300 mb-2">
                          {exp.title}
                        </h3>
                        <p className="text-xl text-purple-300 mb-2">
                          {exp.company}
                        </p>
                        <p className="text-gray-400 text-sm">{exp.period}</p>
                      </div>
                      <p className="text-gray-300 mb-6 leading-relaxed">
                        {exp.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {exp.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-3 py-1 bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/30 rounded-full text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="hidden md:block w-6 h-6 bg-gradient-to-r from-green-500 to-blue-500 rounded-full border-4 border-white/20 relative z-10 flex-shrink-0"></div>

                  <div className="flex-1 md:pl-8"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4  bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Projects
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="backdrop-blur-lg bg-white/5 rounded-3xl p-8 border border-white/10 shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 hover:scale-105 group"
              >
                <div
                  className={`w-full h-48 bg-gradient-to-br ${project.gradient} rounded-2xl mb-6 flex items-center justify-center group-hover:scale-105 transition-transform duration-300`}
                >
                  <div className="text-white text-6xl font-bold opacity-20">
                    {project.title
                      .split(" ")
                      .map((word) => word[0])
                      .join("")}
                  </div>
                </div>

                <h3 className="text-2xl font-bold mb-4 text-purple-300">
                  {project.title}
                </h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex space-x-4">
                  <a
                    href={project.github}
                    className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    <Github size={20} />
                    <span>Code</span>
                  </a>
                  <a
                    href={project.live}
                    className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    <ExternalLink size={20} />
                    <span>Live Demo</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
              Get In Touch
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="backdrop-blur-lg bg-white/5 rounded-3xl p-8 border border-white/10 shadow-2xl hover:shadow-orange-500/10 transition-all duration-500">
              <h3 className="text-2xl font-bold mb-8 text-orange-300">
                Let's Connect
              </h3>
              <div className="space-y-6">
                <div className="flex items-center space-x-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors duration-300">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Email</p>
                    <p className="text-white">your.email@example.com</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors duration-300">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Phone</p>
                    <p className="text-white">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors duration-300">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Location</p>
                    <p className="text-white">San Francisco, CA</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex space-x-4">
                <a
                  href="https://github.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-lg hover:shadow-purple-500/25"
                >
                  <Github size={20} />
                </a>
                <a
                  href="https://linkedin.com/in/yourprofile"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-lg hover:shadow-blue-500/25"
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href="mailto:your.email@example.com"
                  className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-lg hover:shadow-orange-500/25"
                >
                  <Mail size={20} />
                </a>
              </div>
            </div>

            <div className="backdrop-blur-lg bg-white/5 rounded-3xl p-8 border border-white/10 shadow-2xl hover:shadow-orange-500/10 transition-all duration-500">
              <h3 className="text-2xl font-bold mb-8 text-orange-300">
                Send a Message
              </h3>
              <form className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="Tell me about your project..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-2xl hover:from-orange-600 hover:to-red-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-orange-500/25 flex items-center justify-center space-x-2"
                >
                  <Send size={20} />
                  <span>Send Message</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10 backdrop-blur-md bg-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400 mb-4">
            © 2025 Your Name. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm">
            Built with React, Tailwind CSS, and lots of ❤️
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;
