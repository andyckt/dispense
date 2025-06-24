import TabletAnalysisDemo from "./tablet-analysis-demo"

export default function DemoSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Try Our Technology</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience how our AI can count and analyze tablets in real-time
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="lg:w-1/2">
            <h3 className="text-2xl font-semibold mb-4">Interactive Demo</h3>
            <p className="text-gray-600 mb-4">
              This demo showcases our AI's ability to count tablets using computer vision. In a
              real-world scenario, our system would:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>Accurately count multiple tablets in a single image</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>Work with various tablet shapes, colors, and sizes</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>Process images in seconds</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>Help reduce counting errors in pharmacy operations</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>Integrate with your pharmacy management system</span>
              </li>
            </ul>
            <p className="text-gray-600">
              Try the demo by taking a photo or uploading an image of tablets. Our AI will count the tablets and display the results.
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
