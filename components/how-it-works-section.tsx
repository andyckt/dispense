import { Camera, Search, FileText, CheckCircle } from "lucide-react"

export default function HowItWorksSection() {
  const steps = [
    {
      icon: <Camera className="h-12 w-12 text-white" />,
      title: "Capture Image",
      description: "Take a photo of any medication tablet using your device's camera or upload an existing image",
    },
    {
      icon: <Search className="h-12 w-12 text-white" />,
      title: "AI Analysis",
      description:
        "Our advanced AI algorithms analyze the tablet's shape, color, markings, and other visual characteristics",
    },
    {
      icon: <FileText className="h-12 w-12 text-white" />,
      title: "Retrieve Information",
      description:
        "Access comprehensive medication details including name, dosage, usage instructions, and potential interactions",
    },
    {
      icon: <CheckCircle className="h-12 w-12 text-white" />,
      title: "Verify & Dispense",
      description: "Confirm the identification and proceed with confidence in your dispensing process",
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">How It Works</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our simple four-step process makes medication identification fast and accurate
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="bg-blue-600 rounded-full p-6 mb-6">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>

              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute transform translate-x-[150px]">
                  <svg width="100" height="20" viewBox="0 0 100 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M99.0607 10.0607C99.6464 9.47487 99.6464 8.52513 99.0607 7.93934L89.5147 -1.60658C88.9289 -2.19237 87.9792 -2.19237 87.3934 -1.60658C86.8076 -1.02079 86.8076 -0.0710427 87.3934 0.514749L95.8787 9L87.3934 17.4853C86.8076 18.0711 86.8076 19.0208 87.3934 19.6066C87.9792 20.1924 88.9289 20.1924 89.5147 19.6066L99.0607 10.0607ZM-1.31134e-07 10.5L98 10.5L98 9.5L1.31134e-07 9.5L-1.31134e-07 10.5Z"
                      fill="#CBD5E0"
                    />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
