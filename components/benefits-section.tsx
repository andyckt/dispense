import { Clock, ShieldCheck, TrendingUp, Users, Tablet } from "lucide-react"

export default function BenefitsSection() {
  const benefits = [
    {
      icon: <Clock className="h-12 w-12 text-blue-600" />,
      title: "Save Time",
      description:
        "Reduce the time spent on manual identification by up to 90%, allowing pharmacists to focus on patient care",
    },
    {
      icon: <ShieldCheck className="h-12 w-12 text-blue-600" />,
      title: "Enhance Safety",
      description: "Minimize dispensing errors and improve patient safety with accurate medication identification",
    },
    {
      icon: <TrendingUp className="h-12 w-12 text-blue-600" />,
      title: "Increase Efficiency",
      description: "Streamline workflow and process more prescriptions with the same staff resources",
    },
    {
      icon: <Users className="h-12 w-12 text-blue-600" />,
      title: "Improve Patient Experience",
      description: "Reduce wait times and provide more time for patient consultation and education",
    },
  ]

  return (
    <section className="py-20 bg-blue-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-12">
          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">Benefits for Modern Pharmacies</h2>
            <p className="text-xl text-gray-600 mb-8">
              Our AI solution transforms pharmacy operations, bringing numerous advantages to your business and patients
            </p>
            <div className="bg-white rounded-lg shadow-xl overflow-hidden p-8">
              <div className="aspect-[4/3] bg-blue-50 rounded-lg flex items-center justify-center">
                <div className="text-center p-6">
                  <div className="bg-blue-100 p-4 rounded-full inline-flex mb-4">
                    <Tablet className="h-16 w-16 text-blue-600" />
                  </div>
                  <p className="text-blue-600 font-medium">Pharmacist using tablet recognition system</p>
                </div>
              </div>
            </div>
          </div>

          <div className="md:w-1/2">
            <div className="grid grid-cols-1 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex gap-6">
                  <div className="flex-shrink-0 mt-1">{benefit.icon}</div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
