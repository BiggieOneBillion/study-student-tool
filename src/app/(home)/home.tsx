"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowRight,
  Zap,
  BookOpen,
  Target,
  Users2,
  CheckCircle2,
  Menu,
  Brain,
  Lightbulb,
  PenSquare,
  GraduationCap,
} from "lucide-react";
import LoginForm from "./_components/login-form";
import RegisterForm from "./_components/register-form";
import FeatureSection from "./_components/feature-section";
import Signin from "../sign-in/_component/sign-in";
import Signup from "../sign-up/_component/sign-up";
// Remove TestimonialSlider import

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("login");
  const [showAuth, setShowAuth] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      {/* Header */}
      <header className="border-b border-emerald-100">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-emerald-500 p-2 text-white">
              <Zap className="h-5 w-5" />
            </div>
            <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-xl font-bold text-transparent">
              LearnSphere
            </span>
          </div>

          {/* Mobile menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="mt-8 flex flex-col gap-4">
                  <Tabs
                    defaultValue="login"
                    className="w-full"
                    value={activeTab}
                    onValueChange={setActiveTab}
                  >
                    <TabsList className="mb-8 grid w-full grid-cols-2">
                      <TabsTrigger value="login">Login</TabsTrigger>
                      <TabsTrigger value="register">Register</TabsTrigger>
                    </TabsList>
                    <TabsContent value="login">
                      <LoginForm />
                    </TabsContent>
                    <TabsContent value="register">
                      <RegisterForm />
                    </TabsContent>
                  </Tabs>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop menu */}
          <div className="hidden items-center gap-4 md:flex">
            <Sheet open={showAuth} onOpenChange={setShowAuth}>
              <SheetTrigger asChild>
                <Button variant="outline" className="border-emerald-200">
                  Login
                </Button>
              </SheetTrigger>
              <SheetContent>
                <Tabs
                  defaultValue="login"
                  className="w-full"
                  value={activeTab}
                  onValueChange={setActiveTab}
                >
                  <TabsList className="mb-8 grid w-full grid-cols-2">
                    <TabsTrigger value="login">Login</TabsTrigger>
                    <TabsTrigger value="register">Register</TabsTrigger>
                  </TabsList>
                  <TabsContent value="login">
                    <Signin />
                  </TabsContent>
                  <TabsContent value="register">
                    {/* <RegisterForm /> */}
                    <Signup />
                  </TabsContent>
                </Tabs>
              </SheetContent>
            </Sheet>

            <Button
              onClick={() => setShowAuth(true)}
              className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
            >
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <div className="relative">
              <div className="absolute -left-6 -top-6 h-24 w-24 rounded-full bg-emerald-100 opacity-50"></div>
              <div className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-teal-100 opacity-50"></div>
              <h1 className="relative mb-6 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
                Master IT Skills with{" "}
                <span className="text-emerald-600">AI-Driven</span> Learning
              </h1>
            </div>
            <p className="mb-8 max-w-lg text-lg text-gray-600">
              Our platform uses artificial intelligence to create personalized
              learning experiences, automated assessments, and collaborative
              tools for IT students.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button
                size="lg"
                className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
                onClick={() => setShowAuth(true)}
              >
                Start Your Journey
              </Button>
              {/* <Button size="lg" variant="outline" className="border-emerald-200">
                Watch Demo
              </Button> */}
            </div>

            <div className="mt-12 flex items-center gap-6">
              <div className="flex -space-x-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-300 font-medium text-white">
                  J
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-400 font-medium text-white">
                  S
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 font-medium text-white">
                  K
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-600 font-medium text-white">
                  M
                </div>
              </div>
              <p className="text-sm text-gray-600">
                <span className="font-medium">2,500+</span> students already
                learning
              </p>
            </div>
          </div>

          <div className="relative order-1 lg:order-2">
            <div className="max-h-md absolute left-1/2 top-1/2 h-full w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-emerald-300/20 to-teal-300/20 blur-3xl"></div>
            <div className="relative overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-xl">
              <div className="h-3 bg-gradient-to-r from-emerald-500 to-teal-600"></div>
              <div className="p-6">
                <h3 className="mb-4 font-medium">
                  Your Personalized Learning Path
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <div className="h-5 w-3/4 rounded-md bg-emerald-100"></div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <div className="h-5 w-2/3 rounded-md bg-emerald-100"></div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                      <div className="h-3 w-3 rounded-full"></div>
                    </div>
                    <div className="flex-1">
                      <div className="h-5 w-4/5 rounded-md bg-gray-100"></div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                      <div className="h-3 w-3 rounded-full"></div>
                    </div>
                    <div className="flex-1">
                      <div className="h-5 w-1/2 rounded-md bg-gray-100"></div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 border-t border-gray-100 pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-gray-500">
                        Current progress
                      </div>
                      <div className="font-medium">42% Complete</div>
                    </div>
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-emerald-500 to-teal-600"
                    >
                      Continue <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Revolutionize Your Learning Experience
            </h2>
            <p className="text-lg text-gray-600">
              Our platform combines AI technology with proven educational
              methods to create a powerful learning environment.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <FeatureSection
              icon={<Target className="h-8 w-8 text-emerald-500" />}
              title="AI-Generated Learning Paths"
              description="Our AI analyzes your skills, goals, and learning style to create a personalized curriculum that adapts as you progress."
              items={[
                "Skill gap analysis",
                "Personalized curriculum",
                "Adaptive difficulty",
                "Progress tracking",
              ]}
            />

            <FeatureSection
              icon={<BookOpen className="h-8 w-8 text-emerald-500" />}
              title="Automated Chapter Quizzes"
              description="Reinforce your knowledge with intelligent quizzes that identify and target your weak areas."
              items={[
                "Concept validation",
                "Knowledge retention",
                "Weak area identification",
                "Spaced repetition",
              ]}
            />

            <FeatureSection
              icon={<Users2 className="h-8 w-8 text-emerald-500" />}
              title="Collaborative Study Notes"
              description="Create and edit study materials in real-time with peers, enhancing comprehension through collaboration."
              items={[
                "Real-time editing",
                "Version history",
                "Comment threads",
                "Resource sharing",
              ]}
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gradient-to-b from-white to-emerald-50 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              How Our Platform Works
            </h2>
            <p className="text-lg text-gray-600">
              A simple four-step process to transform your IT education journey
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-4">
            {[
              {
                number: "01",
                title: "Assessment",
                description:
                  "Complete a comprehensive skill assessment to identify your current knowledge level.",
              },
              {
                number: "02",
                title: "Personalization",
                description:
                  "Our AI creates a custom learning path based on your goals and current abilities.",
              },
              {
                number: "03",
                title: "Learning",
                description:
                  "Follow your personalized curriculum with interactive content and quizzes.",
              },
              {
                number: "04",
                title: "Collaboration",
                description:
                  "Enhance your understanding by collaborating with peers on study materials.",
              },
            ].map((step, index) => (
              <div key={index} className="relative">
                <div className="absolute -left-6 -top-6 text-7xl font-bold text-emerald-100">
                  {step.number}
                </div>
                <div className="relative rounded-xl border border-emerald-100 bg-white p-6 shadow-sm">
                  <h3 className="mb-3 text-xl font-bold">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - Enhanced Section */}
      <section className="bg-emerald-50 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              How Our Platform Works
            </h2>
            <p className="text-lg text-gray-600">
              Experience a revolutionary approach to IT education with our
              AI-powered learning system
            </p>
          </div>

          <div className="mb-16 grid gap-16 md:grid-cols-2">
            <div className="order-2 md:order-1">
              <div className="relative rounded-xl border border-emerald-100 bg-white p-6 shadow-sm">
                <div className="absolute -left-4 -top-4 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 font-bold text-white">
                  1
                </div>
                <h3 className="mb-4 text-xl font-bold">
                  AI Assessment & Analysis
                </h3>
                <p className="mb-4 text-gray-600">
                  Our AI evaluates your current skills, learning style, and
                  career goals through a comprehensive assessment.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    <span className="text-sm">Skill gap identification</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    <span className="text-sm">Learning style analysis</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    <span className="text-sm">Career goal alignment</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="order-1 flex items-center justify-center md:order-2">
              <div className="relative">
                <div className="absolute left-1/2 top-1/2 -z-10 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-100 opacity-50"></div>
                <div className="rounded-xl border border-emerald-100 bg-white p-4 shadow-md">
                  <div className="rounded-lg bg-emerald-50 p-6">
                    <Brain className="mx-auto mb-4 h-16 w-16 text-emerald-500" />
                    <div className="mx-auto mb-2 h-4 w-3/4 rounded-full bg-emerald-200"></div>
                    <div className="mx-auto mb-2 h-4 w-1/2 rounded-full bg-emerald-200"></div>
                    <div className="mx-auto h-4 w-2/3 rounded-full bg-emerald-200"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-16 grid gap-16 md:grid-cols-2">
            <div className="flex items-center justify-center">
              <div className="relative">
                <div className="absolute left-1/2 top-1/2 -z-10 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal-100 opacity-50"></div>
                <div className="rounded-xl border border-emerald-100 bg-white p-4 shadow-md">
                  <div className="rounded-lg bg-emerald-50 p-6">
                    <Lightbulb className="mx-auto mb-4 h-16 w-16 text-emerald-500" />
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-xs text-white">
                          1
                        </div>
                        <div className="h-3 flex-1 rounded-full bg-emerald-200"></div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-xs text-white">
                          2
                        </div>
                        <div className="h-3 flex-1 rounded-full bg-emerald-200"></div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-400 text-xs text-white">
                          3
                        </div>
                        <div className="h-3 flex-1 rounded-full bg-emerald-200"></div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 text-xs text-gray-400">
                          4
                        </div>
                        <div className="h-3 flex-1 rounded-full bg-gray-200"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="relative rounded-xl border border-emerald-100 bg-white p-6 shadow-sm">
                <div className="absolute -left-4 -top-4 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 font-bold text-white">
                  2
                </div>
                <h3 className="mb-4 text-xl font-bold">
                  Personalized Learning Path
                </h3>
                <p className="mb-4 text-gray-600">
                  Our AI generates a custom curriculum tailored to your specific
                  needs, with the perfect balance of theory and practice.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    <span className="text-sm">Custom topic sequencing</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    <span className="text-sm">Adaptive difficulty levels</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    <span className="text-sm">Resource recommendations</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mb-16 grid gap-16 md:grid-cols-2">
            <div className="order-2 md:order-1">
              <div className="relative rounded-xl border border-emerald-100 bg-white p-6 shadow-sm">
                <div className="absolute -left-4 -top-4 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 font-bold text-white">
                  3
                </div>
                <h3 className="mb-4 text-xl font-bold">
                  Interactive Learning & Quizzes
                </h3>
                <p className="mb-4 text-gray-600">
                  Engage with interactive content and take AI-generated quizzes
                  that adapt to your knowledge gaps.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    <span className="text-sm">Chapter-based assessments</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    <span className="text-sm">Instant feedback</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    <span className="text-sm">
                      Spaced repetition for retention
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="order-1 flex items-center justify-center md:order-2">
              <div className="relative">
                <div className="absolute left-1/2 top-1/2 -z-10 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-100 opacity-50"></div>
                <div className="rounded-xl border border-emerald-100 bg-white p-4 shadow-md">
                  <div className="rounded-lg bg-emerald-50 p-6">
                    <PenSquare className="mx-auto mb-4 h-16 w-16 text-emerald-500" />
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                          <CheckCircle2 className="h-4 w-4" />
                        </div>
                        <div className="h-3 flex-1 rounded-full bg-emerald-200"></div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                          <CheckCircle2 className="h-4 w-4" />
                        </div>
                        <div className="h-3 flex-1 rounded-full bg-emerald-200"></div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-red-100 text-red-500">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M18 6 6 18"></path>
                            <path d="m6 6 12 12"></path>
                          </svg>
                        </div>
                        <div className="h-3 flex-1 rounded-full bg-emerald-200"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-16 md:grid-cols-2">
            <div className="flex items-center justify-center">
              <div className="relative">
                <div className="absolute left-1/2 top-1/2 -z-10 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal-100 opacity-50"></div>
                <div className="rounded-xl border border-emerald-100 bg-white p-4 shadow-md">
                  <div className="rounded-lg bg-emerald-50 p-6">
                    <GraduationCap className="mx-auto mb-4 h-16 w-16 text-emerald-500" />
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-xs">
                        JS
                      </div>
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-xs">
                        KL
                      </div>
                    </div>
                    <div className="mb-3 rounded-lg border border-dashed border-emerald-200 p-3">
                      <div className="mb-2 h-2 w-full rounded-full bg-emerald-200"></div>
                      <div className="mb-2 h-2 w-3/4 rounded-full bg-emerald-200"></div>
                      <div className="h-2 w-1/2 rounded-full bg-emerald-200"></div>
                    </div>
                    <div className="mx-auto h-6 w-1/2 rounded-lg bg-emerald-200"></div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="relative rounded-xl border border-emerald-100 bg-white p-6 shadow-sm">
                <div className="absolute -left-4 -top-4 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 font-bold text-white">
                  4
                </div>
                <h3 className="mb-4 text-xl font-bold">
                  Collaborative Study & Mastery
                </h3>
                <p className="mb-4 text-gray-600">
                  Work with peers in real-time on collaborative study notes and
                  projects to deepen your understanding.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    <span className="text-sm">
                      Real-time document collaboration
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    <span className="text-sm">
                      Peer feedback and discussion
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    <span className="text-sm">Project-based learning</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <Button
              onClick={() => setShowAuth(true)}
              size="lg"
              className="bg-gradient-to-r from-emerald-500 to-teal-600"
            >
              Start Your Learning Journey
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-emerald-500 to-teal-600 py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">
              Ready to Transform Your IT Learning?
            </h2>
            <p className="mb-8 text-xl opacity-90">
              Join thousands of students who are accelerating their careers with
              our AI-powered platform.
            </p>
            <Button
              onClick={() => setShowAuth(true)}
              size="lg"
              variant="secondary"
              className="bg-white text-emerald-600 hover:bg-gray-100"
            >
              Get Started For Free
            </Button>
            <p className="mt-4 text-sm opacity-80">
              {" "}
              • No credit card required •{" "}
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12 text-gray-400">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <div className="mb-6 flex items-center gap-2 md:mb-0">
              <div className="rounded bg-emerald-500 p-1.5 text-white">
                <Zap className="h-4 w-4" />
              </div>
              <span className="font-bold text-white">LearnSphere</span>
            </div>
            <div className="text-sm">
              © {new Date().getFullYear()} LearnSphere. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
