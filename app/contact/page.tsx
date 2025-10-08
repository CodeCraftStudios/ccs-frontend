"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, Users, Zap, Calendar, CheckCircle, X } from "lucide-react"
import { CALENDLY, EMAIL, PHONE, SERVER_ENDPOINT } from "@/lib/consts"
import { useState } from "react"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    budget: "",
    message: "",
  })
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [modalMessage, setModalMessage] = useState("")
  const [modalType, setModalType] = useState<"success" | "error">("success")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch(`${SERVER_ENDPOINT}/api/contact/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.success) {
        setModalType("success")
        setModalMessage(data.message)
        setShowModal(true)
        setFormData({
          first_name: "",
          last_name: "",
          email: "",
          phone: "",
          budget: "",
          message: "",
        })
      } else {
        setModalType("error")
        setModalMessage(data.message || "Failed to submit form")
        setShowModal(true)
      }
    } catch (error) {
      setModalType("error")
      setModalMessage("An error occurred. Please try again later.")
      setShowModal(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background pt-32 pb-20">
      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 mb-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div variants={staggerContainer} initial="initial" animate="animate">
            <motion.div variants={fadeInUp}>
              <Badge variant="secondary" className="mb-6 bg-primary text-primary-foreground border-primary/30">
                <MessageCircle className="w-4 h-4 mr-2" />
                Let's Work Together
              </Badge>
            </motion.div>

            <motion.h1
              className="superfont text-4xl md:text-6xl font-bold text-balance mb-6 text-glow-primary"
              variants={fadeInUp}
            >
              Ready to Start Your
              <span className="text-primary block">Digital Journey?</span>
            </motion.h1>

            <motion.p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8" variants={fadeInUp}>
              Get in touch with our Miami-based team of experts. We're here to turn your vision into reality.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <Card className="border-2 border-primary/20 hover:border-primary/40 transition-colors">
                <CardHeader>
                  <CardTitle className="text-2xl">Send us a Message</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">First Name</label>
                        <Input
                          name="first_name"
                          value={formData.first_name}
                          onChange={handleChange}
                          placeholder="John"
                          className="border-primary/30 focus:border-primary"
                          required
                          disabled={loading}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Last Name</label>
                        <Input
                          name="last_name"
                          value={formData.last_name}
                          onChange={handleChange}
                          placeholder="Doe"
                          className="border-primary/30 focus:border-primary"
                          required
                          disabled={loading}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Email</label>
                      <Input
                        type="email"
                        inputMode="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="border-primary/30 focus:border-primary"
                        required
                        disabled={loading}
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Phone (Optional)</label>
                      <Input
                        type="tel"
                        inputMode="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 (555) 123-4567"
                        className="border-primary/30 focus:border-primary"
                        disabled={loading}
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Budget</label>
                      <select
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className="w-full p-3 border border-primary/30 rounded-md bg-background focus:border-primary focus:outline-none"
                        disabled={loading}
                      >
                        <option value="">Choose option...</option>
                        <option value="$500-$1,000">$500-$1,000</option>
                        <option value="$1,001-$5,000">$1,001-$5,000</option>
                        <option value="$5,001-$15,000">$5,001-$15,000</option>
                        <option value="$15,000-$24,999">$15,000-$24,999</option>
                        <option value="$25,000+">$25,000+</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Message</label>
                      <Textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your project..."
                        className="min-h-[120px] border-primary/30 focus:border-primary"
                        required
                        disabled={loading}
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground group btn-glow"
                      disabled={loading}
                    >
                      <Send className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                      {loading ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div>
                <h2 className="superfont text-3xl font-bold mb-6">Get in Touch</h2>
                <p className="text-muted-foreground mb-8">
                  Ready to discuss your project? Our team is here to help you every step of the way.
                </p>
              </div>

              <div className="space-y-6">
                <motion.div
                  className="flex items-start space-x-4 group cursor-pointer"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Location</h3>
                    <p className="text-muted-foreground">Miami, Florida, USA</p>
                  </div>
                </motion.div>

                <motion.a
                  href={`mailto:${EMAIL}`}
                  className="flex items-start space-x-4 group cursor-pointer"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <p className="text-muted-foreground">{EMAIL}</p>
                  </div>
                </motion.a>

                <motion.a
                  href={`tel:${PHONE}`}
                  className="flex items-start space-x-4 group cursor-pointer"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Phone</h3>
                    <p className="text-muted-foreground">+1 (305) 555-0123</p>
                  </div>
                </motion.a>
                <motion.a
                  href={`${CALENDLY}`}
                  className="flex items-start space-x-4 group cursor-pointer"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Calendar className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Meeting</h3>
                    <p className="text-muted-foreground">Schedule Call</p>
                  </div>
                </motion.a>

                <motion.div
                  className="flex items-start space-x-4 group cursor-pointer"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Business Hours</h3>
                    <p className="text-muted-foreground">Mon - Fri: 9AM - 6PM EST</p>
                  </div>
                </motion.div>
              </div>

              {/* Why Choose Us */}
              <Card className="border-2 border-primary/20 bg-primary/5">
                <CardHeader>
                  <CardTitle className="text-xl">Why Choose CodeCraft Studios?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Users className="w-5 h-5 text-primary" />
                    <span className="text-sm">7+ Years of Experience</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Zap className="w-5 h-5 text-primary" />
                    <span className="text-sm">Fast & Reliable Delivery</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MessageCircle className="w-5 h-5 text-primary" />
                    <span className="text-sm">24/7 Support Available</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showModal && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              onClick={() => setShowModal(false)}
            />

            {/* Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.2 }}
                className="relative w-full max-w-md"
              >
                <Card className="border-2 border-primary/30 shadow-2xl">
                  <CardHeader className="relative pb-4">
                    <button
                      onClick={() => setShowModal(false)}
                      className="absolute right-4 top-4 p-1 rounded-full hover:bg-muted transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                    <div
                      className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                        modalType === "success" ? "bg-green-500/20" : "bg-red-500/20"
                      }`}
                    >
                      {modalType === "success" ? (
                        <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                      ) : (
                        <X className="w-8 h-8 text-red-600 dark:text-red-400" />
                      )}
                    </div>
                    <CardTitle className="text-center text-2xl">
                      {modalType === "success" ? "Message Sent!" : "Error"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center space-y-4">
                    <p className="text-muted-foreground">{modalMessage}</p>
                    <Button
                      onClick={() => setShowModal(false)}
                      className="w-full bg-primary hover:bg-primary/90"
                    >
                      Close
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
