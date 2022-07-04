const init = {
//   profile: {
//     "_id": "624bf035f295dc90cb32eb4a",
//     "cart": [
//         {
//             "_id": "6265c5e2faa3ed6b0499306d",
//             "total": 1
//         },
//         {
//             "_id": "626578cafaa3ed6b0499301f",
//             "total": 1
//         },
//         {
//             "_id": "6265c57efaa3ed6b04993069",
//             "total": 1
//         },
//         {
//             "_id": "62655f2265ae1043c1f39c93",
//             "total": 1
//         }
//     ],
//     "fullname": "ikhrom wicaksono",
//     "email": "ikhromwicaksono92@gmail.com",
//     "picture": "https://lh3.googleusercontent.com/a/AATXAJwSY9etteJrEk6V9iBipHoNRLcDeqidvHqXOFSZ=s96-c",
//     "googleId": "106092058522348250711",
//     "role": "user",
//     "__v": 0,
//     "phoneNumber": "+6285274528960",
//     "myCourse": [
//         {
//             "_id": "62640b10718ac685d39a9df0"
//         },
//         {
//             "_id": "62640b10718ac685d39a9df0"
//         },
//         {
//             "_id": "6269967f846fa913c8109534"
//         },
//         {
//             "_id": "626ab44a3b06de6a3ce54b85"
//         },
//         {
//             "_id": "626ab7743b06de6a3ce54bbe"
//         },
//         {
//             "_id": "626ab7743b06de6a3ce54bbe"
//         }
//     ]
// }
    profile: null
}

const reducer = (state = init, action: any) => {
  switch (action.type) {
    case 'SET_PROFILE':
      return { ...state, profile: action.payload }
    default:
      return state
  }
}

export default reducer