import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import API from '../services/api.js'
import SkeletonLoader from './SkeletonLoader.jsx'

const StoryList = () => {
  const [stories, setStories] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  const fetchStories = async (pageNum = 1) => {
    try {
      setLoading(true)
      const response = await API.get(`/api/stories?page=${pageNum}&limit=10`)
      
      if (pageNum === 1) {
        setStories(response.data)
      } else {
        setStories(prev => [...prev, ...response.data])
      }
      
      setHasMore(response.data.length === 10)
    } catch (error) {
      console.error('Error fetching stories:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStories()
  }, [])

  const loadMore = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1
      setPage(nextPage)
      fetchStories(nextPage)
    }
  }

  const getDomainFromUrl = (url) => {
    try {
      return new URL(url).hostname.replace('www.', '')
    } catch {
      return ''
    }
  }

  const getFaviconUrl = (url) => {
    try {
      const domain = new URL(url).hostname
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=32`
    } catch {
      return ''
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6">
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Latest Stories</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1 text-sm sm:text-base">Top stories from Hacker News</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-500 dark:text-gray-400">Live</span>
          </div>
        </div>
      </div>
      
      <div className="space-y-3">
        {loading && stories.length === 0 ? (
          Array.from({ length: 10 }).map((_, index) => (
            <SkeletonLoader key={index} type="story" />
          ))
        ) : (
          stories.map((story, index) => (
          <div key={story._id} className="group">
            <div className="flex items-start space-x-2 sm:space-x-3 p-3 sm:p-4 rounded-xl hover:bg-gradient-to-r hover:from-orange-50/50 hover:to-transparent dark:hover:from-orange-900/20 dark:hover:to-transparent transition-all duration-300 border border-gray-100 dark:border-gray-800 hover:border-orange-200 dark:hover:border-orange-800 hover:shadow-lg group cursor-pointer transform hover:-translate-y-0.5">
              <div className="flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 mt-1">
                <span className="text-gray-400 dark:text-gray-500 font-bold text-sm sm:text-lg group-hover:text-orange-500 transition-colors">
                  {index + 1}
                </span>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start space-x-3">
                  {story.url && (
                    <img 
                      src={getFaviconUrl(story.url)} 
                      alt="" 
                      className="w-4 h-4 sm:w-5 sm:h-5 mt-1 flex-shrink-0 rounded-md ring-2 ring-gray-100 dark:ring-gray-700 group-hover:ring-orange-200 dark:group-hover:ring-orange-800 transition-all"
                      onError={(e) => { e.target.style.display = 'none' }}
                    />
                  )}
                  <div className="flex-1">
                    <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white leading-tight group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                      <a 
                        href={story.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:text-orange-600 transition-colors inline-flex items-center space-x-2 group/link"
                      >
                        <span className="text-sm sm:text-base">{story.title}</span>
                        <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 dark:text-gray-500 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover/link:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </h2>
                    
                    <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                      <span className="flex items-center space-x-1 sm:space-x-2 px-2 py-1 sm:px-3 sm:py-1 bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full font-medium text-xs sm:text-sm">
                        <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                        </svg>
                        <span className="font-bold text-xs sm:text-sm">{story.points}</span>
                      </span>
                      
                      {story.author && (
                        <span className="flex items-center space-x-1 sm:space-x-2 px-2 py-1 sm:px-3 sm:py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs sm:text-sm">
                          <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          <span className="text-gray-700 dark:text-gray-300 font-medium text-xs sm:text-sm">{story.author}</span>
                        </span>
                      )}
                      
                      <span className="flex items-center space-x-1 sm:space-x-2 px-2 py-1 sm:px-3 sm:py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full font-medium text-xs sm:text-sm">
                        <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-xs sm:text-sm">{story.postedAt}</span>
                      </span>
                      
                      <Link 
                        to={`/story/${story._id}`}
                        className="flex items-center space-x-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-full font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-xs sm:text-sm"
                      >
                        <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        <span className="text-xs sm:text-sm">Discuss</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
        )}
      </div>

      {loading && stories.length > 0 && (
        <div className="text-center py-6">
          <div className="inline-flex items-center space-x-3 px-6 py-3 bg-white dark:bg-gray-800 rounded-full shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-orange-200 border-t-orange-600"></div>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Loading more stories...</span>
          </div>
        </div>
      )}

      {!loading && hasMore && (
        <div className="text-center mt-10">
          <button
            onClick={loadMore}
            className="inline-flex items-center space-x-3 px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
          >
            <span>Load More Stories</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      )}

      {!loading && stories.length === 0 && (
        <div className="text-center py-16">
          <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner">
            <svg className="w-10 h-10 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </div>
          <div className="text-gray-500 dark:text-gray-400 text-lg font-medium">No stories found</div>
          <div className="text-gray-400 dark:text-gray-500 text-sm mt-2">Check back later for new stories</div>
        </div>
      )}
    </div>
  )
}

export default StoryList
