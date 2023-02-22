import Event from "../../../models/event.js"

export const seedEvents = async () => {
  await Event.deleteMany({})
    .then(data => console.log("Deleted all Events successfuly!!"))
    .catch(err => console.error("Failed while Deleting all."))

  await Event.insertMany(users)
    .then(data => console.log("Seed Events successfuly!!"))
    .catch(err => console.error("Failed while running seed."))
}

export const events =
  [
    {
      name: 'Event 1',
      description: 'Event 1 Desc',
      address: 'Address 1',
      website: 'www.xyz1.com',
      priceStarts: 100000,
      img: '',
      phone: 9886731992,
      comments: []
    },
    {
      name: 'Event 4',
      description: 'Event 4 Desc',
      address: 'Address 4',
      website: 'www.xyz4.com',
      priceStarts: 100000,
      img: '',
      phone: 9886731992,
      comments: []
    },
    {
      name: 'Event 5',
      description: 'Event 5 Desc',
      address: 'Address 5',
      website: 'www.xyz5.com',
      priceStarts: 100000,
      img: '',
      phone: 9886731992,
      comments: []
    },
    {
      name: 'Event 6',
      description: 'Event 6 Desc',
      address: 'Address 6',
      website: 'www.xyz6.com',
      priceStarts: 100000,
      img: '',
      phone: 9886731992,
      comments: []
    },
    {
      name: 'Event 3',
      description: 'Event 3 Desc',
      address: 'Address 3',
      website: 'www.xyz3.com',
      priceStarts: 100000,
      img: '',
      phone: 9886731992,
      comments: []
    },
    {
      name: 'Event 8',
      description: 'Event 8 Desc',
      address: 'Address 8',
      website: 'www.xyz8.com',
      priceStarts: 100000,
      img: '',
      phone: 9886731992,
      comments: []
    },
    {
      name: 'Event 2',
      description: 'Event 2 Desc',
      address: 'Address 2',
      website: 'www.xyz2.com',
      priceStarts: 100000,
      img: '',
      phone: 9886731992,
      comments: []
    },
    {
      name: 'Event 10',
      description: 'Event 10 Desc',
      address: 'Address 10',
      website: 'www.xyz10.com',
      priceStarts: 100000,
      img: '',
      phone: 9886731992,
      comments: []
    },
    {
      name: 'Event 7',
      description: 'Event 7 Desc',
      address: 'Address 7',
      website: 'www.xyz7.com',
      priceStarts: 100000,
      img: '',
      phone: 9886731992,
      comments: []
    },
    {
      name: 'Event 9',
      description: 'Event 9 Desc',
      address: 'Address 9',
      website: 'www.xyz9.com',
      priceStarts: 100000,
      img: '',
      phone: 9886731992,
      comments: []
    }
  ]
