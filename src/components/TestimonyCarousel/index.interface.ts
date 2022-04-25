export interface IContainerProps {
  data: any[]
}

export interface ICardProps {
  data: ICardDataProps
}

export interface ICardDataProps {
  user: string
  userJob: string
  opinion: string
  rating: number
  [key: string]: any
}