import { Button } from "@/components/ui/button"
import { Users } from "lucide-react"

export default function AboutSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">About Our Company</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're on a mission to transform pharmacy operations through innovative AI technology
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
            <div className="bg-gray-100 p-1 rounded-lg">
              <div className="aspect-[4/3] bg-white rounded-lg flex items-center justify-center p-8">
                <div className="text-center">
                  <div className="flex justify-center gap-2 mb-4">
                    <div className="bg-blue-100 rounded-full p-3">
                      <Users className="h-10 w-10 text-blue-600" />
                    </div>
                  </div>
                  <p className="text-gray-600">Our team of pharmacists and AI engineers</p>
                </div>
              </div>
            </div>
          </div>

          <div className="md:w-1/2">
            <h3 className="text-2xl font-semibold mb-4">Our Story</h3>
            <p className="text-gray-600 mb-4">
              Founded by a team of pharmacists and AI engineers, our company was born from firsthand experience with the
              challenges of medication identification in busy pharmacy settings.
            </p>
            <p className="text-gray-600 mb-4">
              We recognized that pharmacists were spending valuable time manually identifying medications—time that
              could be better spent on patient care and consultation.
            </p>
            <p className="text-gray-600 mb-6">
              Our AI solution was developed through extensive collaboration with pharmacy professionals to ensure it
              addresses real-world needs and integrates seamlessly into existing workflows.
            </p>
            <Button variant="outline">Learn More About Our Team</Button>
          </div>
        </div>
      </div>
    </section>
  )
}
