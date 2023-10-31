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
let getAllClinic = () => {
    return new Promise(async (resolve, rejct) => {
        try {
            let data = await db.Clinic.findAll({

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
let getDetailClinicById = (inputId) => {
    return new Promise(async (resolve, rejct) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing required parameter!"
                })
            } else {
                let data = await db.Clinic.findOne({
                    where: {
                        id: inputId
                    },
                    attributes: ['address', 'name', 'decscriptionHTML', 'decscriptionMarkdown']

                })
                if (data) {
                    let doctorClinic = [];

                    doctorClinic = await db.Doctor_Infor.findAll({
                        where: { clinicId: inputId },
                        attributes: ['doctorId', 'provinceId']
                    })

                    data.doctorClinic = doctorClinic;

                } else data = {}
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
    createClinic: createClinic,
    getAllClinic: getAllClinic,
    getDetailClinicById: getDetailClinicById,
}