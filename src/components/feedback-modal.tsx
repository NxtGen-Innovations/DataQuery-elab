'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Download, X, PartyPopper, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { generateFeedbackReport } from '@/lib/feedback-pdf-service'

interface FeedbackModalProps {
  isOpen: boolean
  onClose: () => void
  userName: string
  userEmail: string
}

export function FeedbackModal({ isOpen, onClose, userName, userEmail }: FeedbackModalProps) {
  const [rating, setRating] = useState(0)
  const [hoveredStar, setHoveredStar] = useState(0)
  const [review, setReview] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [downloading, setDownloading] = useState(false)

  const handleSubmit = async () => {
    if (rating === 0) return
    setSubmitted(true)
  }

  const handleDownload = async () => {
    setDownloading(true)
    try {
      await generateFeedbackReport({
        userName,
        userEmail,
        rating,
        review,
        completionDate: new Date().toLocaleDateString('en-IN', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
      })
    } finally {
      setDownloading(false)
    }
  }

  const starLabels = ['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent']

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg border border-[#30363d] bg-[#0d1117] shadow-2xl overflow-hidden"
          >
            {/* Decorative top gradient */}
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#58a6ff] via-[#3fb950] to-[#d29922]" />

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-[#8b949e] hover:text-[#e6edf3] transition-colors z-10"
            >
              <X className="size-5" />
            </button>

            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="p-8"
                >
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex size-10 items-center justify-center rounded-full bg-[#d29922]/10">
                      <PartyPopper className="size-5 text-[#d29922]" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-[#e6edf3]">
                        Congratulations! 🎉
                      </h2>
                      <p className="text-[12px] text-[#8b949e]">
                        You&apos;ve completed the entire curriculum
                      </p>
                    </div>
                  </div>

                  <p className="mt-4 text-[14px] leading-relaxed text-[#8b949e]">
                    We&apos;d love to hear about your experience with <span className="font-semibold text-[#58a6ff]">DataQuest eLab</span>. 
                    Your feedback helps us improve the platform for future learners.
                  </p>

                  {/* Star Rating */}
                  <div className="mt-6">
                    <label className="text-[11px] font-bold uppercase tracking-widest text-[#8b949e]">
                      Rate your experience
                    </label>
                    <div className="mt-3 flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHoveredStar(star)}
                          onMouseLeave={() => setHoveredStar(0)}
                          className="transition-transform hover:scale-110 active:scale-95"
                        >
                          <Star
                            className={cn(
                              'size-8 transition-colors duration-150',
                              (hoveredStar || rating) >= star
                                ? 'fill-[#d29922] text-[#d29922]'
                                : 'text-[#30363d] hover:text-[#484f58]'
                            )}
                          />
                        </button>
                      ))}
                      {(hoveredStar || rating) > 0 && (
                        <motion.span
                          initial={{ opacity: 0, x: -5 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="ml-2 text-[13px] font-medium text-[#d29922]"
                        >
                          {starLabels[hoveredStar || rating]}
                        </motion.span>
                      )}
                    </div>
                  </div>

                  {/* Review Textarea */}
                  <div className="mt-6">
                    <label className="text-[11px] font-bold uppercase tracking-widest text-[#8b949e]">
                      Share your thoughts (optional)
                    </label>
                    <textarea
                      value={review}
                      onChange={(e) => setReview(e.target.value)}
                      placeholder="What did you enjoy most? What could be improved?"
                      rows={4}
                      className="mt-3 w-full resize-none border border-[#30363d] bg-[#161b22] px-4 py-3 text-[14px] text-[#e6edf3] placeholder:text-[#484f58] focus:border-[#58a6ff]/50 focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    onClick={handleSubmit}
                    disabled={rating === 0}
                    className={cn(
                      'mt-6 w-full h-11 text-[13px] font-bold transition-all',
                      rating > 0
                        ? 'bg-[#58a6ff] text-white hover:bg-[#4c94e6]'
                        : 'bg-[#21262d] text-[#484f58] cursor-not-allowed'
                    )}
                  >
                    <Sparkles className="mr-2 size-4" />
                    Submit Feedback & Download Certificate
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-8 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', damping: 10, stiffness: 200, delay: 0.1 }}
                    className="mx-auto flex size-16 items-center justify-center rounded-full bg-[#3fb950]/10"
                  >
                    <PartyPopper className="size-8 text-[#3fb950]" />
                  </motion.div>
                  
                  <h2 className="mt-6 text-xl font-bold text-[#e6edf3]">
                    Thank you, {userName}!
                  </h2>
                  <p className="mt-2 text-[14px] text-[#8b949e]">
                    Your feedback has been recorded. You rated us{' '}
                    <span className="font-bold text-[#d29922]">{rating}/5</span> stars.
                  </p>

                  <div className="mt-4 flex justify-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={cn(
                          'size-5',
                          star <= rating
                            ? 'fill-[#d29922] text-[#d29922]'
                            : 'text-[#30363d]'
                        )}
                      />
                    ))}
                  </div>

                  {review && (
                    <div className="mt-4 border border-[#30363d] bg-[#161b22] p-4 text-left">
                      <p className="text-[11px] font-bold uppercase tracking-widest text-[#8b949e] mb-2">Your Review</p>
                      <p className="text-[13px] text-[#c9d1d9] italic leading-relaxed">&ldquo;{review}&rdquo;</p>
                    </div>
                  )}

                  <Button
                    onClick={handleDownload}
                    disabled={downloading}
                    className="mt-6 w-full h-11 bg-[#3fb950] text-[13px] font-bold text-white hover:bg-[#2ea043]"
                  >
                    <Download className="mr-2 size-4" />
                    {downloading ? 'Generating PDF...' : 'Download Feedback Report'}
                  </Button>

                  <button
                    onClick={onClose}
                    className="mt-4 text-[12px] text-[#8b949e] hover:text-[#e6edf3] transition-colors"
                  >
                    Close this dialog
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
