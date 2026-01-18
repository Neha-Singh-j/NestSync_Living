const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 text-xl font-semibold">
            <span className="text-blue-600">▮</span>
            Nestynx Living
          </div>
          <p className="mt-4 text-gray-500 text-sm leading-relaxed">
            Redefining luxury living through curated experiences and premium
            real estate solutions worldwide.
          </p>

          {/* Social Icons (simple placeholders) */}
          <div className="flex gap-4 mt-6 text-gray-400">
            <span className="cursor-pointer hover:text-blue-600">●</span>
            <span className="cursor-pointer hover:text-blue-600">●</span>
            <span className="cursor-pointer hover:text-blue-600">●</span>
          </div>
        </div>

        {/* Explore */}
        <div>
          <h3 className="font-semibold mb-4">Explore</h3>
          <ul className="space-y-3 text-gray-500 text-sm">
            <li><a href="/buy" className="hover:text-blue-600">Luxury Mansions</a></li>
            <li><a href="/buy" className="hover:text-blue-600">Waterfront Estates</a></li>
            <li><a href="/buy" className="hover:text-blue-600">Urban Penthouses</a></li>
            <li><a href="/buy" className="hover:text-blue-600">New Developments</a></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="font-semibold mb-4">Company</h3>
          <ul className="space-y-3 text-gray-500 text-sm">
            <li><a href="/about" className="hover:text-blue-600">Our Story</a></li>
            <li><a href="/careers" className="hover:text-blue-600">Careers</a></li>
            <li><a href="/press" className="hover:text-blue-600">Press</a></li>
            <li><a href="/sustainability" className="hover:text-blue-600">Sustainability</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="font-semibold mb-4">Newsletter</h3>
          <p className="text-gray-500 text-sm mb-4">
            Subscribe for exclusive early access to premium listings.
          </p>
          <div className="flex">
            <input
              type="email"
              placeholder="Email address"
              className="flex-1 border border-gray-200 rounded-l-lg px-4 py-2 text-sm focus:outline-none"
            />
            <button className="bg-blue-600 text-white px-4 rounded-r-lg hover:bg-blue-700">
              →
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-100 py-6 text-center text-gray-400 text-sm flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-6">
        <span>© {new Date().getFullYear()} Nestynx Living Inc. All rights reserved.</span>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a href="/privacy" className="hover:text-blue-600">Privacy Policy</a>
          <a href="/terms" className="hover:text-blue-600">Terms of Service</a>
          <a href="/sitemap" className="hover:text-blue-600">Sitemap</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
