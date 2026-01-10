import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { Button } from './components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card.jsx'
import { Badge } from './components/ui/badge.jsx'
import { Download, Copy, Check, ExternalLink, Moon, Sun, ChevronLeft, ChevronRight } from 'lucide-react'
import { resumeData } from '../data.js'

function App() {
  const [copied, setCopied] = useState(false)
  const [mediumPosts, setMediumPosts] = useState([])
  const [loadingPosts, setLoadingPosts] = useState(true)
  const [activityFilter, setActivityFilter] = useState('all') // 'all', 'certification', 'blog-post', 'talks'
  const [activityPage, setActivityPage] = useState(0) // For pagination/slider
  const activitiesPerPage = 5
  const [experienceTab, setExperienceTab] = useState('experience') // 'experience' or 'education'
  const [isDarkMode, setIsDarkMode] = useState(false)

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true)
      document.documentElement.classList.add('dark')
    } else {
      setIsDarkMode(false)
      document.documentElement.classList.remove('dark')
    }
  }, [])

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode
    setIsDarkMode(newDarkMode)
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  // Utility functions (defined first)
  const stripHtml = useCallback((html) => {
    return html ? html.replace(/<[^>]*>/g, '').substring(0, 150) + '...' : ''
  }, [])

  const formatDate = useCallback((dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    if (isNaN(date.getTime())) return dateString // Return original if invalid
    return date.toLocaleDateString('en-US', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    })
  }, [])

  const handleCopyBio = useCallback(async () => {
    try {
      if (resumeData?.bio) {
        await navigator.clipboard.writeText(resumeData.bio)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }
    } catch (err) {
      // Silently fail - clipboard API may not be available
      if (process.env.NODE_ENV === 'development') {
        console.error('Failed to copy text:', err)
      }
    }
  }, [])

  const handleDownloadImage = useCallback(() => {
    if (!resumeData?.profileImage || !resumeData?.name) return
    const link = document.createElement('a')
    link.href = resumeData.profileImage
    link.download = `${resumeData.name.replace(/\s+/g, '_')}_profile.jpg`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }, [])

  const fetchMediumPosts = useCallback(async () => {
    const username = resumeData?.mediumUsername
    
    if (!username) {
      setLoadingPosts(false)
      return
    }
    
    try {
      const rssUrl = `https://medium.com/feed/@${username}`
      const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`
      
      const response = await fetch(apiUrl)
      
      if (!response.ok) {
        throw new Error('Failed to fetch posts')
      }
      
      const data = await response.json()
      
      if (data.status === 'ok' && data.items && data.items.length > 0) {
        setMediumPosts(data.items.slice(0, 10))
      }
    } catch (error) {
      // Silently fail - external API may be unavailable
      if (process.env.NODE_ENV === 'development') {
        console.error('Error fetching Medium posts:', error)
      }
    } finally {
      setLoadingPosts(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // resumeData.mediumUsername is static, no need to include

  useEffect(() => {
    fetchMediumPosts()
  }, [fetchMediumPosts])

  // Combine activities and blog posts into unified list (memoized)
  const getAllActivities = useMemo(() => {
    try {
      const activities = []
      
      // Add achievements/activities from data.js
      if (resumeData && resumeData.activities && Array.isArray(resumeData.activities)) {
        resumeData.activities.forEach(activity => {
          if (!activity || !activity.type || !activity.title) return
          
          // Normalize activity type (fix any inconsistencies)
          let normalizedType = String(activity.type).toLowerCase().trim()
          if (normalizedType === 'blog post' || normalizedType === 'blogpost') {
            normalizedType = 'blog-post'
          }
          
          activities.push({
            type: normalizedType,
            title: activity.title,
            details: activity.details || '',
            date: activity.date || '',
            link: activity.link || null
          })
        })
      }
      
      // Add Medium blog posts
      if (mediumPosts && Array.isArray(mediumPosts)) {
        mediumPosts.forEach(post => {
          if (post && post.title && post.pubDate) {
            activities.push({
              type: 'blog-post',
              title: post.title,
              details: stripHtml(post.description || ''),
              date: post.pubDate,
              link: post.link || null
            })
          }
        })
      }
      
      // Sort by date (newest first)
      return activities.sort((a, b) => {
        try {
          const dateA = new Date(a.date)
          const dateB = new Date(b.date)
          if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) return 0
          return dateB - dateA
        } catch {
          return 0
        }
      })
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error in getAllActivities:', error)
      }
      return []
    }
  }, [mediumPosts, stripHtml])

  // Filter activities based on selected filter (memoized)
  const filteredActivities = useMemo(() => {
    if (activityFilter === 'all') {
      return getAllActivities
    }
    return getAllActivities.filter(activity => activity.type === activityFilter)
  }, [getAllActivities, activityFilter])

  // Get paginated activities for current page (memoized)
  const paginatedActivities = useMemo(() => {
    const startIndex = activityPage * activitiesPerPage
    return filteredActivities.slice(startIndex, startIndex + activitiesPerPage)
  }, [filteredActivities, activityPage, activitiesPerPage])

  // Calculate total pages (memoized)
  const totalPages = useMemo(() => {
    return Math.ceil(filteredActivities.length / activitiesPerPage)
  }, [filteredActivities.length, activitiesPerPage])

  // Reset to first page when filter changes
  useEffect(() => {
    setActivityPage(0)
  }, [activityFilter])
  
  // Safety check for resumeData
  if (!resumeData || !resumeData.name) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <h1 className="text-2xl font-semibold mb-4">Configuration Error</h1>
          <p className="text-muted-foreground mb-4">
            Resume data is not available. Please check data.js file.
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        {/* Header Section */}
        <Card className="mb-8 border-b relative">
          <CardContent className="pt-6">
            {/* Theme Toggle Button - Absolute positioned in top right */}
            <Button
              variant="outline"
              size="icon"
              onClick={toggleDarkMode}
              className="absolute top-4 right-4 h-9 w-9"
              title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>
            
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
              <div className="relative w-32 h-32 flex-shrink-0">
                <img 
                  src={resumeData?.profileImage || ''} 
                  alt={`${resumeData?.name || 'Profile'}'s Profile Picture`}
                  className="w-full h-full object-cover rounded-md border"
                  loading="lazy"
                  decoding="async"
                />
                <Button
                  size="icon"
                  variant="outline"
                  className="absolute -bottom-2 -right-2 h-8 w-8"
                  onClick={handleDownloadImage}
                  title="Download Picture"
                  aria-label="Download profile picture"
                >
                  <Download className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-3xl md:text-4xl font-semibold mb-2 tracking-tight">
                  {resumeData?.name || ''}
                </h1>
                <p className="text-muted-foreground mb-4 text-base">
                  {resumeData?.role || ''}
                </p>
                <div className="flex flex-wrap gap-3 items-center">
                  {resumeData.socialLinks && Array.isArray(resumeData.socialLinks) && resumeData.socialLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link?.url || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                    >
                      {link?.icon && <i className={link.icon}></i>}
                      <span>{link?.platform || ''}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bio Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>About</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed mb-4">{resumeData.bio || ''}</p>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyBio}
            >
              {copied ? (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="mr-2 h-4 w-4" />
                  Copy
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Experience & Education Section */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <CardTitle>Experience & Education</CardTitle>
              {/* Tab Buttons */}
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={experienceTab === 'experience' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setExperienceTab('experience')}
                >
                  Experience
                </Button>
                <Button
                  variant={experienceTab === 'education' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setExperienceTab('education')}
                >
                  Education
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {experienceTab === 'experience' ? (
              <div className="space-y-8">
                {resumeData.career && resumeData.career.length > 0 ? (
                  resumeData.career.map((company, companyIndex) => (
                    <div key={companyIndex} className="border-b last:border-b-0 pb-6 last:pb-0">
                      <div className="flex items-start gap-4">
                        {company.logo && (
                          <div className="flex-shrink-0 w-12 h-12 rounded-md overflow-hidden border bg-card flex items-center justify-center">
                            <img 
                              src={company.logo} 
                              alt={`${company.company} logo`}
                              className="w-full h-full object-contain p-1"
                              loading="lazy"
                              decoding="async"
                              onError={(e) => {
                                // Hide image if it fails to load
                                e.target.style.display = 'none';
                              }}
                            />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-base mb-4">{company.company}</h3>
                          <div className="space-y-6">
                            {company.positions.map((position, positionIndex) => (
                              <div key={positionIndex} className={positionIndex < company.positions.length - 1 ? "border-b pb-4" : ""}>
                                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-2">
                                  <p className="text-sm font-medium text-foreground">{position.position}</p>
                                  <span className="text-sm text-muted-foreground whitespace-nowrap">{position.period}</span>
                                </div>
                                <p className="text-sm leading-relaxed text-muted-foreground">{position.description}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No experience listed.</p>
                )}
              </div>
            ) : (
              <div className="space-y-8">
                {resumeData.education && resumeData.education.length > 0 ? (
                  resumeData.education.map((edu, eduIndex) => (
                    <div key={eduIndex} className="border-b last:border-b-0 pb-6 last:pb-0">
                      <div className="flex items-start gap-4">
                        {edu.logo && (
                          <div className="flex-shrink-0 w-12 h-12 rounded-md overflow-hidden border bg-card flex items-center justify-center">
                            <img 
                              src={edu.logo} 
                              alt={`${edu.institution} logo`}
                              className="w-full h-full object-contain p-1"
                              loading="lazy"
                              decoding="async"
                              onError={(e) => {
                                e.target.style.display = 'none';
                              }}
                            />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-2">
                            <h3 className="font-semibold text-base">{edu.institution}</h3>
                            <span className="text-sm text-muted-foreground whitespace-nowrap">{edu.period}</span>
                          </div>
                          <p className="text-sm font-medium text-foreground mb-1">{edu.degree}</p>
                          {edu.field && (
                            <p className="text-sm text-muted-foreground mb-2">{edu.field}</p>
                          )}
                          {edu.location && (
                            <p className="text-xs text-muted-foreground mb-2">{edu.location}</p>
                          )}
                          {edu.description && (
                            <p className="text-sm leading-relaxed text-muted-foreground">{edu.description}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No education listed.</p>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* My Activity Section */}
        <Card>
          <CardHeader>
            <CardTitle>My Activity</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2 mb-6">
              <Button
                variant={activityFilter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActivityFilter('all')}
              >
                All
              </Button>
              <Button
                variant={activityFilter === 'certification' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActivityFilter('certification')}
              >
                Certifications
              </Button>
              <Button
                variant={activityFilter === 'blog-post' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActivityFilter('blog-post')}
              >
                Blog Posts
              </Button>
              <Button
                variant={activityFilter === 'talks' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActivityFilter('talks')}
              >
                Talks
              </Button>
            </div>

            {/* Activities List */}
            {loadingPosts ? (
              <p className="text-sm text-muted-foreground">Loading activities...</p>
            ) : filteredActivities.length > 0 ? (
              <>
                <div className="space-y-6">
                  {paginatedActivities.map((activity, index) => (
                    <div key={index} className="border-b last:border-b-0 pb-6 last:pb-0">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <Badge 
                          variant="outline" 
                          className="text-xs capitalize"
                        >
                          {activity.type === 'blog-post' ? 'Blog Post' : 
                           activity.type === 'talks' ? 'Talks' : 
                           activity.type}
                        </Badge>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {formatDate(activity.date)}
                        </span>
                      </div>
                      <h3 className="font-semibold text-base mb-2">
                        {activity.link ? (
                          <a
                            href={activity.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline inline-flex items-center gap-1"
                          >
                            {activity.title}
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        ) : (
                          activity.title
                        )}
                      </h3>
                      {activity.details && (
                        <p className="text-sm text-muted-foreground">
                          {activity.details}
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-6 pt-4 border-t">
                    <div className="text-sm text-muted-foreground text-center sm:text-left">
                      <span className="hidden sm:inline">
                        Showing {activityPage * activitiesPerPage + 1} - {Math.min((activityPage + 1) * activitiesPerPage, filteredActivities.length)} of {filteredActivities.length} activities
                      </span>
                      <span className="sm:hidden">
                        {activityPage * activitiesPerPage + 1}-{Math.min((activityPage + 1) * activitiesPerPage, filteredActivities.length)} of {filteredActivities.length}
                      </span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setActivityPage(prev => Math.max(0, prev - 1))}
                        disabled={activityPage === 0}
                        aria-label="Previous page"
                        className="flex sm:inline-flex"
                      >
                        <ChevronLeft className="h-4 w-4 sm:mr-1" />
                        <span className="hidden sm:inline">Previous</span>
                      </Button>
                      <div className="text-sm text-muted-foreground px-2" aria-label={`Page ${activityPage + 1} of ${totalPages}`}>
                        Page {activityPage + 1} of {totalPages}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setActivityPage(prev => Math.min(totalPages - 1, prev + 1))}
                        disabled={activityPage >= totalPages - 1}
                        aria-label="Next page"
                        className="flex sm:inline-flex"
                      >
                        <span className="hidden sm:inline">Next</span>
                        <ChevronRight className="h-4 w-4 sm:ml-1" />
                      </Button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <p className="text-sm text-muted-foreground">
                No {activityFilter === 'all' ? '' : activityFilter.replace('-', ' ')} activities found.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default App
