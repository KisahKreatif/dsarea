export interface iReviewProps {
  review: iReviewInputProps
  setReview: Function
}

export interface iReviewInputProps {
  name: string
  training: any
  rating: number
  note: string
}