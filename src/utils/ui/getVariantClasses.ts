export const getVariantClasses = (variant: string) => {
    switch (variant) {
      case "primary":
        return `
          bg-blue-500 hover:bg-blue-600 
          focus-visible:ring-2 focus-visible:ring-blue-500 
          text-white
          disabled:bg-blue-400 disabled:cursor-not-allowed
        `;
      case "secondary":
        return `
          bg-gray-200 dark:bg-transparent 
          border border-gray-400 dark:border-gray-600 
          hover:bg-gray-300 dark:hover:bg-gray-700 
          focus-visible:ring-2 focus-visible:ring-gray-500
          text-gray-800 dark:text-white
          disabled:bg-gray-100 disabled:dark:bg-gray-800 
          disabled:text-gray-400 disabled:dark:text-gray-500
          disabled:cursor-not-allowed
        `;
      case "danger":
        return `
          bg-red-500 hover:bg-red-600 
          focus-visible:ring-2 focus-visible:ring-red-500
          text-white
          disabled:bg-red-400 disabled:cursor-not-allowed
        `;
      case "link":
        return `
          bg-transparent
          text-blue-500 hover:text-blue-600
          p-0
          disabled:text-gray-400 disabled:cursor-not-allowed
        `;
      default:
        return `
          bg-gray-200 dark:bg-transparent 
          border border-gray-400 dark:border-gray-600 
          hover:bg-gray-300 dark:hover:bg-gray-700
          focus-visible:ring-2 focus-visible:ring-gray-500
          text-gray-800 dark:text-white
          disabled:bg-gray-100 disabled:dark:bg-gray-800 
          disabled:text-gray-400 disabled:dark:text-gray-500
          disabled:cursor-not-allowed
        `;
    }
  };