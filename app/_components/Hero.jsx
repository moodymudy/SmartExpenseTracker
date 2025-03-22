import React from 'react'

function Hero() {
  return (
    <div className="bg-gray-50">
      <section className="container mx-auto px-4 pt-20 pb-12 lg:pt-32">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            Manage Your Expense
            <span className="block mt-2 text-blue-600">Control Your Money</span>
          </h1>

          <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto">
            Start creating your budget today and discover how much you can save
          </p>

          <div className="mt-10">
            <a
              className="inline-block rounded-lg bg-blue-600 px-8 py-4 text-base font-medium text-white shadow-lg hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              href="/sign-in"
            >
              Get Started
            </a>
          </div>
        </div>
      </section>

      {/* Image Section - Positioned below with rounded corners and proper sizing */}
      <div className="container mx-auto px-4 pb-20">
        <div className="relative mx-auto max-w-4xl overflow-hidden rounded-2xl shadow-xl">
          <img
            src="https://i.ibb.co/hRzL1FWY/image-2025-03-22-000210828.png"
            alt="Expense Management"
            className="w-full h-auto object-cover"
          />
          
          {/* Optional overlay gradient for better text visibility if needed */}
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent pointer-events-none"></div>
        </div>
      </div>
    </div>
  )
}

export default Hero