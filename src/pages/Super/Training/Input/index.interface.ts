export interface iTrainingInputProps {
  name: string
  price: iPrice
  hasVideo?: boolean
  hasLiveZoom?: boolean
  hasGroup?: boolean
  description: string
  more?: string[]
  benefits: string[]
  logo: iImage | string
  timeDescription: string
  googleClassLink?: string
  groupDiscussionLink?: string
}
interface iPrice {
  single: number | ''
  double: number | ''
}

interface iImage {
  name: string
  type: string
  uri: string
}