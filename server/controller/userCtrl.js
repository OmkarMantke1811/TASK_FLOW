import User from "../model/userModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';


const userCtrl = {

    //register user

    register: async (req, res) => {
        try {
            const { name, email, password, confirmPassword } = req.body;
            if (!name || !email || !password || !confirmPassword) {
                return res.status(400).json({ msg: "Please fill in all fields." })
            }
            const emailDB = await User.findOne({ email })


            if (emailDB) {
                console.log("This email already exists.")
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

            jwt.sign(
                { id: newUser._id },
                process.env.JWT_SECRET,
                { expiresIn: '1d' },
                (err, token) => {
                    if (err) throw err;
                    console.log('token', token);
                    res.cookie('token', token, {
                        httpOnly: true,
                        secure: false,
                        sameSite: 'lax',
                        maxAge: 24 * 60 * 60 * 1000
                    })
                    res.status(201).json({ msg: "Registration successful", user: { id: newUser._id, name: newUser.name, email: newUser.email } })
            }
             
            )
           
        } catch (error) {
            res.status(500).json({ msg: error.message })
        }
    },




    //get user

}

export default userCtrl;