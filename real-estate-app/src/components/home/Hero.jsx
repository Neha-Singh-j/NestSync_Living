export default function Hero() {
  return (
    <section className="relative h-[90vh]">
      {/* Background image */}
      <img
        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
        alt="Luxury Home"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <h1 className="text-white text-4xl md:text-6xl font-bold">
          Discover Your Dream Sanctuary
        </h1>
        <p className="text-white/90 mt-4 max-w-2xl">
          Experience premium living in the most exclusive locations worldwide
        </p>

        {/* Search Box */}
        <div className="bg-white mt-10 rounded-xl shadow-lg p-4 w-full max-w-4xl">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Enter city or neighborhood"
              className="flex-1 border rounded-lg px-4 py-3"
            />
            <select className="border rounded-lg px-4 py-3">
              <option>Any Price</option>
            </select>
            <select className="border rounded-lg px-4 py-3">
              <option>Modern Villa</option>
            </select>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium">
              Search
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
