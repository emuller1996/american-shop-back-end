import { Op } from "sequelize";
import { User } from "../db.js";

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({});

    return res.json({
      users: users,
    });
  } catch (error) {
    res.status(404).json("Not Found Users");
  }
};

const postUser = async (req, res) => {
  try {
    const user = req.body;
    await User.create(user);
    /* emailNotifications(user.email,"Registration on Tecnoshop 💌",message.registration); */
    res.json("New User created");
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const getUserCheck = async (req, res) => {
  try {
    const { email } = req.params;

    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user) return res.json({ block: null });
    return res.json({ block: user.block });
  } catch (error) {
    res.status(404).json(error.message);
  }
};

const blockUser = async (req, res) => {
  const email = req.params.email;
  const block = req.body.block;

  try {
    const user = await User.update(
      { block },
      {
        where: {
          email,
        },
      }
    );
    if (user[0]) return res.json(block === "true" ? "block" : "unblock");
    return res.json("Not match user");
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const updateUser = async (req, res) => {
  const { email } = req.params;
  const updateData = req.body;
  try {
    const result = await User.update(updateData, {
      where: {
        email: { [Op.eq]: email },
      },
    });
    console.log(result);
    return res
      .status(202)
      .json({ response: "usuario actualizado correctamente" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/* const updateUser = async (req, res)=>{
    const { email } = req.params;
    const { image, ...updateData } = req.body;
    try {
        if(image) {
            let imageUploaded = await uploadImage(image)
            updateData.image  = imageUploaded.secure_url;
        }
        //await fs.unlink(`./src/uploads/${image}`);
        if(client.authStrategy.clientId && updateData.phone) sendMessage(`${updateData.phone}@c.us`, 'Thanks for updating 📝\n *TECNOSHOP*');
        User.update(updateData,{
            where: {
                email
            }
        })
        .then( (data) => res.status(200).json("Updated successfully") )
        .catch( (error) => res.status(400).json({error: error.message}) )
    } catch (error) {
        res.status(400).json({error: error.message})
    }
} */

const getUserByEmail = async (req, res) => {
  const email = req.params.email;
  try {
    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    return res.json(user);
  } catch (error) {
    res.status(404).json(error.message);
  }
};

export  {
  getUsers,
  postUser,
  getUserCheck,
  blockUser,
  getUserByEmail,
  updateUser,
};
