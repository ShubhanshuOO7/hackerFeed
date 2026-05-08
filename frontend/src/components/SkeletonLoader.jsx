const SkeletonLoader = ({ type = 'story' }) => {
  if (type === 'story') {
    return (
      <div className="group flex items-start space-x-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 animate-pulse">
        <div className="flex items-center justify-center w-6 h-6 mt-1">
          <div className="w-3 h-3 bg-gray-300 dark:bg-gray-600 rounded"></div>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start space-x-3">
            <div className="w-4 h-4 mt-1 bg-gray-300 dark:bg-gray-600 rounded-sm flex-shrink-0"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
              <div className="flex items-center space-x-4">
                <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-12"></div>
                <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-16"></div>
                <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-20"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (type === 'detail') {
    return (
      <div className="max-w-3xl mx-auto px-4">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-24"></div>
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 space-y-4">
            <div className="space-y-2">
              <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-16"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-20"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-24"></div>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
              <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-32 mb-4"></div>
              <div className="h-20 bg-gray-100 dark:bg-gray-700 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="animate-pulse space-y-2">
      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-5/6"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-4/6"></div>
    </div>
  )
}

export default SkeletonLoader
