export interface iTransactionProps {
  type: 'sendiri' | 'berdua'
  phoneNumber: string
  price: number | string
  courseId: string
  paymentMethod: 'ID_DANA' | 'ID_OVO' | 'ID_LINKAJA' | 'ID_SHOPEEPAY' | ''
  participant: string
  email: string
  second_participant?: string
  second_participant_phoneNumber?: string
}