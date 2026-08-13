const prisma = require("../config/prisma");


const properties = async  (req, res)  => {

    try {
         const {name ,   address,  total_units} = req.body;
            if (!name || !address || !totalUnits || !orgId) {
            return res.status(400).json({
                success: false,
                message: "name, address, totalUnits and orgId are required"
            });
        }   //if er bracket

        const property = await prisma.property.create({
            data:{
                   name,
                address,
                totalUnits: Number(totalUnits),
                orgId:user.orgId
            }
        });

        return res.status(201).json({
            success: true,
            message: "Property created successfully",
            property
        });






        
    }catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Failed to create property"
        });

    }







}

module.exports = { properties };
