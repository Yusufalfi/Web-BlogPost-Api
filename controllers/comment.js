const {File, Post, Comment} = require("../models")


const addComment = async (req,res,next) => {
    try {

        const {text, file} = req.body
        const {_id} = req.user
        const {postId} = req.params
        console.log("postId" + " " + postId)

        if(file) {
            const isFileExist = await File.findById(file);
            if(!isFileExist) {
                res.code = 404;
                throw new Error("File Not Found")
            }
        }
        
            const newComment = new Comment({
                text,
                post: postId,
                updatedBy: _id
            });

            const saveComment = await newComment.save();
            // console.log("savesComment" + saveComment)

             // find Post
            const PostExist = await Post.findById(postId);
            console.log("post Found" + " " + PostExist)
            if(!PostExist) {
                res.code = 404;
                throw new Error("post Not Found")
            }

            if(!Array.isArray(PostExist.comment)) {
            console.error('comment field is not an array', PostExist.comment);
            throw new Error("field not array")
            }

            PostExist.comment.push(saveComment._id);
            await PostExist.save();
        
    
       
        res.status(201).json({
            code: 200,
            status: true,
            message: "Comment Added Successfully"
        })

    } catch(error) {
        next(error)
    }
}


const updateComment = async (req,res,next) => {
    try {
        const {text, file, post} = req.body
        const {id} = req.params;
        const {_id} = req.user;

        if(file) {
            const isFileExist = await File.findById(file);
            if(!isFileExist) {
                res.code = 404;
                throw new Error("File Not Found")
            }
        }
   
        if(post) {
            const isPostExist = await Post.findById(post);
            if(!isPostExist) {
                res.code = 404;
                throw new Error("post Not Found")
            }
        }

        const comments = await Comment.findById(id);
        if(!comments) {
            res.code = 404;
            throw new Error("Comments Not Found")
        }

        comments.text = text ? text : comments.text;
        comments.file = file;
        comments.post = post;
        // comments.category = category ? category : comments.category;
        comments.updatedBy = _id;

        await comments.save();
        res.status(200).json({
            code: 200,
            status: true,
            message: "Comments Updated Successfully",
            data: {
               comments
            }
        })

    } catch (error) {
        next(error)
    }
}

const deleteComment = async (req,res,next) => {
    try {
        const {id} = req.params;

        const comment = await Comment.findById(id);
        if(!comment) {
            res.code = 404;
            throw Error("Comment Not Found")
        }

        await Comment.findByIdAndDelete(id);
        res.status(200).json({
            code: 200,
            status: true,
            message: "Comment Deleted Successfully"
        })

    } catch (error) {
        next(error)
    }
}


const getComment = async (req,res,next) => {
    try {
        const {page, size,q, post} = req.query;
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

        if(post){
            query = {...query, post}
        }
        console.log(query);

        const total = await Comment.countDocuments(query);
        const pages = Math.ceil(total / sizeNumber);


        const comment = await Comment.find(query)
                               .populate("file").populate("post")
                                .populate("updatedBy","-password -verificationCode -forgotPasswordCode")
                                .populate("post")
                                .sort({updatedBy: -1})
                                .skip((pageNumber -1) * sizeNumber)
                                .limit(sizeNumber);

                res.status(200).json({
                    code: 200,
                    status: true,
                    message: "Get Post list sucessFully",
                    data: {
                        comment,
                        total,
                        pages
                    }
                })
    } catch (error) {
        next(error)
    }
}



// // const getCommentById = async (req, res,next) => {
// //     try {
// //         const {id} = req.params;
// //         const comment = await Comment.findById(id).populate("file").populate("post")
// //         .populate("updatedBy","-password -verificationCode -forgotPasswordCode");
// //         if(!comment) {
// //             code = 404;
// //             status = false;
// //             message = "Post not found";
// //         }
// //         res.status(200).json({
// //             code: 200,
// //             status: true,
// //             message: "get post successFully",
// //             data: {
// //                 comment
// //             }

// //         })
// //     } catch (error) {
// //         next(error)
// //     }
// // }


module.exports = {addComment, updateComment, deleteComment, getComment}