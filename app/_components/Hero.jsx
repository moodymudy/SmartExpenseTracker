import React from 'react'

function Hero() {
  return (
    <div>
        <section className="bg-gray-50">
  <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex r">
    <div className="mx-auto max-w-xl text-center">
      <h1 className="text-3xl font-extrabold sm:text-5xl">
        Manage Your Expense
        <strong className="font-extrabold text-blue-700 sm:block"> Control Your Money </strong>
      </h1>

      <p className="mt-4 sm:text-xl/relaxed">
        Start Creating your budget and save ton of money
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <a
          className="block w-full rounded-sm bg-blue-600 px-12 py-3 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:ring-3 focus:outline-hidden sm:w-auto"
          href="/sign-in"
        >
          Get Started
        </a>

      </div>
    </div>
  </div>
</section>
    </div>
  )
}

export default Hero