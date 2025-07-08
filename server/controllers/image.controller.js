import ImageModel from "../models/img.schema.js";

export const uploadImage = async function (req, res) {
    try {
        const { url, name, size } = req.body;
        const userId = req.user.id;
        console.log("userid from the uploadimage = ", userId);
        if (!url) return res.status(400).json({ message: "Image URL is required" });

        const image = await ImageModel.create({
            user: userId,
            url,
            name,
            size,
        });

        return res.status(201).json({ success: true, image });
    } catch (error) {
        console.error("Error uploading image:", error);
        return res.status(500).json({ success: false, message: "Server Error" });
    }
};
export const getUserImages = async function (req, res) {
    try {
        const userId = req.user.id;

        const images = await ImageModel.find({ user: userId }).sort({ createdAt: -1 });

        return res.status(200).json({ success: true, images });
    } catch (error) {
        console.error("Error fetching images:", error);
        return res.status(500).json({ success: false, message: "Server Error" });
    }
};
export const getSingleImage = async function (req, res) {
    try {
        const { id } = req.params;
        console.log("id = ",id);
        if (!id) {
            return res.status(404).json({ success: false, msg: "sorry can't find the id" });
        }
        const image=await ImageModel.findById(id);
        if(!image){
            return res.status(404).json({success:false,msg:"sorry no content found!"});
        }
        return res.status(200).json({image});
    } catch (e) {
        console.log("err from the catch = ",e.message);
        return res.status(500).json({msg:e.message})
    }
}

