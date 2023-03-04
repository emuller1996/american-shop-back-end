const { DeliveryAddress, User } = require('../db.js');


const getDeliveryAddressByUser = async (req, res) => {
    const email = req.params.email;


    try {
        const result = await User.findAll({
            include: {
                model: DeliveryAddress
            },
            where: {
                email: email
            }
        });
        console.log(result.DeliveryAddresses);
        return res.status(200).json(result)
    } catch (error) {
        return res.status(404).json({ response: 'getDeliveryAddressByUser()' })
    }


    return res.json({ response: 'getDeliveryAddressByUser()' })

}

const createDeliveryAddress = async (req, res) => {

    const { data } = req.body;




    try {

        const user = await User.findOne({ where: { email: req.body.email } })
        const address = await DeliveryAddress.create(data)
        user.addDeliveryAddress(address)

        return res.status(201).json({ response: 'Se agrego la dirrecion correctamente' })

    } catch (error) {
        return res.status(404).json({ response: error.message })

    }


}

module.exports = {
    getDeliveryAddressByUser,
    createDeliveryAddress
}