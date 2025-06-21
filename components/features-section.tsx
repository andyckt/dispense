import { Camera, Database, Clock, Shield, Zap, CloudCog } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function FeaturesSection() {
  const features = [
    {
      icon: <Camera className="h-10 w-10 text-blue-600" />,
      title: "Instant Recognition",
      description: "Identify any medication tablet within seconds using our advanced image recognition technology",
    },
    {
      icon: <Database className="h-10 w-10 text-blue-600" />,
      title: "Comprehensive Database",
      description: "Access information on thousands of medications, updated regularly with new entries",
    },
    {
      icon: <Clock className="h-10 w-10 text-blue-600" />,
      title: "Time-Saving",
      description: "Reduce identification time from minutes to seconds, improving pharmacy workflow efficiency",
    },
    {
      icon: <Shield className="h-10 w-10 text-blue-600" />,
      title: "Error Prevention",
      description: "Minimize dispensing errors with accurate identification and verification",
    },
    {
      icon: <Zap className="h-10 w-10 text-blue-600" />,
      title: "Easy Integration",
      description: "Seamlessly integrates with existing pharmacy management systems",
    },
    {
      icon: <CloudCog className="h-10 w-10 text-blue-600" />,
      title: "Cloud-Based",
      description: "Access from any device with our secure cloud infrastructure, with regular AI model updates",
    },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Powerful Features</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our AI-powered solution offers a range of features designed to streamline pharmacy operations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="pb-2">
                <div className="mb-4">{feature.icon}</div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 text-base">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
