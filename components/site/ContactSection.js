'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Check, Phone, MessageCircle, Mail, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { COMPANY } from '@/lib/voomet-data'

const ease = [0.22, 1, 0.36, 1]

export default function ContactSection({ defaultRequirement = 'Residential', heading = 'Engage with Us in\nConversation.' }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    requirement: defaultRequirement,
    area: '',
    message: '',
  })

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.phone) {
      toast.error('Please enter your name and phone')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source: 'website-contact' }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'Failed')
      router.push('/thank-you')
    } catch (err) {
      toast.error(err.message || 'Something went wrong')
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="px-4 md:px-8 pb-20 pt-10">
      <div className="max-w-[1400px] mx-auto rounded-[28px] bg-neutral-900 text-white overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="p-8 md:p-12 lg:p-16 flex flex-col">
            <h2 className="font-display text-5xl md:text-7xl font-semibold leading-[1] tracking-[-0.03em] whitespace-pre-line">
              {heading}
            </h2>
              <p className="mt-5 text-white/70 max-w-md leading-relaxed">
              Tell us about your space. We&apos;ll respond within one business day with
              ideas, indicative budget and timelines.
            </p>

            <div className="mt-10 space-y-4">
              <a href={`tel:${COMPANY.phoneDigits}`} className="flex items-center gap-4 group">
                <span className="w-10 h-10 rounded-full bg-white/10 group-hover:bg-white/20 flex items-center justify-center transition">
                  <Phone className="h-4 w-4" />
                </span>
                <span className="text-sm md:text-base">{COMPANY.phoneSecondary}</span>
              </a>
              <a
                href={COMPANY.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 group"
              >
                <span className="w-10 h-10 rounded-full bg-white/10 group-hover:bg-white/20 flex items-center justify-center transition">
                  <MessageCircle className="h-4 w-4" />
                </span>
                <span className="text-sm md:text-base">WhatsApp us instantly</span>
              </a>
              <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-4 group">
                <span className="w-10 h-10 rounded-full bg-white/10 group-hover:bg-white/20 flex items-center justify-center transition">
                  <Mail className="h-4 w-4" />
                </span>
                <span className="text-sm md:text-base">{COMPANY.email}</span>
              </a>
              <div className="flex items-center gap-4">
                <span className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <MapPin className="h-4 w-4" />
                </span>
                <span className="text-sm md:text-base">{COMPANY.address}</span>
              </div>
            </div>
          </div>

          <div className="p-8 md:p-12 lg:p-16 bg-[#111111]">
            <form onSubmit={onSubmit} className="space-y-4">
              <h3 className="font-display text-2xl md:text-3xl font-semibold tracking-[-0.02em]">Book a free consultation</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="Your name *"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="h-12 rounded-xl bg-white/5 border-white/10 text-white placeholder:text-white/40 focus-visible:ring-white/30"
                />
              </div>
              <Input
                placeholder="Email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="h-12 rounded-xl bg-white/5 border-white/10 text-white placeholder:text-white/40 focus-visible:ring-white/30"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                  value={form.requirement}
                  onValueChange={(v) => setForm({ ...form, requirement: v })}
                >
                  <SelectTrigger className="h-12 rounded-xl bg-white/5 border-white/10 text-white">
                    <SelectValue placeholder="Requirement" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Office Interiors">Office Interiors</SelectItem>
                    <SelectItem value="Residential">Home Interiors</SelectItem>
                    <SelectItem value="Hotel Interiors">Hotel Interiors</SelectItem>
                    <SelectItem value="Hospital Interiors">Hospital Interiors</SelectItem>
                    <SelectItem value="Educational Interiors">Educational Institute Interiors</SelectItem>
                    <SelectItem value="Retail Interiors">Commercial / Retail Interiors</SelectItem>
                    <SelectItem value="Doors">Doors Manufacturing</SelectItem>
                    <SelectItem value="Bulk Manufacturing">Bulk Manufacturing</SelectItem>
                    <SelectItem value="Others">Others</SelectItem>
                  </SelectContent>
                </Select>
                <Select
                  value={form.area}
                  onValueChange={(v) => setForm({ ...form, area: v })}
                >
                  <SelectTrigger className="h-12 rounded-xl bg-white/5 border-white/10 text-white">
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="<1000">&lt; 1000 sqft</SelectItem>
                    <SelectItem value="1000-5000">1000 - 5000 sqft</SelectItem>
                    <SelectItem value="5000-10000">5000 - 10000 sqft</SelectItem>
                    <SelectItem value=">10000">&gt; 10000 sqft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Textarea
                placeholder="Tell us about your project..."
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="rounded-xl bg-white/5 border-white/10 text-white placeholder:text-white/40 focus-visible:ring-white/30"
              />
              <Button
                type="submit"
                disabled={loading}
                className="h-12 w-full rounded-xl bg-white text-neutral-900 hover:bg-neutral-100 text-sm font-medium"
              >
                {loading ? 'Sending…' : 'Get A Quote'}
                {!loading && <ArrowRight className="h-4 w-4 ml-2" />}
              </Button>
              <p className="text-xs text-white/40">
                By submitting you agree to be contacted by Voomet about your enquiry.
              </p>
            </form>
          </div>
        </div>

        <div className="px-8 md:px-16 pb-4 -mt-6 hidden md:block">
          <div className="font-display font-semibold text-[18vw] leading-[0.8] tracking-[-0.06em] text-white/10 text-right">
            Voomet
          </div>
        </div>
      </div>
    </section>
  )
}
