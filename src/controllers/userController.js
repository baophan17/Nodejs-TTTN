import { json } from "body-parser";
import userSevice from "../services/userSevice";
let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: "Missing input parameter!"
        })
    }
    let userData = await userSevice.handleUserLogin(email, password);
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        // user: userData.user ? userData.user : {}
        userData
    })
}
let handleGetAllUsers = async (req, res) => {
    let id = req.query.id;
    //validate
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameter!",
            users: []
        })
    }
    let users = await userSevice.getAllUsers(id);
    return res.status(200).json({
        errCode: 0,
        errMessage: "OK",
        users
    })
}
let handleCreateNewUser = async (req, res) => {
    let message = await userSevice.createNewUser(req.body);
    return res.status(200).json(message);
}
let handleDeleteUser = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameter!"
        })
    }
    let message = await userSevice.deleteUser(req.body.id);
    return res.status(200).json(message);

}
let handleEditUser = async (req, res) => {
    let data = req.body;
    let message = await userSevice.updateUserData(data);
    return res.status(200).json(message)
}
let getAllCode = async (req, res) => {
    try {
        let data = await userSevice.getAllCodeService(req.query.type);
        return res.status(200).json(data)
    } catch (e) {
        console.log('Get all code  error', e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}
module.exports = {
    handleLogin: handleLogin,
    handleGetAllUsers: handleGetAllUsers,
    handleCreateNewUser: handleCreateNewUser,
    handleEditUser: handleEditUser,
    handleDeleteUser: handleDeleteUser,
    getAllCode: getAllCode,
}