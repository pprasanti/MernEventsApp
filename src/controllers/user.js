import UserDTO from '../dto/user.js'
import userService from '../services/user.js'

const userController = {

    seedUsers: async (req, res) => {
        const result = await userService.seedUsers()
        // res.status(200).json(result)
        res.redirect('/users')
    },

    createUser: async (req, res) => {
        const result = await userService.createUser(new UserDTO(req.body))

        // return res.status(200).json(result);
        res.redirect(`/users`)
    },

    newUser: async (req, res) => {
        res.render('user/new', { eid, name })
    },

    updateUser: async (req, res) => {
        const { id } = req.params;
        const userUpd = await userService.updateUser(id, new UserDTO(req.body))
        // return res.status(201).json(userUpd);
        res.redirect('/users');
    },

    getUsers: async (req, res) => {
        const users = await userService.getUsers()
        const {userName = 'Jitendra'} = req.cookies

        res.send(`Welcome ${userName}`)
        // res.status(200).json(users)
        // res.render('user/index', { users })
    },

    showUser: async (req, res) => {
        const { id } = req.params
        const user = await userService.showUser(id)

        // res.status(200).json(user)
        res.render('user/show', { user })
    },

    editUser: async (req, res) => {
        const { id } = req.params
        const user = await userService.showUser(id)

        // res.status(200).json(user)
        res.render('user/edit', { id, user })
    },

    deleteUser: async (req, res) => {
        //get new data from req.body
        const { id } = req.params;
        const result = await userService.deleteUser(id)

        // res.status(200).send("User Deleted!!!")
        res.redirect(`/users`);
    },
}

export default userController 
