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
  Globe,
  Award,
  Clock,
  FileText,
  Phone,
  CheckCircle,
  MapPin,
  BookOpen,
  Headphones,
  ChevronRight,
  Building2,
  Landmark,
  AlertCircle,
  MessageSquare,
  Mail,
  ExternalLink,
  Menu,
} from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

// ─── Data ───
const STATS = [
  { label: "Active Services", value: "500+", icon: Globe },
  { label: "Grievances Resolved", value: "10K+", icon: Users },
  { label: "Success Rate", value: "99%", icon: Award },
  { label: "Avg Response", value: "< 1hr", icon: Clock },
];

const FEATURES = [
  {
    icon: Search,
    title: "Find Services Easily",
    description:
      "Browse all official services, certificates, and schemes available to citizens of Tripura from a single, unified platform.",
  },
  {
    icon: Shield,
    title: "Trusted & Verified",
    description:
      "Every service detail and document requirement is sourced directly from government authorities and kept current.",
  },
  {
    icon: Zap,
    title: "Step-by-Step Guidance",
    description:
      "Clear instructions for applying, renewing, or updating certificates and services — no confusion, no wasted trips.",
  },
  {
    icon: Users,
    title: "For Every Citizen",
    description:
      "From students to seniors, everyone can access the right information and manage their government service needs.",
  },
];

const SERVICE_CATEGORIES = [
  {
    icon: FileText,
    title: "Certificates",
    description: "Birth, death, income, caste, residence and more — apply online or find your nearest office.",
    link: "/certificate-service",
    count: "50+",
  },
  {
    icon: BookOpen,
    title: "Schemes",
    description: "Education grants, housing subsidies, pension plans and welfare programmes for all eligible citizens.",
    link: "/scheme-service",
    count: "120+",
  },
  {
    icon: Phone,
    title: "Contact Directory",
    description: "Reach any government office directly — phone numbers, emails, addresses all in one place.",
    link: "/contact-service",
    count: "200+",
  },
  {
    icon: AlertCircle,
    title: "Grievances",
    description: "File complaints and track resolution status for any government service issue you face.",
    link: "/grievances-service",
    count: "24/7",
  },
  {
    icon: MessageSquare,
    title: "Feedback",
    description: "Rate services, share your experience, and help us improve government service delivery.",
    link: "/feedback-service",
    count: "Open",
  },
  {
    icon: Headphones,
    title: "Emergency Services",
    description: "Quick access to emergency contacts, helpline numbers, and disaster management resources.",
    link: "/user-dashboard",
    count: "24/7",
  },
];

const STEPS = [
  {
    step: "01",
    title: "Browse Services",
    description: "Explore the full catalogue of government services, certificates and schemes available in Tripura.",
  },
  {
    step: "02",
    title: "Check Requirements",
    description: "View the complete list of documents needed, eligibility criteria, and application fees.",
  },
  {
    step: "03",
    title: "Follow the Guide",
    description: "Step-by-step instructions walk you through the application process — online or offline.",
  },
  {
    step: "04",
    title: "Get It Done",
    description: "Submit your application with confidence. Track progress and get support if you need help.",
  },
];

const FAQ_ITEMS = [
  {
    q: "Is this an official government website?",
    a: "InfoServices Tripura is an information portal that aggregates publicly available government service data to help citizens navigate processes easily.",
  },
  {
    q: "Do I need to create an account?",
    a: "No. All service information, document requirements, and contact details are available without registration.",
  },
  {
    q: "How current is the information?",
    a: "Our team regularly updates service details. Each listing shows when it was last verified by administrators.",
  },
  {
    q: "Can I apply for services directly through this portal?",
    a: "For services with online application, we provide direct links to the official portals. For offline services, we provide addresses and office hours.",
  },
];

