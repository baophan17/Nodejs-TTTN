const db = require("../models");
let createHandbook = (data) => {
    return new Promise(async (resolve, reject) => {

        try {
            if (!data.title
                || !data.imageBase64
                || !data.decscriptionHTML
                || !data.decscriptionMarkdown
            ) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing required parameter!"
                })
            } else {
                await db.Handbook.create({
                    title: data.title,
                    image: data.imageBase64,
                    decscriptionHTML: data.decscriptionHTML,
                    decscriptionMarkdown: data.decscriptionMarkdown
                })
                resolve({
                    errCode: 0,
                    errMessage: "Ok"
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}
let getAllHandbook = () => {
    return new Promise(async (resolve, rejct) => {
        try {
            let data = await db.Handbook.findAll({

            });
            if (data && data.length > 0) {
                data.map(item => {
                    item.image = new Buffer(item.image, 'base64').toString('binary')
                    return item;
                })
            }
            resolve({
                errCode: 0,
                errMessage: "Ok",
                data
            })
        } catch (e) {
            rejct(e)
        }
    })
}
let getDetailHandbookById = (inputId) => {
    return new Promise(async (resolve, rejct) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing required parameter!"
                })
            } else {
                let data = await db.Handbook.findOne({
                    where: {
                        id: inputId
                    },

                    // attributes: ['title', 'image', 'decscriptionHTML', 'decscriptionMarkdown', 'createdAt', 'updatedAt']

                })
                if (data && data.image) {
                    data.image = new Buffer(data.image, 'base64').toString('binary')

                }
                resolve({
                    errCode: 0,
                    errMessage: "Ok",
                    data
                })
            }

        } catch (e) {
            rejct(e)
        }
    })
}
module.exports = {
    createHandbook: createHandbook,
    getAllHandbook: getAllHandbook,
    getDetailHandbookById: getDetailHandbookById
}