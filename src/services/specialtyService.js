const db = require("../models");

let createSpecialty = (data) => {
    return new Promise(async (resolve, reject) => {

        try {
            if (!data.name
                || !data.imageBase64
                || !data.decscriptionHTML
                || !data.decscriptionMarkdown
            ) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing required parameter!"
                })
            } else {
                await db.Specialty.create({
                    name: data.name,
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
let getAllSpecialty = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Specialty.findAll({
                // attributes: {
                //     exclude: ['image']
                // },
                // limit: 2,
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

        }

    })
}
module.exports = {
    createSpecialty: createSpecialty,
    getAllSpecialty: getAllSpecialty,
}