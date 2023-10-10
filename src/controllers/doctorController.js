import doctorSevice from "../services/doctorService";
let getTopDoctorHome = async (req, res) => {
    let limit = req.query.limit;
    if (!limit) {
        limit = 10;
    }
    try {
        let response = await doctorSevice.getTopDoctorHome(+limit);
        return res.status(200).json(response);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: "Error from server !"
        })
    }
}
let getAllDoctors = async (req, res) => {
    try {
        let doctors = await doctorSevice.getAllDoctors();
        // console.log(doctors);
        return res.status(200).json(doctors);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server !"
        })
    }
}
let postInforDoctor = async (req, res) => {
    try {
        let response = await doctorSevice.saveDetailInforDoctor(req.body);
        console.log(response);
        return res.status(200).json(response);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server !"
        })
    }
}
let getDetailDoctorById = async (req, res) => {
    try {
        let infor = await doctorSevice.getDetailDoctorById(req.query.id)
        return res.status(200).json(infor);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server !"
        })
    }
}
let bulkCreteSchedule = async (req, res) => {
    try {
        let infor = await doctorSevice.bulkCreteSchedule(req.body)
        return res.status(200).json(
            infor
        );
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server !"
        })
    }
}
let getSheduleByDate = async (req, res) => {
    try {
        let infor = await doctorSevice.getSheduleByDate(req.query.doctorId, req.query.date)
        return res.status(200).json(
            infor
        );
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server !"
        })
    }
}
let getExtraInforDoctorById = async (req, res) => {
    try {
        let infor = await doctorSevice.getExtraInforDoctorById(req.query.doctorId)
        return res.status(200).json(
            infor
        );
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server !"
        })
    }
}

let getProfileDoctorById = async (req, res) => {
    try {
        let infor = await doctorSevice.getProfileDoctorById(req.query.doctorId)
        return res.status(200).json(
            infor
        );
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server !"
        })
    }
}
module.exports = {
    getTopDoctorHome: getTopDoctorHome,
    getAllDoctors: getAllDoctors,
    postInforDoctor: postInforDoctor,
    getDetailDoctorById: getDetailDoctorById,
    bulkCreteSchedule: bulkCreteSchedule,
    getSheduleByDate: getSheduleByDate,
    getExtraInforDoctorById: getExtraInforDoctorById,
    getProfileDoctorById: getProfileDoctorById,
}