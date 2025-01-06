"use client"
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  Users, 
  Zap, 
  Layout, 
  ArrowRight,
  LogIn
} from 'lucide-react';
import { useState } from 'react';
import Image from "next/image";
import logo from "@/public/paper-trail-logo.png";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useAuth } from "@clerk/clerk-react";  

const Home = () => {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  const router = useRouter()

  const { isSignedIn } = useAuth();  

  if (isSignedIn) {
    router.push('/trail'); 
    return null;  
  }

  const onReRoute = () => {
    router.push('/trail')
  } 

  const features = [
    {
      icon: <Zap className="w-6 h-6 text-blue-500" />,
      title: "Real-time Collaboration",
      description: "Work together seamlessly with your team in real-time, powered by LiveBlocks technology."
    },
    {
      icon: <Layout className="w-6 h-6 text-purple-500" />,
      title: "Rich Templates",
      description: "Jump-start your documents with our professionally designed templates for any purpose."
    },
    {
      icon: <Users className="w-6 h-6 text-green-500" />,
      title: "Team Workspaces",
      description: "Organize documents by team or keep them personal - you're in control of your workspace."
    }
  ];

  const templates = [
    {
      title: "Software Proposal",
      icon: <FileText className="w-8 h-8 text-blue-500" />,
      description: "Professional templates for software project proposals",
      bgColor: "bg-blue-50"
    },
    {
      title: "Project Planning",
      icon: <FileText className="w-8 h-8 text-purple-500" />,
      description: "Comprehensive project planning documents",
      bgColor: "bg-purple-50"
    },
    {
      title: "Cover Letter",
      icon: <FileText className="w-8 h-8 text-green-500" />,
      description: "Stand out with our cover letter templates",
      bgColor: "bg-green-50"
    },
    {
      title: "Resume",
      icon: <FileText className="w-8 h-8 text-orange-500" />,
      description: "Professional resume templates that get you noticed",
      bgColor: "bg-orange-50"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}

      <div className="w-full p-3 flex justify-between text-muted-foreground items-center  ">

            <div className='flex gap-2 items-center '>

            <Link href="/">
          <Image src={logo} alt="logo" width="75" height="75" />
        </Link>

        <p className="font-semibold text-lg">PaperTrail </p>

            </div>

            <Button className='flex gap-2 items-center'
            onClick={onReRoute}
            >
            <LogIn className='size-4'  />
               Sign In</Button>
             </div>
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-50" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 relative">
          <div className="text-center">
            <h1 className="text-6xl font-bold text-gray-900 mb-6 tracking-tight">
              Beautiful Documents,{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                Made Together
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
              Create, collaborate, and share stunning documents with PaperTrail&apos;s powerful editor and real-time collaboration.
            </p>
            <div className="flex justify-center gap-4 center-on-sm-btn">
              <Button             onClick={onReRoute}
 size="lg" className="bg-blue-600 hover:bg-blue-700 px-8 py-6 text-lg">
                Get Started Free
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button             onClick={onReRoute}
 size="lg" variant="outline" className="px-8 py-6 text-lg">
                View Templates
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 bg-white sm:text-center">
        <div className="text-center mb-16 ">
          <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Everything you need to create and manage beautiful documents
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="p-8 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 center-on-sm"
              onMouseEnter={() => setHoveredFeature(index)}
              onMouseLeave={() => setHoveredFeature(null)}
            >
              <div className={`mb-6 transform transition-transform duration-300 sm:text-center flex sm:justify-center sm:items-center center-on-sm-icon ${
                hoveredFeature === index ? 'scale-110' : ''
              }`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Templates Section */}
      <div className="bg-gray-50 py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 sm:text-center center-on-sm  ">
          <h2 className="text-4xl font-bold text-center mb-16">
            Start with Beautiful Templates
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {templates.map((template, index) => (
              <div 
                key={index}
                className={`p-6 rounded-2xl transition-all duration-300 hover:shadow-lg cursor-pointer ${template.bgColor}`}
              >
                <div className="mb-4 transform transition-transform duration-300 hover:scale-110 sm:text-center flex sm:justify-center sm:items-center center-on-sm-icon">
                  {template.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  {template.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {template.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      

      {/* Footer */}
      <footer className="bg-gray-50 py-2">
          <div className="w-full p-3 flex justify-between text-muted-foreground items-center center-on-sm-footer">

            <div className='flex gap-2 items-center center-on-sm-footer-icon'>

            <Link href="/">
          <Image src={logo} alt="logo" width="75" height="75" />
        </Link>

              <div className="flex flex-col gap-2">

              <h3 className="font-bold   text-xl">PaperTrail</h3>
              <p className="text-gray-600 text-sm">
                Beautiful documents, made together.
              </p>
              </div>
            </div>

            <p>&copy; 2024 OPAULO.co</p>
             </div>
      </footer>
    </div>
  );
};

export default Home;