
const {File, Category, Post} = require("../models")

const addPost = async (req,res,next) => {    
    try {
        const {title, desc, file, category} = req.body;
        const {_id} = req.user;
        console.log("_idUser" +" "+ _id)

        if(file) {
            const isFileExist = await File.findById(file);
            if(!isFileExist) {
                res.code = 404;
                throw new Error("File Not Found")
            }
        }

        const isCategoryExist = await Category.findById(category);
        if(!isCategoryExist) { 
            res.code = 404;
            throw new Error("Category Not Found")
        }

        const newPost =  new Post({
            title, 
            desc,
            file,
            category,
            updatedBy: _id
        });

        await newPost.save();

        res.status(201).json({
            code: 201,
            status: true,
            message: "Post Added Successfully",
        })


    } catch (error) {
        next(error);
    }
}

const updatePost = async (req,res, next) => {
    try {
        const {title, desc, file, category} = req.body;
        console.log ("log body" + title, desc, file, category)
      
        console.log({title,desc,file,category})
        const {id} = req.params;
        const {_id} = req.user;

        if(file) {
            const isFileExist = await File.findById(file);
            if(!isFileExist) {
               res.code = 404;
               throw new Error("File Not Found")
            }
        }

        if(category) {
            const isCategoryExist = await Category.findById(category);
            if(!isCategoryExist) {
                res.code = 404;
                throw new Error("Category Not Found")
            }  
        }
        
        const post = await Post.findById(id);
            if(!post) {
                res.code = 404;
                throw new Error("Post Not Found")
            }

        post.title = title ? title : post.title;
        post.desc = desc;
        post.file = file;
        post.category = category ? category : post.category;
        post.updatedBy = _id;

        await post.save();
        res.status(200).json({
            code: 200,
            status: true,
            message: "Post Updated Successfully",
            data: {
               post
            }
        })

    } catch (error) {
        next(error)
    }
}


const deletePost = async (req,res,next) => {
    try {
        const {id} = req.params;

        const post = await Post.findById(id);
        if(!post) {
            res.code = 404;
            throw Error("Post Not Found")
        }

        await Post.findByIdAndDelete(id);
        res.status(200).json({
            code: 200,
            status: true,
            message: "Post Deleted Successfully"
        })


    } catch (error) {
        next(error)
    }
}

const getPost = async (req,res,next) => {
    try {
        const {page, size,q, category} = req.query;
        const pageNumber = parseInt(page) || 1;
        const sizeNumber = parseInt(size) || 10;
        let query = {};

        if(q) {
            const search = new RegExp(q, "i");
            query = {
                $or: [{
                    title: search
                }]
            }
            console.log("query" + query)
        }

        if(category){
            query = {...query, category}
        }
        console.log(query);

        const total = await Post.countDocuments(query);
        const pages = Math.ceil(total / sizeNumber);


        const post = await Post.find(query)
                               .populate("file").populate("category")
                               .populate("updatedBy","-password -verificationCode -forgotPasswordCode")
                                .sort({updatedBy: -1})
                                .skip((pageNumber -1) * sizeNumber)
                                .limit(sizeNumber);

                res.status(200).json({
                    code: 200,
                    status: true,
                    message: "Get Post list sucessFully",
                    data: {
                        post,
                        total,
                        pages
                    }
                })
    } catch (error) {
        next(error)
    }
}

const getpostById = async (req, res,next) => {
    try {
        const {id} = req.params;
        const post = await Post.findById(id)
        .populate("category")
        .populate("comment")
        .populate("file")
        .populate("updatedBy","-password -verificationCode -forgotPasswordCode")
        if(!post) {
            code = 404;
            status = false;
            message = "Post not found";
        }
        res.status(200).json({
            code: 200,
            status: true,
            message: "get post successFully",
            data: {
                post
            }

        })
    } catch (error) {
        next(error)
    }
}
module.exports = {addPost, updatePost, deletePost, getPost, getpostById}
