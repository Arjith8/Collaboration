export function Footer(){
  return (
    <footer className="flex items-center justify-between p-4 bg-gray-800 text-white">
      <div className="flex items-center space-x-4">
        <p>&copy; 2023 My App</p>
        <a href="/privacy" className="text-gray-400 hover:text-white">
          Privacy Policy
        </a>
        <a href="/terms" className="text-gray-400 hover:text-white">
          Terms of Service
        </a>
      </div>
      <div className="flex items-center space-x-4">
        <a href="/contact" className="text-gray-400 hover:text-white">
          Contact Us
        </a>
      </div>
    </footer>
  )
}
