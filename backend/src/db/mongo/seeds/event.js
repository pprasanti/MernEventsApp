import Event from "../../../db/mongo/models/eventModel.js"

export const seedEventsDb = async () => {
  await Event.deleteMany({})
    .then(data => console.log("Deleted all Events successfully!!"))
    .catch(err => console.error("Failed while Deleting all."))

  await Event.insertMany(events)
    .then(data => console.log("Seed Events successfully!!"))
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
      img: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg',
      phone: 9886731992,
      comments: []
    },
    {
      name: 'Event 4',
      description: 'Event 4 Desc',
      address: 'Address 4',
      website: 'www.xyz4.com',
      priceStarts: 100000,
      img: 'https://cdn.pixabay.com/photo/2013/10/02/23/03/mountains-190055_1280.jpg',
      phone: 9886731992,
      comments: []
    },
    {
      name: 'Event 5',
      description: 'Event 5 Desc',
      address: 'Address 5',
      website: 'www.xyz5.com',
      priceStarts: 100000,
      img: 'https://cdn.pixabay.com/photo/2014/04/14/20/11/pink-324175_1280.jpg',
      phone: 9886731992,
      comments: []
    },
    {
      name: 'Event 6',
      description: 'Event 6 Desc',
      address: 'Address 6',
      website: 'www.xyz6.com',
      priceStarts: 100000,
      img: 'https://cdn.pixabay.com/photo/2013/11/28/10/03/river-219972_1280.jpg',
      phone: 9886731992,
      comments: []
    },
    {
      name: 'Event 3',
      description: 'Event 3 Desc',
      address: 'Address 3',
      website: 'www.xyz3.com',
      priceStarts: 100000,
      img: 'https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072821_1280.jpg',
      phone: 9886731992,
      comments: []
    },
    {
      name: 'Event 8',
      description: 'Event 8 Desc',
      address: 'Address 8',
      website: 'www.xyz8.com',
      priceStarts: 100000,
      img: 'https://cdn.pixabay.com/photo/2015/07/31/06/50/forest-868715_1280.jpg',
      phone: 9886731992,
      comments: []
    },
    {
      name: 'Event 2',
      description: 'Event 2 Desc',
      address: 'Address 2',
      website: 'www.xyz2.com',
      priceStarts: 100000,
      img: 'https://cdn.pixabay.com/photo/2015/06/19/21/24/avenue-815297_1280.jpg',
      phone: 9886731992,
      comments: []
    },
    {
      name: 'Event 10',
      description: 'Event 10 Desc',
      address: 'Address 10',
      website: 'www.xyz10.com',
      priceStarts: 100000,
      img: 'https://cdn.pixabay.com/photo/2014/12/16/22/25/woman-570883_1280.jpg',
      phone: 9886731992,
      comments: []
    },
    {
      name: 'Event 7',
      description: 'Event 7 Desc',
      address: 'Address 7',
      website: 'www.xyz7.com',
      priceStarts: 100000,
      img: 'https://cdn.pixabay.com/photo/2014/04/14/20/11/pink-324175_1280.jpg',
      phone: 9886731992,
      comments: []
    },
    {
      name: 'Event 9',
      description: 'Event 9 Desc',
      address: 'Address 9',
      website: 'www.xyz9.com',
      priceStarts: 100000,
      img: 'https://cdn.pixabay.com/photo/2013/11/28/10/36/road-220058_1280.jpg',
      phone: 9886731992,
      comments: []
    }
  ]
