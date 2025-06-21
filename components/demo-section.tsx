import TabletAnalysisDemo from "./tablet-analysis-demo"

export default function DemoSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Try Our Technology</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience how our AI can identify and analyze tablets in real-time
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="lg:w-1/2">
            <h3 className="text-2xl font-semibold mb-4">Interactive Demo</h3>
            <p className="text-gray-600 mb-4">
              This demo showcases our AI's ability to analyze tablets based on their physical characteristics. In a
              real-world scenario, our system would:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>Accurately count multiple tablets in a single image</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>Identify color, shape, size, and markings with precision</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>Match against a database of thousands of medications</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>Provide detailed information about the medication</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>Integrate with your pharmacy management system</span>
              </li>
            </ul>
            <p className="text-gray-600">
              Try the demo by taking a photo or uploading an image. For this demonstration, we'll simulate the analysis
              process and show you sample results.
            </p>
          </div>

          <div className="lg:w-1/2">
            <TabletAnalysisDemo />
          </div>
        </div>
      </div>
    </section>
  )
}
