import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import API from '../services/api.js'

const Bookmarks = () => {
  const { user } = useAuth()
  const [bookmarkedStories, setBookmarkedStories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const response = await API.get('/api/auth/profile')
        const bookmarks = response.data.bookmarks
        
        if (bookmarks && bookmarks.length > 0) {
          const stories = await Promise.all(
            bookmarks.map(async (bookmark) => {
              const storyResponse = await API.get(`/api/stories/${bookmark._id}`)
              return storyResponse.data
            })
          )
          setBookmarkedStories(stories)
        }
      } catch (error) {
        console.error('Error fetching bookmarks:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchBookmarks()
  }, [])

  const getDomainFromUrl = (url) => {
    try {
      return new URL(url).hostname.replace('www.', '')
    } catch {
      return ''
    }
  }

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4">
        <div className="flex justify-center items-center h-64">
          <div className="inline-flex items-center space-x-2 text-gray-600">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-orange-600"></div>
            <span className="text-sm">Loading bookmarks...</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Your Bookmarks</h1>
        <p className="text-gray-600 mt-1">Stories you've saved for later</p>
      </div>
      
      {bookmarkedStories.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
          <div className="text-gray-500 mb-4">No bookmarks yet</div>
          <Link 
            to="/" 
            className="text-orange-600 hover:text-orange-700 text-sm font-medium"
          >
            Browse stories →
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {bookmarkedStories.map((story, index) => (
            <div key={story._id} className="group">
              <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <span className="text-gray-400 font-medium text-sm w-6 mt-1">
                  {index + 1}.
                </span>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start space-x-2">
                    <h2 className="text-base font-medium text-gray-900 leading-tight flex-1">
                      <a 
                        href={story.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:text-orange-600 transition-colors"
                      >
                        {story.title}
                      </a>
                    </h2>
                    {story.url && (
                      <span className="text-xs text-gray-500 font-normal flex-shrink-0 mt-0.5">
                        ({getDomainFromUrl(story.url)})
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                    <span className="flex items-center space-x-1">
                      <span className="text-orange-600 font-semibold">{story.points}</span>
                      <span>points</span>
                    </span>
                    
                    {story.author && (
                      <span>by <span className="text-gray-700">{story.author}</span></span>
                    )}
                    
                    <span>{story.postedAt}</span>
                    
                    <Link 
                      to={`/story/${story._id}`}
                      className="text-orange-600 hover:text-orange-700 font-medium"
                    >
                      discuss
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Bookmarks
