"use client"

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Plus } from 'lucide-react'

interface Project {
  id: string
  title: string
  image: string
  creator: {
    name: string
    avatar: string
  }
}

interface PublicGallery {
  projects?: Project[]
  filters?: string[]
  onCreateProject?: () => void
  onFilterClick?: (filter: string) => void
}

const PublicGallery: React.FC<PublicGallery> = ({
  projects = [
    {
      id: '1',
      title: 'Modern Dashboard Design',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
      creator: { name: 'Sarah Chen', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face' }
    },
    {
      id: '2',
      title: 'E-commerce Mobile App',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=400&fit=crop',
      creator: { name: 'Alex Rivera', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face' }
    },
    {
      id: '3',
      title: 'Brand Identity System',
      image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400&h=250&fit=crop',
      creator: { name: 'Maya Patel', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face' }
    },
    {
      id: '4',
      title: 'SaaS Landing Page',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=350&fit=crop',
      creator: { name: 'David Kim', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face' }
    },
    {
      id: '5',
      title: 'Portfolio Website',
      image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&h=280&fit=crop',
      creator: { name: 'Emma Wilson', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=32&h=32&fit=crop&crop=face' }
    },
    {
      id: '6',
      title: 'Fintech Dashboard',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=320&fit=crop',
      creator: { name: 'James Park', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face' }
    },
    {
      id: '7',
      title: 'Social Media App',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=380&fit=crop',
      creator: { name: 'Lisa Zhang', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=32&h=32&fit=crop&crop=face' }
    },
    {
      id: '8',
      title: 'Travel Booking Platform',
      image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=300&fit=crop',
      creator: { name: 'Tom Anderson', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=32&h=32&fit=crop&crop=face' }
    }
  ],
  filters = ['All', 'Web Design', 'Mobile', 'Branding', 'UI/UX'],
  onCreateProject = () => console.log('Create project clicked'),
  onFilterClick = (filter: string) => console.log('Filter clicked:', filter)
}) => {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [activeFilter, setActiveFilter] = useState('All')

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsHeaderVisible(false)
      } else {
        setIsHeaderVisible(true)
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter)
    onFilterClick(filter)
  }

  return (
    <div className="min-h-screen text-zinc-50">
      {/* Main Content */}
      <div className="pt-0 px-6 max-w-7xl mx-auto">
        {/* Masonry Grid */}
        <div className="columns-2 sm:columns-2 lg:columns-3 xl:columns-4 gap-1 space-y-1">
          {projects.map((project) => (
            <div
              key={project.id}
              className="break-inside-avoid mb-1 group cursor-pointer"
            >
              <div className="relative overflow-hidden bg-zinc-900 border border-zinc-800/50 hover:border-zinc-700 transition-all duration-200">
                <div className="relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  
                  {/* Dark Gradient Overlay */}
                  <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/90 via-black/60 to-transparent" />
                  
                  {/* Project Information */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-semibold text-sm mb-2 leading-tight">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      <Avatar className="w-6 h-6">
                        <AvatarImage src={project.creator.avatar} alt={project.creator.name} />
                        <AvatarFallback className="text-xs bg-zinc-700 text-zinc-300">
                          {project.creator.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-zinc-300 text-xs font-medium">
                        {project.creator.name}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PublicGallery