import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Phone, MapPin } from "lucide-react"

export default function ContactSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Get In Touch</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Interested in revolutionizing your pharmacy operations? Contact us today for a demo or more information
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-2/3">
            <Card>
              <CardContent className="p-6">
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Full Name
                      </label>
                      <Input id="name" placeholder="Your name" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email Address
                      </label>
                      <Input id="email" type="email" placeholder="your.email@example.com" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="company" className="text-sm font-medium">
                      Company / Organization
                    </label>
                    <Input id="company" placeholder="Your company name" />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <Textarea id="message" placeholder="Tell us about your needs and how we can help" rows={5} />
                  </div>

                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="lg:w-1/3">
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <Mail className="h-5 w-5 text-blue-600 mt-1" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-gray-600">contact@aipharmatech.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Phone className="h-5 w-5 text-blue-600 mt-1" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-gray-600">+852 93575281</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <MapPin className="h-5 w-5 text-blue-600 mt-1" />
                    <div>
                      <p className="font-medium">Office</p>
                      <p className="text-gray-600">
                        123 Innovation Tower
                        <br />
                        Suite 400
                        <br />
                        Hong Kong
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Schedule a Demo</h3>
                <p className="text-gray-600 mb-4">
                  See our AI solution in action with a personalized demonstration for your pharmacy team.
                </p>
                <Button className="w-full">Book a Demo</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
