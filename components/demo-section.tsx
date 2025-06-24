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

        <div className="flex justify-center">
          <div className="max-w-2xl w-full">
            <TabletAnalysisDemo />
          </div>
        </div>
      </div>
    </section>
  )
}
