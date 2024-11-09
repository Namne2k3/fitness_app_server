import Blog from "../models/blog.model.js";
import Media from "../models/media.model.js"

export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find()
            .populate('author')
            .populate('medias')

        res.status(200).json({ message: 'Get All Blogs Successfully', data: blogs });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
}

export const createFeed = async (req, res) => {
    try {
        const body = req.body
        const newBlog = new Blog(body)
        const savedBlog = await newBlog.save()

        res.status(200).json({ message: 'Created Blog Successfully', data: savedBlog });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
}

export const uploadMedia = async (req, res) => {
    const URL = "https://w2fw01lr-3000.asse.devtunnels.ms"
    try {

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: 'No files uploaded' });
        }

        const fileDetails = req.files.map(file => ({
            fileUrl: `${URL}/uploads/${file.filename}`,
            fileName: file.filename.split('.')[0],
            fileType: file.mimetype,
            fileSize: file.size,
            type: file.mimetype.startsWith('image/') ? 'image' : 'video',
        }));

        const savedMedias = await Media.insertMany(fileDetails)

        res.status(200).json({ message: 'Upload successfully', data: savedMedias });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
};

export const getBlogById = async (req, res) => {
    try {
        const id = req.params.id
        const foundBlog = await Blog.findById(id)
            .populate('medias')
            .populate('author')

        res.status(200).json({ message: 'Get Detail Blog Successfully', data: foundBlog });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
}

export const updateBlogById = async (req, res) => {
    try {
        const id = req.params.id;
        const feedBody = req.body;


        const updatedBlog = await Blog.findByIdAndUpdate(id, feedBody, { new: true });
        console.log("Check updatedBlog >>> ", updatedBlog);

        if (!updatedBlog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        res.status(200).json({ message: 'Updated Blog Successfully', data: updatedBlog });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
};