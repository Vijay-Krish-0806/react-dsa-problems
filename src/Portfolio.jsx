import React, { useState, useEffect, useRef } from "react";
import {
  Github,
  ExternalLink,
  Mail,
  Phone,
  MapPin,
  Menu,
  X,
  Code,
  Palette,
  Zap,
  Star,
  ArrowRight,
  Download,
  Eye,
  Heart,
  Sparkles,
  Target,
  Rocket,
  Coffee,
  Globe,
  Users,
  Award,
  TrendingUp,
  Layers,
  Lightbulb,
  Shield,
  ChevronDown,
  Play,
} from "lucide-react";

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [currentRole, setCurrentRole] = useState(0);
  const heroRef = useRef(null);

  const roles = [
    "Full Stack Developer",
    "UI/UX Designer",
    "React Specialist",
    "Problem Solver",
  ];

  const projects = [
    {
      id: 1,
      title: "AI-Powered E-Commerce Platform",
      description:
        "Revolutionary e-commerce solution with AI-driven recommendations, real-time inventory management, and seamless payment integration.",
      technologies: ["React", "Node.js", "TensorFlow", "GraphQL", "AWS"],
      githubLink: "https://github.com/yourusername/ai-ecommerce",
      liveLink: "https://ai-ecommerce-demo.com",
      image:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
      category: "Full Stack",
      featured: true,
      likes: 234,
      views: 1240,
      gradient: "from-purple-500 to-pink-500",
    },
    {
      id: 2,
      title: "Neural Network Visualizer",
      description:
        "Interactive web application for visualizing and understanding deep learning models with real-time training visualization.",
      technologies: ["React", "D3.js", "Python", "FastAPI", "WebGL"],
      githubLink: "https://github.com/yourusername/neural-viz",
      liveLink: "https://neural-visualizer.com",
      image:
        "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=600&h=400&fit=crop",
      category: "AI/ML",
      featured: true,
      likes: 189,
      views: 890,
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      id: 3,
      title: "Real-time Collaboration Suite",
      description:
        "Comprehensive collaboration platform with video calls, shared workspaces, and intelligent task management.",
      technologies: ["React", "Socket.io", "WebRTC", "MongoDB", "Redis"],
      githubLink: "https://github.com/yourusername/collab-suite",
      liveLink: "https://collab-suite-demo.com",
      image:
        "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop",
      category: "Full Stack",
      featured: false,
      likes: 156,
      views: 720,
      gradient: "from-green-500 to-teal-500",
    },
    {
      id: 4,
      title: "Blockchain Analytics Dashboard",
      description:
        "Advanced cryptocurrency analytics platform with real-time trading insights and portfolio management.",
      technologies: ["React", "Web3.js", "Solidity", "Chart.js", "Docker"],
      githubLink: "https://github.com/yourusername/blockchain-analytics",
      liveLink: "https://blockchain-analytics-demo.com",
      image:
        "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&h=400&fit=crop",
      category: "Blockchain",
      featured: false,
      likes: 203,
      views: 1100,
      gradient: "from-orange-500 to-red-500",
    },
    {
      id: 5,
      title: "Smart Home IoT Dashboard",
      description:
        "Intelligent home automation system with energy monitoring, security integration, and voice control.",
      technologies: ["React Native", "IoT", "MQTT", "Firebase", "Arduino"],
      githubLink: "https://github.com/yourusername/smart-home",
      liveLink: "https://smart-home-demo.com",
      image:
        "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&h=400&fit=crop",
      category: "IoT",
      featured: false,
      likes: 167,
      views: 650,
      gradient: "from-indigo-500 to-purple-500",
    },
    {
      id: 6,
      title: "AR Fitness Companion",
      description:
        "Augmented reality fitness app with real-time form correction and personalized workout recommendations.",
      technologies: [
        "React Native",
        "ARCore",
        "TensorFlow",
        "Firebase",
        "WebRTC",
      ],
      githubLink: "https://github.com/yourusername/ar-fitness",
      liveLink: "https://ar-fitness-demo.com",
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop",
      category: "AR/VR",
      featured: false,
      likes: 145,
      views: 580,
      gradient: "from-pink-500 to-rose-500",
    },
  ];

  const skills = [
    {
      name: "React",
      level: 95,
      icon: "⚛️",
      color: "from-blue-400 to-blue-600",
    },
    {
      name: "TypeScript",
      level: 90,
      icon: "🔷",
      color: "from-blue-500 to-indigo-600",
    },
    {
      name: "Node.js",
      level: 85,
      icon: "🟢",
      color: "from-green-400 to-green-600",
    },
    {
      name: "Python",
      level: 80,
      icon: "🐍",
      color: "from-yellow-400 to-orange-500",
    },
    { name: "AWS", level: 75, icon: "☁️", color: "from-orange-400 to-red-500" },
    {
      name: "MongoDB",
      level: 70,
      icon: "🍃",
      color: "from-green-500 to-teal-600",
    },
  ];

  const achievements = [
    { number: "50+", label: "Projects Completed", icon: Rocket },
    { number: "3+", label: "Years Experience", icon: Award },
    { number: "98%", label: "Client Satisfaction", icon: Star },
    { number: "24/7", label: "Support Available", icon: Shield },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);

      const sections = ["home", "about", "experience", "contact"];
      const scrollPosition = window.scrollY + 100;

      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
          }
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Typewriter effect
  useEffect(() => {
    let timeout;
    const currentText = roles[currentRole];

    if (typedText.length < currentText.length) {
      timeout = setTimeout(() => {
        setTypedText(currentText.substring(0, typedText.length + 1));
      }, 100);
    } else {
      timeout = setTimeout(() => {
        setTypedText("");
        setCurrentRole((prev) => (prev + 1) % roles.length);
      }, 2000);
    }

    return () => clearTimeout(timeout);
  }, [typedText, currentRole]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  const ProjectCard = ({ project, index }) => {
    const [isLiked, setIsLiked] = useState(false);
  
    return (
      <div
        className="relative bg-white/5 backdrop-blur-xl overflow-hidden border border-white/10 rounded-2xl h-[600px] flex flex-col shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]"
      >
        <div className="relative overflow-hidden flex-shrink-0">
          <div className="overflow-hidden rounded-t-2xl">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-48 object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
  
          {/* Floating action buttons */}
          <div className="absolute top-4 right-4 flex gap-2">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`p-2 rounded-full backdrop-blur-md ${
                isLiked
                  ? "bg-red-500 text-white"
                  : "bg-white/20 text-white"
              }`}
            >
              <Heart size={14} fill={isLiked ? "currentColor" : "none"} />
            </button>
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white"
            >
              <Github size={14} />
            </a>
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white"
            >
              <ExternalLink size={14} />
            </a>
          </div>
  
          {/* Category badge */}
          <div className="absolute top-4 left-4">
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${project.gradient} text-white shadow-lg`}
            >
              {project.category}
            </span>
          </div>
  
          {/* Stats */}
          <div className="absolute bottom-4 left-4 flex gap-4 text-white/80">
            <div className="flex items-center gap-1">
              <Eye size={12} />
              <span className="text-xs">{project.views}</span>
            </div>
            <div className="flex items-center gap-1">
              <Heart size={12} />
              <span className="text-xs">{project.likes}</span>
            </div>
          </div>
        </div>
  
        <div className="p-6 relative flex-1 flex flex-col">
          <h3 className="font-bold text-white mb-3 text-xl line-clamp-2">
            {project.title}
          </h3>
          <p className="text-gray-300 mb-4 leading-relaxed text-sm flex-1 line-clamp-3">
            {project.description}
          </p>
  
          <div className="flex flex-wrap gap-2 mb-6">
            {project.technologies.map((tech, i) => (
              <span
                key={i}
                className="px-2 py-1 bg-white/10 backdrop-blur-sm text-white text-xs rounded-full border border-white/20"
              >
                {tech}
              </span>
            ))}
          </div>
  
          <div className="flex gap-3 mt-auto">
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-xl border border-white/20 text-sm"
            >
              <Github size={14} />
              Code
            </a>
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${project.gradient} text-white rounded-xl text-sm`}
            >
              <Play size={14} />
              Live Demo
            </a>
          </div>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-purple-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <div
              className="absolute inset-0 w-20 h-20 border-4 border-pink-400 border-t-transparent rounded-full animate-spin mx-auto opacity-50"
              style={{ animationDelay: "0.5s" }}
            ></div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Loading Portfolio
          </h2>
          <p className="text-gray-300">Preparing something amazing...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-20 animate-pulse"></div>
        <div
          className="absolute top-3/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full opacity-20 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-1/4 left-1/2 w-48 h-48 bg-gradient-to-r from-green-500 to-teal-500 rounded-full opacity-20 animate-pulse"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      {/* Cursor follower */}
      <div
        className="fixed w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full pointer-events-none z-50 opacity-50 transition-transform duration-100"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          transform: `scale(${isLoading ? 0 : 1})`,
        }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white/10 backdrop-blur-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  <Sparkles className="inline w-6 h-6 mr-2" />
                  Portfolio
                </h1>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="flex items-center space-x-8">
                {["home", "about", "experience", "contact"].map((section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      activeSection === section
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                        : "text-gray-300 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/10 backdrop-blur-lg border-t border-white/20">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {["home", "about", "experience", "contact"].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-all duration-300 ${
                    activeSection === section
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                      : "text-gray-300 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        ref={heroRef}
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
      >
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <div className="space-y-8">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 p-1">
                  <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center">
                    <span className="text-4xl">👨‍💻</span>
                  </div>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-gray-800 animate-pulse"></div>
              </div>
            </div>

            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
              Hello, I'm{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Alex Chen
              </span>
            </h1>

            <div className="text-2xl sm:text-3xl lg:text-4xl text-gray-300 mb-8 h-12 flex items-center justify-center">
              <span className="mr-2">I'm a</span>
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-bold">
                {typedText}
                <span className="animate-pulse">|</span>
              </span>
            </div>

            <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
              Crafting digital experiences that blend creativity with
              cutting-edge technology. Let's build something extraordinary
              together.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button
                onClick={() => scrollToSection("experience")}
                className="group px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-medium hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-purple-500/50 flex items-center gap-3"
              >
                <Rocket className="w-5 h-5" />
                Explore My Work
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => scrollToSection("contact")}
                className="px-8 py-4 border-2 border-purple-400 text-purple-400 rounded-full font-medium hover:bg-purple-500 hover:text-white transform hover:scale-105 transition-all duration-300 flex items-center gap-3"
              >
                <Mail className="w-5 h-5" />
                Get In Touch
              </button>

              <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-full font-medium hover:bg-white/20 transition-all duration-300 flex items-center gap-3">
                <Download className="w-5 h-5" />
                Download CV
              </button>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 animate-bounce">
              <ChevronDown size={32} />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              About Me
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Passionate developer with a mission to create digital solutions
              that matter
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="prose prose-lg text-gray-300 leading-relaxed">
                <p className="mb-6">
                  With over 3 years of experience in the tech industry, I've had
                  the privilege of working on diverse projects ranging from
                  AI-powered applications to blockchain solutions. My journey
                  began with a simple curiosity about how things work, and it
                  has evolved into a passion for creating innovative digital
                  experiences.
                </p>
                <p className="mb-6">
                  I believe in the power of clean code, thoughtful design, and
                  collaborative teamwork. When I'm not coding, you'll find me
                  exploring new technologies, contributing to open-source
                  projects, or sharing knowledge through technical writing and
                  mentoring.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20"
                  >
                    <achievement.icon className="w-8 h-8 mx-auto mb-3 text-purple-400" />
                    <div className="text-3xl font-bold text-white mb-1">
                      {achievement.number}
                    </div>
                    <div className="text-sm text-gray-300">
                      {achievement.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-white mb-6">
                Technical Skills
              </h3>
              {skills.map((skill, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-3 text-white font-medium">
                      <span className="text-2xl">{skill.icon}</span>
                      {skill.name}
                    </span>
                    <span className="text-purple-400 font-bold">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${skill.color} transition-all duration-1000 ease-out relative`}
                      style={{ width: `${skill.level}%` }}
                    >
                      <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Experience/Projects Section */}
      <section id="experience" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Featured Projects
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              A showcase of my recent work, featuring innovative solutions and
              cutting-edge technologies
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Let's Build Something Amazing
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Ready to turn your ideas into reality? I'm always excited to
              discuss new opportunities and innovative projects.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="group p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300">
                  <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl mb-4 group-hover:scale-110 transition-transform">
                    <MapPin className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Location
                  </h3>
                  <p className="text-gray-300">Hyderabad, India</p>
                </div>

                <div className="group p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300">
                  <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl mb-4 group-hover:scale-110 transition-transform">
                    <Coffee className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Availability
                  </h3>
                  <p className="text-gray-300">Open to opportunities</p>
                </div>
              </div>

              <div className="p-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-4">
                    Ready to collaborate?
                  </h3>
                  <p className="mb-6 opacity-90">
                    I'm always excited to work on innovative projects and help
                    bring your ideas to life. Let's discuss how we can create
                    something amazing together!
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <a
                      href="mailto:alex.chen@example.com"
                      className="flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-300"
                    >
                      <Mail size={20} />
                      Send Email
                    </a>
                    <a
                      href="https://github.com/alexchen"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-300"
                    >
                      <Github size={20} />
                      GitHub
                    </a>
                    <a
                      href="https://linkedin.com/in/alexchen"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-300"
                    >
                      <Users size={20} />
                      LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold text-white mb-6">
                  Send Me a Message
                </h3>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                      placeholder="Let's build something amazing!"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Message
                    </label>
                    <textarea
                      rows={5}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 resize-none"
                      placeholder="Tell me about your project..."
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/20 backdrop-blur-sm border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
                Alex Chen
              </h3>
              <p className="text-gray-400 mb-6 max-w-md">
                Full Stack Developer passionate about creating innovative
                digital experiences that make a difference in people's lives.
              </p>
              <div className="flex gap-4">
                <a
                  href="https://github.com/alexchen"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/20 transition-all duration-300"
                >
                  <Github size={20} />
                </a>
                <a
                  href="https://linkedin.com/in/alexchen"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/20 transition-all duration-300"
                >
                  <Users size={20} />
                </a>
                <a
                  href="mailto:alex.chen@example.com"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/20 transition-all duration-300"
                >
                  <Mail size={20} />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {["Home", "About", "Projects", "Contact"].map((item) => (
                  <li key={item}>
                    <button
                      onClick={() => scrollToSection(item.toLowerCase())}
                      className="text-gray-400 hover:text-white transition-colors duration-300"
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Web Development</li>
                <li>Mobile Apps</li>
                <li>UI/UX Design</li>
                <li>Consulting</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2025 Alex Chen. Crafted with ❤️ using React & Tailwind CSS.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;