// ─── Component ───
export default function Index() {
  return (
    <div className="min-h-screen bg-white">
      {/* ─── Header ─── */}
      <header className="border-b border-slate-200 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg bg-teal-600 flex items-center justify-center">
                <Landmark className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-semibold text-slate-900 tracking-tight">
                InfoServices Tripura
              </span>
            </div>
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
              <a href="#services" className="hover:text-slate-900 transition-colors">Services</a>
              <a href="#how-it-works" className="hover:text-slate-900 transition-colors">How It Works</a>
              <a href="#faq" className="hover:text-slate-900 transition-colors">FAQ</a>
              <Link to="/user-dashboard" className="hover:text-slate-900 transition-colors">
                Dashboard
              </Link>
              <Button size="sm" asChild className="bg-teal-600 hover:bg-teal-700 text-white">
                <Link to="/admin/login">Admin Portal</Link>
              </Button>
            </nav>

            <div className="md:hidden flex items-center">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-slate-600">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle Menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-white">
                  <div className="flex flex-col gap-6 pt-10 px-2 h-full">
                    <a href="#services" className="text-lg font-semibold text-slate-800 hover:text-teal-600 transition-colors">Services</a>
                    <a href="#how-it-works" className="text-lg font-semibold text-slate-800 hover:text-teal-600 transition-colors">How It Works</a>
                    <a href="#faq" className="text-lg font-semibold text-slate-800 hover:text-teal-600 transition-colors">FAQ</a>
                    <div className="mt-auto border-t border-slate-100 pt-6 flex flex-col gap-4 pb-6">
                      <Button asChild variant="outline" className="w-full justify-center h-12 text-base font-medium">
                        <Link to="/user-dashboard">User Dashboard</Link>
                      </Button>
                      <Button asChild className="w-full justify-center bg-teal-600 hover:bg-teal-700 text-white h-12 text-base font-medium">
                        <Link to="/admin/login">Admin Portal</Link>
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      {/* ─── Hero ─── */}
      <section className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl">
            <Badge variant="outline" className="mb-5 text-teal-700 border-teal-200 bg-teal-50 text-xs font-medium px-3 py-1">
              Tripura's Unified Government Services Portal
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight tracking-tight">
              Government services,{" "}
              <span className="text-teal-700">simplified.</span>
            </h1>
            <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-2xl">
              One platform to discover, understand, and access every government service,
              certificate, and welfare scheme available to citizens of Tripura.
              Clear guidance, verified information, zero confusion.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button size="lg" asChild className="bg-teal-600 hover:bg-teal-700 text-white h-12 px-6 text-base">
                <Link to="/user-dashboard">
                  Explore All Services
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="h-12 px-6 text-base border-slate-300 text-slate-700 hover:bg-slate-100">
                <a href="#services">
                  Browse Categories
                  <ChevronRight className="ml-1 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Stats Bar ─── */}
      <section className="border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat) => (
              <div key={stat.label} className="flex items-center gap-4">
                <div className="h-11 w-11 rounded-lg bg-teal-50 flex items-center justify-center flex-shrink-0">
                  <stat.icon className="h-5 w-5 text-teal-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                  <div className="text-sm text-slate-500">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Service Categories ─── */}
      <section id="services" className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-2xl mb-12">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
              Everything you need, in one place
            </h2>
            <p className="mt-3 text-slate-600 text-lg">
              Access certificates, schemes, contact directories, grievance filing and more — all organized for quick navigation.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 relative">
            {SERVICE_CATEGORIES.map((cat) => (
              <Link key={cat.title} to={cat.link} className="group">
                <Card className="h-full border border-slate-200 hover:border-teal-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-white shadow-sm relative overflow-hidden rounded-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-teal-50/50 to-emerald-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <CardHeader className="pb-3 relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className="h-12 w-12 rounded-xl bg-slate-100 group-hover:bg-gradient-to-br group-hover:from-teal-500 group-hover:to-emerald-600 shadow-sm flex items-center justify-center transition-all duration-300">
                        <cat.icon className="h-6 w-6 text-slate-600 group-hover:text-white transition-colors duration-300" />
                      </div>
                      <Badge variant="secondary" className="text-xs font-semibold bg-slate-100 text-slate-600 group-hover:bg-teal-100 group-hover:text-teal-700 transition-colors duration-300 px-2.5 py-1">
                        {cat.count}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl font-bold text-slate-900 group-hover:text-teal-700 transition-colors duration-300">
                      {cat.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <CardDescription className="text-sm text-slate-600 leading-relaxed font-medium">
                      {cat.description}
                    </CardDescription>
                    <div className="mt-5 flex items-center text-sm font-semibold text-teal-600 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-[-10px] group-hover:translate-x-0">
                      Browse services <ArrowRight className="ml-1.5 h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Why Choose Us ─── */}
      <section className="bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
              Why citizens trust this platform
            </h2>
            <p className="mt-3 text-slate-600 text-lg">
              Built to make government interactions simpler, faster, and more transparent for every citizen of Tripura.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {FEATURES.map((feature) => (
              <div key={feature.title} className="text-center group p-6 rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-slate-100">
                <div className="mx-auto h-16 w-16 rounded-2xl bg-white border border-slate-200 flex items-center justify-center mb-5 shadow-sm group-hover:scale-110 group-hover:border-teal-200 transition-transform duration-300 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-teal-50 to-emerald-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <feature.icon className="h-7 w-7 text-teal-600 relative z-10" />
                </div>
                <h3 className="font-bold text-slate-900 mb-3 text-lg">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed font-medium">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── How It Works ─── */}
      <section id="how-it-works" className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-2xl mb-14">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
              How it works
            </h2>
            <p className="mt-3 text-slate-600 text-lg">
              Four simple steps to access any government service in Tripura.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {STEPS.map((item, index) => (
              <div key={item.step} className="relative group p-6 rounded-2xl hover:bg-slate-50 transition-colors duration-300">
                {index < STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-[52px] left-full w-[calc(100%-48px)] h-px border-t-2 border-dashed border-slate-200 -translate-x-6 group-hover:border-teal-200 transition-colors duration-300" />
                )}
                <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-slate-200 to-slate-300 mb-5 group-hover:from-teal-300 group-hover:to-teal-500 transition-all duration-300 drop-shadow-sm">{item.step}</div>
                <h3 className="font-bold text-slate-900 mb-3 text-lg group-hover:text-teal-700 transition-colors duration-300">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed font-medium text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Info Banner ─── */}
      <section className="bg-teal-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <h2 className="text-2xl font-bold text-white mb-2">
                Ready to get started?
              </h2>
              <p className="text-teal-100 text-lg max-w-xl">
                Join thousands of Tripura citizens who use InfoServices to navigate government
                processes with confidence.
              </p>
            </div>
            <div className="flex gap-3">
              <Button size="lg" asChild className="bg-white text-teal-700 hover:bg-teal-50 h-12 px-6 font-semibold">
                <Link to="/user-dashboard">
                  <FileText className="mr-2 h-4 w-4" />
                  Browse Services
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-teal-400 text-white hover:bg-teal-700 h-12 px-6 font-semibold">
                <Link to="/admin/login">
                  <Shield className="mr-2 h-4 w-4" />
                  Admin Login
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section id="faq" className="bg-slate-50 border-t border-slate-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight text-center mb-12">
            Frequently asked questions
          </h2>
          <div className="space-y-4">
            {FAQ_ITEMS.map((item) => (
              <div key={item.q} className="group bg-white border border-slate-200 hover:border-teal-300 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer">
                <h3 className="font-bold text-slate-900 mb-2 flex items-start gap-3 group-hover:text-teal-800 transition-colors duration-300">
                  <CheckCircle className="h-6 w-6 text-teal-500 bg-teal-50 rounded-full p-1 flex-shrink-0 mt-0.5" />
                  {item.q}
                </h3>
                <p className="text-slate-600 leading-relaxed ml-9 font-medium">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Quick Links ─── */}
      <section className="bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid sm:grid-cols-3 gap-6">
            <Card className="border-slate-200 hover:border-teal-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 rounded-2xl overflow-hidden group bg-white">
              <CardHeader className="bg-slate-50 group-hover:bg-teal-50/50 transition-colors duration-300 pb-5">
                <div className="h-14 w-14 rounded-xl bg-white shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 border border-slate-100 group-hover:border-teal-100">
                  <Building2 className="h-7 w-7 text-teal-600 group-hover:text-teal-700" />
                </div>
                <CardTitle className="text-xl font-bold">Government Offices</CardTitle>
              </CardHeader>
              <CardContent className="pt-5">
                <CardDescription className="text-sm mb-5 font-medium leading-relaxed text-slate-600">
                  Find addresses, phone numbers and working hours for all district and sub-division offices.
                </CardDescription>
                <Link to="/contact-service" className="text-sm font-bold text-teal-600 hover:text-teal-700 inline-flex items-center">
                  View directory <ExternalLink className="ml-1.5 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </CardContent>
            </Card>

            <Card className="border-slate-200 hover:border-teal-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 rounded-2xl overflow-hidden group bg-white">
              <CardHeader className="bg-slate-50 group-hover:bg-teal-50/50 transition-colors duration-300 pb-5">
                <div className="h-14 w-14 rounded-xl bg-white shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 border border-slate-100 group-hover:border-teal-100">
                  <MapPin className="h-7 w-7 text-teal-600 group-hover:text-teal-700" />
                </div>
                <CardTitle className="text-xl font-bold">District Services</CardTitle>
              </CardHeader>
              <CardContent className="pt-5">
                <CardDescription className="text-sm mb-5 font-medium leading-relaxed text-slate-600">
                  Services organized by district — find what's available in your area and how to apply.
                </CardDescription>
                <Link to="/scheme-service" className="text-sm font-bold text-teal-600 hover:text-teal-700 inline-flex items-center">
                  Explore schemes <ExternalLink className="ml-1.5 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </CardContent>
            </Card>

            <Card className="border-slate-200 hover:border-teal-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 rounded-2xl overflow-hidden group bg-white">
              <CardHeader className="bg-slate-50 group-hover:bg-teal-50/50 transition-colors duration-300 pb-5">
                <div className="h-14 w-14 rounded-xl bg-white shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 border border-slate-100 group-hover:border-teal-100">
                  <Headphones className="h-7 w-7 text-teal-600 group-hover:text-teal-700" />
                </div>
                <CardTitle className="text-xl font-bold">Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="pt-5">
                <CardDescription className="text-sm mb-5 font-medium leading-relaxed text-slate-600">
                  File a grievance, give feedback, or reach out to our support team for assistance.
                </CardDescription>
                <Link to="/grievances-service" className="text-sm font-bold text-teal-600 hover:text-teal-700 inline-flex items-center">
                  Get support <ExternalLink className="ml-1.5 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Brand */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-9 w-9 rounded-lg bg-teal-600 flex items-center justify-center">
                  <Landmark className="h-5 w-5 text-white" />
                </div>
                <span className="text-lg font-semibold tracking-tight">InfoServices Tripura</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed max-w-md mb-6">
                Your trusted portal for all government services, certificates, and welfare
                schemes in Tripura. Making government interactions simple and transparent
                for every citizen.
              </p>
              <div className="flex gap-2">
                <div className="h-9 w-9 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-slate-700 transition-colors cursor-pointer">
                  <Mail className="h-4 w-4 text-slate-400" />
                </div>
                <div className="h-9 w-9 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-slate-700 transition-colors cursor-pointer">
                  <Phone className="h-4 w-4 text-slate-400" />
                </div>
                <div className="h-9 w-9 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-slate-700 transition-colors cursor-pointer">
                  <Globe className="h-4 w-4 text-slate-400" />
                </div>
              </div>
            </div>

            {/* Platform */}
            <div>
              <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">Platform</h4>
              <ul className="space-y-2.5 text-sm text-slate-400">
                <li>
                  <Link to="/user-dashboard" className="hover:text-white transition-colors">Dashboard</Link>
                </li>
                <li>
                  <Link to="/scheme-service" className="hover:text-white transition-colors">Schemes</Link>
                </li>
                <li>
                  <Link to="/certificate-service" className="hover:text-white transition-colors">Certificates</Link>
                </li>
                <li>
                  <Link to="/contact-service" className="hover:text-white transition-colors">Contact Directory</Link>
                </li>
                <li>
                  <Link to="/grievances-service" className="hover:text-white transition-colors">Grievances</Link>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">Support</h4>
              <ul className="space-y-2.5 text-sm text-slate-400">
                <li>
                  <Link to="/feedback-service" className="hover:text-white transition-colors">Feedback</Link>
                </li>
                <li>
                  <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
                </li>
                <li>
                  <Link to="/admin/login" className="hover:text-white transition-colors">Admin Portal</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-500">
              &copy; {new Date().getFullYear()} InfoServices Tripura. All rights reserved.
            </p>
            <p className="text-sm text-slate-500">
              Made for the citizens of Tripura
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
