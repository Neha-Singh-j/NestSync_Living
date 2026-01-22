import { Link } from "react-router-dom";

const listings = [
  {
    title: "The Glass Pavilion",
    location: "Beverly Hills, CA",
    price: "$4,500,000",
    img: "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
  },
  {
    title: "Azure Waterfront Estate",
    location: "Miami Beach, FL",
    price: "$8,200,000",
    img: "https://images.unsplash.com/photo-1600585152915-d208bec867a1",
  },
  {
    title: "Modernist Hillside Villa",
    location: "Austin, TX",
    price: "$3,100,000",
    img: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde",
  },
  {
    title: "Skyline Penthouse",
    location: "New York, NY",
    price: "$12,000,000",
    img: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb",
  },
]

export default function Featured() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-semibold">
            Featured Premium Listings
          </h2>
          <p className="text-gray-500 text-sm">
            Handpicked luxury residences currently on the market
          </p>
        </div>
        <Link
  to="/buy"
  className="text-blue-600 font-medium cursor-pointer"
>
  View all listings →
</Link>

      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {listings.map((item, i) => (
          <div key={i} className="bg-white rounded-xl shadow hover:shadow-lg transition">
            <img src={item.img} className="h-48 w-full object-cover rounded-t-xl" />
            <div className="p-4">
              <span className="text-sm bg-blue-100 text-blue-600 px-2 py-1 rounded">
                {item.price}
              </span>
              <h3 className="font-semibold mt-2">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.location}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
