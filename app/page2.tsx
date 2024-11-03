'use client'

import { talks } from '@/app/page' // Fixed absolute import path
import { ExternalLink } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function TalksPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gray-900 text-green-400 p-4 md:p-8 font-mono">
      <main className="max-w-4xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-4xl font-bold text-blue-400">[all_talks]</h1>
          <button
            onClick={() => router.back()}
            className="text-blue-400 hover:text-blue-300"
          >
            &lt; BACK_TO_MAIN.exe
          </button>
        </div>

        <div className="grid gap-4">
          {talks.map((talk, index) => (
            <div 
              key={index} 
              className="border border-green-500 p-4 rounded-lg hover:border-blue-400 transition-colors"
            >
              <h3 className="text-xl font-bold text-green-300 mb-2">{talk.title}</h3>
              <div className="flex items-center space-x-2 text-green-400 text-sm mb-3">
                <span className="px-2 py-1 bg-green-900/30 rounded">
                  {talk.event}
                </span>
                <span className="px-2 py-1 bg-green-900/30 rounded">
                  {talk.location}
                </span>
              </div>
              <a 
                href={talk.link} 
                target="_blank"
                rel="noopener noreferrer" 
                className="text-blue-400 hover:text-blue-300 inline-flex items-center group"
              >
                <span className="group-hover:underline">View Presentation</span>
                <ExternalLink className="ml-1 w-4 h-4" />
              </a>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}