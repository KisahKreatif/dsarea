export interface iAddProps {
  icon: string
  title: string
  description: string
  price: iPriceProps
  link: iLinkProps
  learningMaterial?: string[]
  benefit: string[]
  hasVideo?: boolean
  hasLiveZoom?: boolean
  hasGroup?: boolean
  timeDescription: string
}

export interface iEditProps {
  icon?: string
  title?: string
  description?: string
  price?: iPriceProps
  link?: iLinkProps
  learningMaterial?: string[]
  benefit?: string[]
  hasVideo?: boolean
  hasLiveZoom?: boolean
  hasGroup?: boolean
  timeDescription?: string
}

interface iPriceProps {
  regular: string | number
  special: string | number
}

interface iLinkProps {
  discussionGroup: string
  googleClass: string
}

// icon: training.logo,
// title: training.name,
// description: training.description,
// price: {
//   regular: training.price.single,
//   special: training.price.double
// },
// link: {
//   discussionGroup: training.groupDiscussionLink,
//   googleClass: training.googleClassLink
// },
// learningMaterial: training.more ? training.more : undefined,
// benefit: training.benefits,
// hasVideo: training.hasVideo,
// hasLiveZoom: training.hasLiveZoom,
// hasGroup: training.hasGroup,
// timeDescription: training.timeDescription