export interface iDetailTransactProps {
  data: iTransactProps;
  setData: Function;
}

interface iTransactProps {
  type: "sendiri" | "berdua";
  email: string;
  participant: string;
  phoneNumber: string;
  price: number | string;
  courseId: string;
  paymentMethod:
    | "ID_DANA"
    | "ID_OVO"
    | "ID_LINKAJA"
    | "ID_SHOPEEPAY"
    | ""
    | "BNI"
    | "BCA"
    | "MANDIRI";
  second_participant: string;
  second_participant_phoneNumber: string;
  bankName?: string;
  referral?: string;
}
