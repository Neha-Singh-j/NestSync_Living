import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();

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
          Find a Home That Matches Your Lifestyle
        </h1>

        <p className="text-white/90 mt-5 max-w-2xl text-lg">
          Explore premium properties, luxury villas, and modern residences
          designed for comfort, elegance, and peace of mind.
        </p>

        {/* CTA Button */}
        <button
          onClick={() => navigate("/buy")}
          className="mt-8 bg-blue-600 hover:bg-blue-700 transition text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg"
        >
          Search Your Dream Property
        </button>
      </div>
    </section>
  );
}
