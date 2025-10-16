import User from "../model/userModel.js";
import bcrypt from 'bcrypt'

const userCtrl ={ 
    
    //register user

    register: async (req, res) => {
    try {
        const { name, email, password, confirmPassword } = req.body;
        if (!name || !email || !password || !confirmPassword) {
            return res.status(400).json({ msg: "Please fill in all fields." })
        }
        const emailDB = await User.findOne({ email })


        if (emailDB) {
            return res.status(400).json({ msg: "This email already exists." })
        }
        if (password.length < 6) {
            return res.status(400).json({ msg: "Password must be at least 6 characters." })
        }
        if (password !== confirmPassword) {
            return res.status(400).json({ msg: "Password did not match." })
        }

        const passwordHash = await bcrypt.hash(password, 10)

        const newUser = new User({
            name, email, password: passwordHash
        })
        await newUser.save()
        res.json({ msg: "Register Success!" })
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
},



}

export default userCtrl;