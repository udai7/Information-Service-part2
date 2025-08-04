import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import {
  Search,
  Shield,
  Zap,
  Users,
  ArrowRight,
  CheckCircle,
  Globe,
  Award,
  Clock,
  Sparkles,
  Star,
  TrendingUp,
  Heart,
  FileText,
  Phone,
} from "lucide-react";

export default function Index() {
  const features = [
    {
      icon: <Search className="h-6 w-6" />,
      title: "Find Government Services Easily",
      description:
        "Browse and discover all official services, certificates, and schemes available to citizens of Tripura.",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Trusted & Verified Information",
      description:
        "All service details and document requirements are sourced from government authorities and kept up-to-date.",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Step-by-Step Application Guidance",
      description:
        "Get clear instructions for applying, renewing, or updating certificates and services—no confusion, no wasted trips.",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Empowering Every Citizen",
      description:
        "From students to professionals, everyone can access the right information and manage their government service needs.",
    },
  ];

  const stats = [
    {
      label: "Active Services",
      value: "500+",
      icon: <Globe className="h-5 w-5" />,
    },
    {
      label: "Happy Clients",
      value: "10K+",
      icon: <Users className="h-5 w-5" />,
    },
    {
      label: "Success Rate",
      value: "99%",
      icon: <Award className="h-5 w-5" />,
    },
    {
      label: "Avg Response",
      value: "< 1hr",
      icon: <Clock className="h-5 w-5" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-indigo-200/20 to-blue-200/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Header */}
      <header className="border-b bg-white/90 backdrop-blur-lg sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Search className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                InfoServices Tripura
              </span>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link
                to="/user-dashboard"
                className="text-gray-600 hover:text-primary transition-all duration-300 hover:scale-105 font-medium"
              >
                Dashboard
              </Link>
              <Button
                asChild
                className="shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <Link to="/admin/login">Admin Portal</Link>
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-24 px-4 relative z-10">
        <div className="container mx-auto text-center">
          <div className="animate-fade-in-up">
            <Badge
              variant="outline"
              className="mb-6 px-4 py-2 text-sm font-medium bg-white/80 backdrop-blur-sm border-purple-200 hover:scale-105 transition-all duration-300"
            >
              <Sparkles className="w-4 h-4 mr-2 text-purple-600" />
              Tripura's Unified Government Services Portal
            </Badge>
          </div>

          <div className="animate-fade-in-up delay-200">
            <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent leading-tight">
              Access All Government Services & Certificates
              <br />
              <span className="text-4xl md:text-6xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                For Citizens of Tripura
              </span>
            </h1>
          </div>

          <div className="animate-fade-in-up delay-400">
            <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-4xl mx-auto leading-relaxed">
              InfoServices Tripura is your one-stop platform to discover, apply
              for, and manage government services, certificates, and schemes.
              Get official guidance, document checklists, and step-by-step
              instructions for every process—making government interactions
              simple and transparent for everyone in Tripura.
            </p>
          </div>

          <div className="animate-fade-in-up delay-600">
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button
                size="lg"
                asChild
                className="text-lg px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group"
              >
                <Link to="/user-dashboard">
                  <Star className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                  Explore Services
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="text-lg px-8 py-4 border-2 border-gray-300 hover:border-purple-300 bg-white/80 backdrop-blur-sm hover:bg-purple-50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <Link to="/admin/login">
                  <Shield className="mr-2 h-5 w-5" />
                  Admin Portal
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-white/60 backdrop-blur-sm relative z-10">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center group hover:scale-105 transition-all duration-300"
              >
                <div className="flex items-center justify-center mb-4">
                  <div className="p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl text-white shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:rotate-3">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 relative z-10">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-6">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Why Choose InfoServices Tripura?
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We simplify government services for every citizen—find what you
              need, follow clear steps, and get support for certificates,
              schemes, and emergency services. No more confusion or wasted time.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 bg-white/80 backdrop-blur-sm group overflow-hidden relative"
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <CardHeader className="relative z-10">
                  <div className="mx-auto p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl text-white w-fit mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors duration-300">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <CardDescription className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        </div>

        <div className="container mx-auto text-center relative z-10">
          <div className="inline-flex items-center justify-center p-3 bg-white/20 rounded-2xl mb-8 backdrop-blur-sm">
            <TrendingUp className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Start Your Government Service Journey
          </h2>
          <p className="text-xl md:text-2xl mb-12 opacity-90 max-w-3xl mx-auto leading-relaxed">
            Join thousands of Tripura citizens who trust InfoServices to access,
            apply for, and manage their government services and certificates.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button
              size="lg"
              variant="secondary"
              asChild
              className="text-lg px-10 py-4 bg-white text-blue-600 hover:bg-gray-50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 font-semibold"
            >
              <Link to="/user-dashboard">
                <FileText className="mr-2 h-5 w-5" />
                Browse Services
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="text-lg px-10 py-4 bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 font-semibold"
            >
              <Link to="/admin/login">
                <Shield className="mr-2 h-5 w-5" />
                Service Provider?
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 bg-gray-900 text-white relative">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-12">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Search className="h-5 w-5 text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  InfoServices Tripura
                </span>
              </div>
              <p className="text-gray-400 text-lg leading-relaxed mb-6">
                Your trusted portal for all government services, certificates,
                and schemes in Tripura. Making government interactions simple
                and transparent.
              </p>
              <div className="flex space-x-4">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <Award className="h-5 w-5 text-white" />
                </div>
                <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <FileText className="h-5 w-5 text-white" />
                </div>
                <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <Phone className="h-5 w-5 text-white" />
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-xl mb-6 text-white">Platform</h3>
              <ul className="space-y-4 text-gray-400">
                <li>
                  <Link
                    to="/user-dashboard"
                    className="hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block font-medium"
                  >
                    User Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/login"
                    className="hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block font-medium"
                  >
                    Admin Portal
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-xl mb-6 text-white">Support</h3>
              <ul className="space-y-4 text-gray-400">
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block font-medium"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block font-medium"
                  >
                    Contact Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block font-medium"
                  >
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400 text-lg">
              &copy; 2024 InfoServices Tripura. All rights reserved. Made with{" "}
              <Heart className="inline h-4 w-4 text-red-500 mx-1" />
              for the people of Tripura.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
