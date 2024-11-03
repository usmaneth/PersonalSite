'use client'

import { useState, useEffect, useRef } from 'react'
import { Github, Mail, Twitter, ExternalLink, Linkedin, MessageCircle } from 'lucide-react'

const writtenWork = [
  {
    id: 'neural-network-guide',
    title: "Time to Finality: Best Metric For Blockchain Speed",
    date: "2024-01-15",
    excerpt: "An introduction to the concept of Time to Finality (TTF) and why it's a better metric for blockchain speed than transaction per second.",
    link: "https://www.avax.network/blog/time-to-finality-ttf-the-ultimate-metric-for-blockchain-speed"
  },
  {
    id: 'system-design-guide',
    title: "Avalanche Subnets, Polygon Supernets, & Cosmos App Chains: Research Report",
    date: "2023-07-31",
    excerpt: "A research report on Avalanche Subnets, Polygon Supernets, and Cosmos App Chains. Delving into the technical details of each, spanning consensus mechanisms, security, costs and more.",
    link: "https://medium.com/@avaxdevelopers/avalanche-subnets-polygon-supernets-cosmos-app-chains-research-report-35b0a6cb830f"
  },
  {
    id: 'sleep-deprived-coding',
    title: "Deploying a Distributed EVM Layer 1 Blockchain using Avalanche, Docker, and GitHub Codespaces",
    date: "2023-11-02",
    excerpt: "A step by step guide to deploying a distributed EVM Layer 1 blockchain using Avalanche, Docker, and GitHub Codespaces.",
    link: "https://dev.to/usmanasim/deploying-a-distributed-evm-layer-1-blockchain-using-avalanche-docker-and-github-codespaces-5eo6"
  }
  // ... add more entries as needed
]

const talks = [
  {
    title: "Consensus 2024: Custom Virtual Machines, Powerful Consensus Mechanisms, and 100k TPS on Avalanche",
    event: "In Person Talk",
    location: "Austin, TX",
    link: "https://x.com/asimfiles/status/1801282893064614282",
  },
  {
    title: "Scaling Enterprise Systems with Avalanche: UDC Developer Conference 2023",
    event: "In Person Talk",
    location: "Seoul, South Korea",
    link: "https://www.youtube.com/watch?v=o4it_zJDhLk&t=73s",
  },
  {
    title: "Do It Yourself: Blockchain Creation @ ETHDenver 2024",
    event: "In Person Talk",
    location: "Denver, CO",
    link: "https://www.youtube.com/watch?v=SSzRBfljjGA",
  },
  {
    title: "Avalanche: The L1 Launchpad @ ETH CC 2024",
    event: "In Person Talk",
    location: "Brussels, Belgium",
    link: "https://www.youtube.com/watch?v=1knOqRex_Ag",
  },
  {
    title: "Encode Club 'Future of University' Hackathon Workshop",
    event: "Hackathon",
    location: "Online",
    link: "https://www.youtube.com/watch?v=9UkeaKDJqSs&t=121s",
  },
  {
    title: "Blockchain Infrastructure as a Service @ Subnet Show",
    event: "Podcast",
    location: "Online",
    link: "https://www.youtube.com/watch?v=49KjlAHtt94",
  },
  {
    title: "Theory Thursdays @ ETHDenver 2023",
    event: "Hackathon",
    location: "Denver, CO",
    link: "https://www.youtube.com/watch?v=mIOcSc1owYs",
  }
]

// Fix potential type issues with CLI history
interface CliHistoryItem {
  command: string
  response: string
}

// Add these types and state
interface StoryState {
  stage: number;
  hasSeenIntro: boolean;
  discoveredCommands: string[];
}
type Selection = 'about' | 'written-work' | 'talks' | 'contact'

