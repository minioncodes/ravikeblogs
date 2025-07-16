import ImageModel from "../models/img.schema.js";
import multer from "multer";
import { cloudinary, storage } from "../config/cloudinary.js";
import express from "express";

const upload = multer({ storage });
const Express = express();
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
        console.log("id = ", id);
        if (!id) {
            return res.status(404).json({ success: false, msg: "sorry can't find the id" });
        }
        const image = await ImageModel.findById(id);
        if (!image) {
            return res.status(404).json({ success: false, msg: "sorry no content found!" });
        }
        return res.status(200).json({ image });
    } catch (e) {
        console.log("err from the catch = ", e.message);
        return res.status(500).json({ msg: e.message })
    }
}

export const uploadImagesFromPc = async (req, res) => {
    console.log("hello from the upload images from pc");
    try {
        const user = req.user.id
        console.log("user from the upload images from pc = ", user);
        let { customNames, category, filters } = req.body;
        const files = req.files;
        customNames = Array.isArray(customNames) ? customNames : [customNames];
        const parsedFilters = typeof filters === "string"
            ? filters.split(",").map(f => f.trim())
            : [];
        if (!files || files.length === 0) {
            return res.status(400).json({ message: "No files uploaded." });
        }
        const uploadResult = files.map((file, index) => ({
            url: file.path,
            user: user,
            name: customNames[index] || file.originalname,
            size: file.size,
            category: category[index] || "",
            filters: parsedFilters,
        }));
        await ImageModel.insertMany(uploadResult);
        console.log("uploaded result = ", uploadResult);
        return res.status(201).json({ success: true, images: uploadResult });
    } catch (err) {
        console.error("Error uploading images:", err);
        return res.status(500).json({ success: false, message: err.message });
    }
};
export const getImagesByCategory = async (req, res) => {
    try {
        const userId = req.user.id;
        const { category } = req.query;

        const filter = {
            user: userId,
            ...(category && { category }), 
        };
        const images = await ImageModel.find(filter).sort({ createdAt: -1 });

        return res.status(200).json({ success: true, images });
    } catch (err) {
        console.error("Error fetching images by category:", err);
        return res.status(500).json({ success: false, message: err.message });
    }
};





