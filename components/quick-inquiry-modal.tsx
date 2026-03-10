'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import { generateInquiryWhatsApp } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

interface QuickInquiryModalProps {
  isOpen: boolean
  onClose: () => void
  productName: string
  colorName: string
}

const countries = [
  'United States', 'United Kingdom', 'France', 'Germany', 'Italy',
  'Japan', 'South Korea', 'Australia', 'Canada', 'China',
  'Singapore', 'UAE', 'Saudi Arabia', 'Brazil', 'Mexico',
]

export function QuickInquiryModal({ isOpen, onClose, productName, colorName }: QuickInquiryModalProps) {
  const [form, setForm] = useState({
    quantity: 1,
    country: '',
    customization: false,
    email: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (field: string, value: string | number | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const whatsappUrl = `https://wa.me/8613926015626?text=${generateInquiryWhatsApp({
    productName,
    color: colorName,
    quantity: form.quantity,
    country: form.country || 'Not specified',
    customization: form.customization,
  })}`

  const handleEmailSubmit = () => {
    // In production, this would POST to /api/inquiries
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      onClose()
    }, 2000)
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-50 bg-foreground/40 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="relative w-full max-w-md bg-background border border-border p-8"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Close"
          >
            <X className="h-4 w-4" strokeWidth={1.5} />
          </button>

          <h2 className="font-serif text-xl tracking-wide text-foreground">
            Quick Inquiry
          </h2>
          <p className="mt-1 text-xs text-muted-foreground">
            {productName} - {colorName}
          </p>

          {submitted ? (
            <div className="mt-8 flex flex-col items-center gap-4 py-8 text-center">
              <div className="flex h-12 w-12 items-center justify-center border border-foreground">
                <svg className="h-5 w-5 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <p className="text-sm text-foreground">Inquiry submitted successfully</p>
              <p className="text-xs text-muted-foreground">We will contact you within 24 hours</p>
            </div>
          ) : (
            <div className="mt-6 flex flex-col gap-5">
              {/* Quantity */}
              <div>
                <label className="text-xs text-muted-foreground">Quantity (pcs)</label>
                <input
                  type="number"
                  min={1}
                  value={form.quantity}
                  onChange={(e) => handleChange('quantity', parseInt(e.target.value) || 1)}
                  className="mt-1.5 w-full border border-border bg-transparent px-4 py-2.5 text-sm text-foreground focus:border-foreground focus:outline-none"
                />
              </div>

              {/* Country */}
              <div>
                <label className="text-xs text-muted-foreground">Destination Country</label>
                <select
                  value={form.country}
                  onChange={(e) => handleChange('country', e.target.value)}
                  className="mt-1.5 w-full border border-border bg-transparent px-4 py-2.5 text-sm text-foreground focus:border-foreground focus:outline-none"
                >
                  <option value="">Select country</option>
                  {countries.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* Customization */}
              <div>
                <label className="text-xs text-muted-foreground">Need Customization?</label>
                <div className="mt-2 flex gap-3">
                  {[
                    { value: true, label: 'Yes' },
                    { value: false, label: 'No' },
                  ].map((opt) => (
                    <button
                      key={String(opt.value)}
                      type="button"
                      onClick={() => handleChange('customization', opt.value)}
                      className={cn(
                        'flex-1 border py-2 text-xs tracking-wide transition-colors',
                        form.customization === opt.value
                          ? 'border-foreground bg-foreground text-background'
                          : 'border-border text-foreground hover:border-foreground'
                      )}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="text-xs text-muted-foreground">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="your@email.com"
                  className="mt-1.5 w-full border border-border bg-transparent px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-foreground focus:outline-none"
                />
              </div>

              {/* CTAs */}
              <div className="mt-2 flex flex-col gap-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 items-center justify-center bg-foreground text-xs tracking-[0.15em] uppercase text-background transition-opacity hover:opacity-90"
                >
                  Send via WhatsApp
                </a>
                <button
                  type="button"
                  onClick={handleEmailSubmit}
                  disabled={!form.email}
                  className={cn(
                    'flex h-11 items-center justify-center border text-xs tracking-[0.15em] uppercase transition-colors',
                    form.email
                      ? 'border-foreground text-foreground hover:bg-foreground hover:text-background'
                      : 'border-border text-muted-foreground cursor-not-allowed'
                  )}
                >
                  Submit Inquiry
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
