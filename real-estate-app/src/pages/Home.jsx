import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Hero from '../components/home/Hero'
import Featured from '../components/home/Featured'
import WhyChooseUs from '../components/home/WhyChoseUs'

function Home() {
  return (
    <div className="bg-white">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Featured Listings */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        
        <Featured />
      </section>

      {/* Why Choose Us */}
      <section >
        <WhyChooseUs />
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default Home