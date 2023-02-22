import User from "../../../models/user.js"

export const seedUsersDb = async () => {
  await User.deleteMany({})
    .then(data => console.log("Deleted all Events successfuly!!"))
    .catch(err => console.error("Failed while Deleting all."))

  await User.insertMany(users)
    .then(data => console.log("Seed Events successfuly!!"))
    .catch(err => console.error("Failed while running seed."))
}

export const users =
  [
    {
      firstName: 'User1',
      lastName: 'Swar1',
      address: [
        {
          street: 'Street 1',
          city: 'City 1',
          state: 'State 1',
          country: 'country 1',
        }
      ],
      email: 'abc1@gmail.com',
      img: '',
      phone: 9886731992
    },
    {
      firstName: 'User2',
      lastName: 'Swar2',
      address: [
        {
          street: 'Street 2',
          city: 'City 2',
          state: 'State 2',
          country: 'country 2',
        }
      ],
      email: 'abc2@gmail.com',
      img: '',
      phone: 9886732992
    },
    {
      firstName: 'User3',
      lastName: 'Swar3',
      address: [
        {
          street: 'Street 3',
          city: 'City 3',
          state: 'State 3',
          country: 'country 3',
        }
      ],
      email: 'abc3@gmail.com',
      img: '',
      phone: 9886733992
    },
    {
      firstName: 'User4',
      lastName: 'Swar4',
      address: [
        {
          street: 'Street 4',
          city: 'City 4',
          state: 'State 4',
          country: 'country 4',
        }
      ],
      email: 'abc4@gmail.com',
      img: '',
      phone: 9886734992
    },
    {
      firstName: 'User5',
      lastName: 'Swar5',
      address: [
        {
          street: 'Street 5',
          city: 'City 5',
          state: 'State 5',
          country: 'country 5',
        }
      ],
      email: 'abc5@gmail.com',
      img: '',
      phone: 9886735992
    },
  ]
