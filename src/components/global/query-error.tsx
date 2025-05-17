import { RefreshCw } from 'lucide-react';

interface QueryErrorProps {
  refetch: () => void;
}

export function QueryError({ refetch }: QueryErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-6 rounded-lg bg-red-50 border border-red-100 max-w-md mx-auto my-8">
      <div className="text-red-600 bg-red-100 p-4 rounded-full">
        <svg
          className="w-8 h-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      
      <div className="space-y-2 text-center">
        <h3 className="text-lg font-semibold text-gray-900">
          Unable to Load Data
        </h3>
        <p className="text-sm text-gray-600">
          There was a problem loading your content. Please try again.
        </p>
      </div>

      <button
        onClick={() => refetch()}
        className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200 min-w-[120px]"
      >
        <RefreshCw className="w-4 h-4 mr-2" />
        Try Again
      </button>
    </div>
  );
}