import jsPDF from 'jspdf'

interface FeedbackReportData {
  userName: string
  userEmail: string
  rating: number
  review: string
  completionDate: string
}

export async function generateFeedbackReport(data: FeedbackReportData) {
  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.getWidth()

  // Header Background
  doc.setFillColor(13, 17, 23)
  doc.rect(0, 0, pageWidth, 45, 'F')

  // Logo
  try {
    const logoImg = '/srm-logo.png'
    doc.addImage(logoImg, 'PNG', 15, 8, 40, 20)
  } catch (e) {
    console.error('Logo failed to load', e)
  }

  // Title
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(20)
  doc.setFont('helvetica', 'bold')
  doc.text('Course Completion & Feedback', pageWidth - 15, 20, { align: 'right' })
  
  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.text('DataQuest eLab - Data Science Curriculum', pageWidth - 15, 28, { align: 'right' })
  doc.text(`Issued: ${data.completionDate}`, pageWidth - 15, 36, { align: 'right' })

  // Congratulatory Section
  doc.setFillColor(63, 185, 80)
  doc.rect(15, 55, pageWidth - 30, 28, 'F')
  
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(16)
  doc.setFont('helvetica', 'bold')
  doc.text('CURRICULUM COMPLETED SUCCESSFULLY', pageWidth / 2, 67, { align: 'center' })
  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.text('All 3 Units • 12 Lessons • Quizzes & Practice Labs Verified', pageWidth / 2, 76, { align: 'center' })

  // Student Info
  let y = 100

  doc.setTextColor(33, 37, 41)
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text('Student Information', 15, y)
  
  doc.setDrawColor(200, 200, 200)
  doc.line(15, y + 3, pageWidth - 15, y + 3)
  y += 14

  doc.setFontSize(11)
  doc.setFont('helvetica', 'normal')
  doc.text(`Name: ${data.userName}`, 15, y)
  y += 8
  doc.text(`Email: ${data.userEmail}`, 15, y)
  y += 8
  doc.text(`Completion Date: ${data.completionDate}`, 15, y)
  y += 20

  // Rating Section
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text('Platform Rating', 15, y)
  doc.line(15, y + 3, pageWidth - 15, y + 3)
  y += 14

  // Draw stars
  const starSize = 12
  const starSpacing = 16
  const starsStartX = 15
  
  for (let i = 1; i <= 5; i++) {
    if (i <= data.rating) {
      doc.setFillColor(210, 153, 34)  // Gold filled star
      doc.setTextColor(210, 153, 34)
    } else {
      doc.setFillColor(200, 200, 200)  // Gray empty star
      doc.setTextColor(200, 200, 200)
    }
    doc.setFontSize(starSize)
    doc.text('★', starsStartX + (i - 1) * starSpacing, y)
  }

  doc.setTextColor(33, 37, 41)
  doc.setFontSize(12)
  doc.setFont('helvetica', 'bold')
  const ratingLabels = ['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent']
  doc.text(`  ${data.rating}/5 — ${ratingLabels[data.rating]}`, starsStartX + 5 * starSpacing, y)
  y += 18

  // Review Section
  if (data.review && data.review.trim().length > 0) {
    doc.setFontSize(14)
    doc.setFont('helvetica', 'bold')
    doc.text('Student Review', 15, y)
    doc.line(15, y + 3, pageWidth - 15, y + 3)
    y += 14

    doc.setFontSize(11)
    doc.setFont('helvetica', 'italic')
    doc.setTextColor(80, 80, 80)
    
    const reviewText = `"${data.review}"`
    const splitReview = doc.splitTextToSize(reviewText, 170)
    
    // Review box
    const reviewBoxHeight = splitReview.length * 6 + 12
    doc.setDrawColor(200, 200, 200)
    doc.setFillColor(248, 249, 250)
    doc.rect(15, y - 4, pageWidth - 30, reviewBoxHeight, 'FD')
    doc.text(splitReview, 22, y + 4)
    y += reviewBoxHeight + 10
  } else {
    doc.setFontSize(11)
    doc.setFont('helvetica', 'italic')
    doc.setTextColor(139, 148, 158)
    doc.text('No written review provided.', 15, y)
    y += 14
  }

  // Curriculum Summary Table
  y += 5
  doc.setTextColor(33, 37, 41)
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text('Curriculum Summary', 15, y)
  doc.line(15, y + 3, pageWidth - 15, y + 3)
  y += 14

  const units = [
    { unit: 'Unit 1', title: 'Intro to Data Science & Python Foundations', lessons: 4, status: 'Completed ✓' },
    { unit: 'Unit 2', title: 'Data Handling & Data Wrangling', lessons: 4, status: 'Completed ✓' },
    { unit: 'Unit 3', title: 'Data Visualization using Matplotlib', lessons: 4, status: 'Completed ✓' },
  ]

  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')

  // Table header
  doc.setFillColor(240, 240, 240)
  doc.rect(15, y - 4, pageWidth - 30, 8, 'F')
  doc.setFont('helvetica', 'bold')
  doc.text('Unit', 20, y)
  doc.text('Topic', 50, y)
  doc.text('Lessons', 150, y)
  doc.text('Status', 175, y)
  y += 10

  doc.setFont('helvetica', 'normal')
  units.forEach((unit) => {
    doc.text(unit.unit, 20, y)
    doc.text(unit.title, 50, y)
    doc.text(String(unit.lessons), 155, y)
    doc.setTextColor(63, 185, 80)
    doc.text(unit.status, 172, y)
    doc.setTextColor(33, 37, 41)
    y += 8
  })

  // Disclaimer
  doc.setTextColor(248, 81, 73)
  doc.setFontSize(8)
  doc.setFont('helvetica', 'italic')
  const disclaimer = 'IMPORTANT: Please save this PDF. DataQuest eLab operates on a decentralized architecture; your progress data is stored in browser cache and will be lost if cleared.'
  const splitDisclaimer = doc.splitTextToSize(disclaimer, 180)
  doc.text(splitDisclaimer, 15, 275)

  // Footer
  doc.setTextColor(139, 148, 158)
  doc.setFontSize(8)
  doc.setFont('helvetica', 'normal')
  doc.text('Generated by DataQuest eLab • SRM Institute of Science and Technology', pageWidth / 2, 290, { align: 'center' })

  doc.save(`${data.userName.replace(/\s+/g, '_')}_DataQuest_eLab_Feedback.pdf`)
}