export default function Component() {
  const [showAllTalks, setShowAllTalks] = useState(false)
  const visibleTalks = showAllTalks ? talks : talks.slice(0, 4)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [activeSection, setActiveSection] = useState<Selection>('about')
  const [cliHistory, setCliHistory] = useState<string[]>([])
  const [cliInput, setCliInput] = useState('')
  const cliRef = useRef<HTMLDivElement>(null)
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [isGameOpen, setIsGameOpen] = useState(false)
  const [gameScore, setGameScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [storyState, setStoryState] = useState<StoryState>({
    stage: 0,
    hasSeenIntro: false,
    discoveredCommands: ['start', 'help']
  })

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])
  const handleSectionClick = (section: Selection) => {
    setActiveSection(section)
    const element = document.getElementById(section)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleCliSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const command = cliInput.toLowerCase().trim()
    let response = ''

    switch (command) {
      case 'start':
        if (!storyState.hasSeenIntro) {
          response = `* TERMINAL INITIALIZED *
* HUMAN DETECTED *

Welcome to this corner of the internet. I'm Usman, 
and this is my digital garden (slightly better maintained than my real one).

I see you've managed to find your way here - either through careful 
navigation or a lucky series of keystrokes. Either way, welcome.

Want to know who's behind this terminal? Try 'background'.
Lost? Type 'help' - it works most of the time.

Note: No semicolons were forgotten in the making of this website.`
          setStoryState(prev => ({ 
            ...prev, 
            hasSeenIntro: true,
            discoveredCommands: [...prev.discoveredCommands, 'background']
          }))
        } else {
          response = `We've already met! Unless you're testing for race conditions,
in which case... hello again?

Try 'background' for my story, or 'help' if you're lost.`
        }
        break

      case 'help':
        response = `Available commands:
${storyState.discoveredCommands.map(cmd => `> ${cmd}`).join('\n')}

More commands exist in a quantum state of being both discovered 
and undiscovered until you progress further.`
        break

      case 'background':
        response = `I'm a Software Engineer with a plot twist - I talk a lot.

This unexpected feature turned out to be quite useful, leading me into 
Developer Relations, where I now work on the forefront of developer 
acquisition and experience with cutting-edge tech.

Think of it as debugging human-computer interactions.

Curious about what happens after hours? Try 'night'`
        setStoryState(prev => ({
          ...prev,
          discoveredCommands: [...prev.discoveredCommands, 'night']
        }))
        break

      case 'night':
        response = `*logs detected after normal working hours*

Ah yes, the mysterious "free time" hours. While most developers are debugging 
production issues, I'm usually found tinkering with:

- Distributed Systems (because regular systems are too... centralized)
- Encryption (making things hard to read, professionally)
- Zero Knowledge Proofs (proving I know things without telling you what I know)
- AI (teaching machines to be almost as smart as my cat)
- Biotech (not creating any superviruses, promise)

...and whatever else catches my attention in this vast digital cosmos.

Wondering if I have a life outside the matrix? Try 'outside'`
        setStoryState(prev => ({
          ...prev,
          discoveredCommands: [...prev.discoveredCommands, 'outside']
        }))
        break

      case 'outside':
        response = `ERROR: HUMAN_ACTIVITIES.exe found

Contrary to popular belief, I do occasionally step away from the keyboard:

🏀 Basketball enthusiast (Yes, I support both Lakers AND Knicks. No, I'm not a masochist)
📚 Reader of books (the paper kind, not just documentation)
🙏 Time with God (debugging the soul)
👨‍👩‍👦 Family time (my first distributed system)
🐱 Cat guy (let's be honest about who's in charge)
💪 Gym goer (attempting to upgrade the human hardware)
✍️ Writer (fiction when the bugs are too much, non-fiction when they make sense)

And that's the entire changelog of my non-digital existence.

Need to establish a peer-to-peer connection? Try 'contact'`
        setStoryState(prev => ({
          ...prev,
          discoveredCommands: [...prev.discoveredCommands, 'contact']
        }))
        break

      case 'projects':
        response = `Here are some things I'm proud of:
[1] Custom Virtual Machines for Blockchain
[2] Scalable Enterprise Systems
[3] Technical Writing & Speaking

Type 'skills' to see what I work with.`
        setStoryState(prev => ({
          ...prev,
          discoveredCommands: [...prev.discoveredCommands, 'skills']
        }))
        break

      case 'skills':
        response = `My toolkit includes:
🔧 Languages: JavaScript, Python, Solidity
⚡ Frontend: React, Next.js, TailwindCSS
🛠 Backend: Node.js, AWS, Blockchain
🧪 Always learning something new...

Want to connect? Try 'contact'`
        setStoryState(prev => ({
          ...prev,
          discoveredCommands: [...prev.discoveredCommands, 'contact']
        }))
        break

      case 'contact':
        response = `Let's connect:
📧 Email: usmanasim27@gmail.com
🐦 Twitter: @asimfiles
💻 GitHub: github.com/usmaneth

Thanks for exploring! Type 'clear' to start over.`
        break

      case 'clear':
        setCliHistory([])
        setCliInput('')
        setStoryState({
          stage: 0,
          hasSeenIntro: false,
          discoveredCommands: ['start', 'help']
        })
        return

      default:
        if (!storyState.hasSeenIntro) {
          response = "Type 'start' to begin the journey..."
        } else {
          response = `Command not recognized: '${command}'. Type 'help' to see available commands.`
        }
    }

    setCliHistory([...cliHistory, `> ${cliInput}`, response])
    setCliInput('')

    if (cliRef.current) {
      cliRef.current.scrollTop = cliRef.current.scrollHeight
    }
  }

  useEffect(() => {
    if (cliRef.current) {
      cliRef.current.scrollTop = cliRef.current.scrollHeight
    }
  }, [cliHistory])

  const SnakeGame = () => {
    const [score, setScore] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)
    const [snake, setSnake] = useState([{ x: 10, y: 10 }])
    const [direction, setDirection] = useState({ x: 1, y: 0 })
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
      const canvas = canvasRef.current
      const ctx = canvas?.getContext('2d')
      if (!canvas || !ctx) return

      const gameLoop = setInterval(() => {
        if (!isPlaying) return

        ctx.fillStyle = 'black'
        ctx.fillRect(0, 0, 400, 400)

        // Draw snake
        ctx.fillStyle = '#00ff00'
        snake.forEach(segment => {
          ctx.fillRect(segment.x * 20, segment.y * 20, 18, 18)
        })
      }, 100)

      return () => clearInterval(gameLoop)
    }, [snake, isPlaying])

    return (
      <div className="text-center">
        <canvas
          ref={canvasRef}
          width={400}
          height={400}
          className="border border-green-500 bg-black"
        />
        <div className="mt-4 text-green-400">
          <p>Score: {score} | High Score: {highScore}</p>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="mt-2 text-green-300 hover:text-green-200"
          >
            {isPlaying ? '[PAUSE]' : '[START]'}
          </button>
          <p className="mt-2 text-sm">Use arrow keys to move</p>
        </div>
      </div>
    )
  }

  const GameModal = () => {
    if (!isGameOpen) return null
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-gray-900 border border-green-500 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-green-400 text-xl">[snake.exe]</h3>
            <button 
              onClick={() => setIsGameOpen(false)}
              className="text-green-400 hover:text-green-300"
            >
              [x]
            </button>
          </div>
          <SnakeGame />
        </div>
      </div>
    )
  }

  // Add initial message when component mounts
  useEffect(() => {
    setCliHistory([
      "Terminal initialized...",
      "Type 'start' to begin"
    ])
  }, [])

  return (
    <div className="min-h-screen bg-[#0a1120] text-green-400 p-4 md:p-8 font-mono">
      <main className="max-w-4xl mx-auto">
        {/* Home directory path */}
        <div className="text-[#4ade80] mb-4 opacity-70">
          ~/home/usmanasim/portfolio $
        </div>

        <header className="mb-12">
          <h1 
            className="text-6xl font-bold mb-8"
            style={{
              color: '#4ade80',
              animation: 'glitch 1s linear infinite',
              textShadow: '0.05em 0 0 #00fffc, -0.03em -0.04em 0 #fc00ff, 0.025em 0.04em 0 #fffc00',
              position: 'relative',
              display: 'inline-block'
            }}
          >
            usman.asim
          </h1>

          <nav className="flex items-center space-x-8">
            {['about', 'blog', 'talks', 'contact'].map((item) => (
              <button
                key={item}
                onClick={() => handleSectionClick(item as Selection)}
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                &gt; {item}
              </button>
            ))}
            <button
              onClick={() => {
                // Add logic to show/hide terminal
                const terminalElement = document.getElementById('terminal');
                if (terminalElement) {
                  terminalElement.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="text-[#4ade80] hover:text-green-300 transition-colors ml-4"
            >
              &gt; terminal
            </button>
          </nav>
        </header>

        {/* About section with terminal style */}
        <section id="about" className="mb-16">
          <h2 className="text-2xl font-bold mb-4 text-blue-400">[about]</h2>
          <div className="space-y-4">
            <p className="text-[#4ade80] font-bold">
              SYSTEM STATUS: OPERATIONAL
            </p>
            <p className="text-[#4ade80]">
                LOCATION: /dev/world/internet
              </p>
              <div className="text-[#4ade80] sopacity-80 space-y-1">
              <p>* Working on making the world a better place</p>
              <p>* Spent the past 5 years in the world of Distributed Systems, Blockchain, Traditional Finance, and AI</p>
              <p>* Specialized in turning impossible into "done"</p>
              <p>* Known for speaking fluent English, Urdu, JavaScript, Hindi, Python, and Solidity</p>
              <p>* Writer in my free time</p>
              <p>* Enjoy playing basketball, reading, and learning new things</p>
              <p>* Currently based in San Francisco, but originally from Southern California</p>
              <p>* Notable time spent at Ava Labs; building the Avalanche Protocol, Chainstack; working on high power blockchain infrastructure, JP Morgan; dabbling in Traditonal Finance, and at University of California, San Diego; making friends. </p>
           
           

            <p className="text-red-400 opacity-80 text-sm mt-32">
              For more on my previous employers and projects worked on subsequently:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm text-red-300">
              <li>
                <a href="https://avalabs.org" target="_blank" rel="noopener noreferrer" className="text-red-400 hover:text-red-200">
                  Ava Labs
                </a>, working on the <a href="https://avax.network" target="_blank" rel="noopener noreferrer" className="text-red-400 hover:text-red-200">
                  Avalanche Network
                </a>
              </li>
              <li>
                <a href="https://chainstack.com" target="_blank" rel="noopener noreferrer" className="text-red-400 hover:text-red-200">
                  Chainstack
                </a>
              </li>
              <li>
                <a href="https://www.jpmorgan.com" target="_blank" rel="noopener noreferrer" className="text-red-400 hover:text-red-200">
                  JP Morgan
                </a>
              </li>
              <li>
                <a href="https://ucsd.edu" target="_blank" rel="noopener noreferrer" className="text-red-400 hover:text-red-200">
                  UC San Diego
                </a>
              </li>
            </ul>
              
            </div>
          </div>
        </section>

        <section id="written-work" className="mb-16">
          <h2 className="text-2xl font-bold mb-4 text-blue-400">[written work]</h2>
          <div className="space-y-8">
            {writtenWork.map((work) => (
              <article key={work.id} className="group">
                <a href={work.link} className="block space-y-2" target="_blank" rel="noopener noreferrer">
                  <h3 className="text-xl font-bold text-green-300 group-hover:text-green-200">
                    &gt; {work.title}
                  </h3>
                  <div className="text-sm text-green-500">
                    {work.date}
                  </div>
                  <p className="text-green-400">{work.excerpt}</p>
                  <div className="text-blue-400 group-hover:text-blue-300 inline-flex items-center">
                    READ_MORE.exe <ExternalLink className="ml-1 w-4 h-4" />
                  </div>
                </a>
              </article>
            ))}
          </div>
        </section>

        <section id="talks" className="mb-16">
          <h2 className="text-2xl font-bold mb-4 text-blue-400">[talks]</h2>
          <div className="grid gap-4">
            {visibleTalks.map((talk, index) => (
              <a 
                key={index}
                href={talk.link}
                target="_blank"
                rel="noopener noreferrer" 
                className="block border border-green-500 p-4 rounded-lg hover:border-blue-400 hover:bg-gray-800/50 transition-all group cursor-pointer"
              >
                <h3 className="text-xl font-bold text-green-300 mb-2 group-hover:text-blue-300 transition-colors">
                  {talk.title}
                </h3>
                <div className="flex items-center space-x-2 text-green-400 text-sm mb-3">
                  <span className="px-2 py-1 bg-green-900/30 rounded">
                    {talk.event}
                  </span>
                  <span className="px-2 py-1 bg-green-900/30 rounded">
                    {talk.location}
                  </span>
                </div>
                <div className="text-blue-400 group-hover:text-blue-300 inline-flex items-center">
                  <span className="group-hover:underline">&gt; view_talk</span>
                  <ExternalLink className="ml-1 w-4 h-4" />
                </div>
              </a>
            ))}
          </div>
          
          {!showAllTalks && talks.length > 4 && (
            <button 
              onClick={() => setShowAllTalks(true)}
              className="mt-6 text-blue-400 hover:text-blue-300 inline-flex items-center group"
            >
              <span className="group-hover:underline">&gt; show_all</span>
              <ExternalLink className="ml-1 w-4 h-4" />
            </button>
          )}
          
          {showAllTalks && (
            <button 
              onClick={() => {
                setShowAllTalks(false)
                const element = document.getElementById('talks')
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' })
                }
              }}
              className="mt-6 text-blue-400 hover:text-blue-300 inline-flex items-center group"
            >
              <span className="group-hover:underline">&gt; show_less</span>
              <ExternalLink className="ml-1 w-4 h-4 rotate-180" />
            </button>
          )}
        </section>

        <section id="contact" className="mb-16">
          <h2 className="text-2xl font-bold mb-4 text-blue-400">[contact]</h2>
          <div className="space-y-6">
            <p className="text-[#4ade80]">Best way to reach me:</p>
            <a 
              href="https://t.me/usmanas27" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-2 bg-[#4ade80] text-black px-6 py-3 rounded hover:bg-green-300 transition-colors font-bold"
            >
              <MessageCircle className="w-5 h-5" />
              Message me on Telegram
            </a>
          </div>

          {/* Social Links */}
          <div className="flex space-x-6 mt-8">
            <a 
              href="https://github.com/usmaneth" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[#4ade80] hover:text-green-300 transition-colors flex items-center gap-2"
              aria-label="GitHub Profile"
            >
              <Github className="w-6 h-6" />
            </a>
            <a 
              href="https://twitter.com/asimfiles" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[#4ade80] hover:text-green-300 transition-colors flex items-center gap-2"
              aria-label="Twitter Profile"
            >
              <Twitter className="w-6 h-6" />
            </a>
            <a 
              href="https://www.linkedin.com/in/usman-asim-2200a41a4/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[#4ade80] hover:text-green-300 transition-colors flex items-center gap-2"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a 
              href="mailto:usmanasim27@gmail.com" 
              className="text-[#4ade80] hover:text-green-300 transition-colors flex items-center gap-2"
              aria-label="Email Contact"
            >
              <Mail className="w-6 h-6" />
            </a>
          </div>
        </section>

        <div id="terminal" className="mt-16 border border-green-500 rounded">
          <div className="bg-gray-800 p-2 text-green-400 font-bold flex justify-between items-center">
            <span>Terminal</span>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-sm text-green-400 hover:text-green-300"
            >
              [minimize]
            </button>
          </div>
          <div 
            ref={cliRef}
            className="h-48 overflow-y-auto p-2 bg-[#0a1120]"
          >
            {cliHistory.map((line, index) => (
              <div key={index} className="text-green-400">{line}</div>
            ))}
          </div>
          <form onSubmit={handleCliSubmit} className="flex border-t border-green-500">
            <span className="p-2 text-green-500">$</span>
            <input
              type="text"
              value={cliInput}
              onChange={(e) => setCliInput(e.target.value)}
              className={`flex-grow ${isDarkMode ? 'bg-black text-green-400' : 'bg-white text-gray-800'} p-2 focus:outline-none`}
              placeholder="Type a command (try 'help')"
            />
          </form>
        </div>

        <footer className="text-center text-green-500 text-sm mt-8">
          <p>SYSTEM TIME: {currentTime.toLocaleTimeString()}</p>
          <p>© 2023 - Running on coffee.exe v4.2.0</p>
        </footer>
      </main>
      <GameModal />
    </div>
  )
}