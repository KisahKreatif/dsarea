export interface iReviewProps {
  name: string
  rating: string | number
  courseId: string
  courseTitle: string
  notes: string
}

export interface iReviewEditProps {
  name?: string
  rating?: string | number
  courseId?: string
  courseTitle?: string
  notes?: string
}