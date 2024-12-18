import Categories from "../../Models/categoriesModels.js";

// Add a new category
export const addCategoryController = async (req, res) => {
    try {
        const { name, isTechnical } = req.body;

        if (!name || isTechnical === undefined) {
            return res.status(400).json({ success:false, msg: "Name and isTechnical are required fields." });
        }

        const newCategory = new Categories({ name, isTechnical });
        await newCategory.save();

        res.status(201).json({ success:true, msg: "Category added successfully.", category: newCategory });
    } catch (error) {
        res.status(500).json({ success:false ,msg: "Server error.", error: error.message });
    }
};

// Delete a category
export const deleteCategoryController = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedCategory = await Categories.findByIdAndDelete(id);

        if (!deletedCategory) {
            return res.status(404).json({ success:false ,msg: "Category not found." });
        }

        res.status(200).json({ success:true ,msg: "Category deleted successfully." });
    } catch (error) {
        res.status(500).json({ success:false ,msg: "Server error.", error: error.message });
    }
};

// Update a category
export const updateCategoryController = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, isTechnical } = req.body;

        if (!name || isTechnical === undefined) {
            return res.status(400).json({ success:false ,msg: "Name and isTechnical are required fields." });
        }

        const updatedCategory = await Categories.findByIdAndUpdate(
            id,
            { name, isTechnical },
            { new: true, runValidators: true }
        );

        if (!updatedCategory) {
            return res.status(404).json({ success:false ,msg: "Category not found." });
        }

        res.status(200).json({ success:true ,msg: "Category updated successfully.", category: updatedCategory });
    } catch (error) {
        res.status(500).json({ success:false ,msg: "Server error.", error: error.message });
    }
};

// Get all categories
export const getAllCategoriesController = async (req, res) => {
    try {
        const categories = await Categories.find();
        res.status(200).json({success:true,categories});
    } catch (error) {
        res.status(500).json({ success:false ,msg: "Server error.", error: error.message });
    }
};

// Get technical categories
export const getTechCategoriesController = async (req, res) => {
    try {
        const techCategories = await Categories.find({ isTechnical: true });
        res.status(200).json({success:true,techCategories});
    } catch (error) {
        res.status(500).json({ success:false,msg: "Server error.", error: error.message });
    }
};

// Get non-technical categories
export const getNonTechCategoriesController = async (req, res) => {
    try {
        const nonTechCategories = await Categories.find({ isTechnical: false });
        res.status(200).json({success:true ,nonTechCategories});
    } catch (error) {
        res.status(500).json({ success:false ,msg: "Server error.", error: error.message });
    }
};
