const db = require("../models");

let createClinic = (data) => {
    return new Promise(async (resolve, reject) => {

        try {
            if (!data.name || !data.address
                || !data.imageBase64
                || !data.decscriptionHTML
                || !data.decscriptionMarkdown
            ) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing required parameter!"
                })
            } else {
                await db.Clinic.create({
                    name: data.name,
                    address: data.address,
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
module.exports = {
    createClinic: createClinic
}