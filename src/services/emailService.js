require('dotenv').config();
import nodemailer from 'nodemailer';

let sendSimpleEmail = async (dataSend) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            // TODO: replace `user` and `pass` values from <https://forwardemail.net>
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORD
        }
    });

    const info = await transporter.sendMail({
        from: '"Phan Quốc Bảo👻" <baop99720@.com>', // sender address
        to: dataSend.receiverEmail, // list of receivers
        subject: "Thông tin đặt lịch khám bệnh", // Subject line
        html: getBodyHTMLEmail(dataSend)
    });

}
let getBodyHTMLEmail = (dataSend) => {
    let result = '';
    if (dataSend.language === 'vi') {
        result =
            `
            <h1>TEST EMAIL</h1>
            <h3>Xin Chào ${dataSend.patientName}</h3>
            <p>Bạn nhân được email này vì đã đặt lịch khám bệnh online trên web </p>
            <p>Thông tin đặt lịch khám bệnh:</p>
            <div><b>Thời gian: ${dataSend.time}</b></div>
            <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>
            <p>
            Nếu các thông tin trên là đúng sự thật, vui lòng nhấn đường link bên dưới 
            để xác nhận đặt lịch khám bệnh.
            </p>
            <div>
            <a href=${dataSend.redirectLink} target="_blank">Click here</a>
            </div>
            <div>Xin chân thành cảm ơn !</div>
        `
    }
    if (dataSend.language === 'en') {
        result =
            `
            <h1>TEST EMAIL</h1>
            <h3>Dear ${dataSend.patientName}</h3>
            <p>You received this email because you made an online medical appointment on the website </p>
            <p>Information for scheduling medical examination:</p>
            <div><b>Time: ${dataSend.time}</b></div>
            <div><b>Doctor: ${dataSend.doctorName}</b></div>
            <p>
            If the above information is true, please click the link below to confirm your medical appointment.
            </p>
            <div>
            <a href=${dataSend.redirectLink} target="_blank">Click here</a>
            </div>
            <div>Sincerely thank !</div>
        `
    }
    return result;
}




module.exports = {
    sendSimpleEmail: sendSimpleEmail
}