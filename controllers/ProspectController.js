const Prospect = require('../models/prospect');
const Client = require('../models/client');
const nodemailer = require('nodemailer');
const db = require('../db');

const getAll = (req, res) => {

    
    console.log("prospect get all");

    let prospectArray =  [];

    //res.send("hello")
    Prospect.getAll((err, results) => {
    
        if (err) {
            res.status(500).send(err);
            return;
        } 

        var prospects = ["04567834" , "06346719"]

        for(i=0 ; i < prospects.length ; i++){

            Client.findByCin(prospects[i],(err,result)=>{
                if(!err){
                prospectArray.push(result[0])  
                console.log(prospectArray); 
            }

            })
        }

        res.send(prospectArray)
        
    });
};


const getOne = (req, res) => {
    cin = req.params['cin'];
    res.json(getClientInfo(cin));
}

const getClientInfo = (req,res)=>{

    cin = req.params['cin'];

    Client.findByCin(cin , (err,response)=>{
        console.log(response);
        res.json(response)    
    })
}


const getAllClientDetails = (clientsCinList)=>{

    clientsData = [];

    clientsCinList.forEach((clientCin)=>{

        Client.findByCin(clientCin,(err,response)=>{
            clientsData.push(response);
            })
            })
            console.log(clientsData);
            return clientsData;
            }



const createProspect = (req, res) => {
    const { firstname, lastname, email, adress, cin } = req.body;
    

    // Vérification si le client existe déjà dans la banque
    Client.findByEmail(email, (err, results) => {
        if (err) {
            res.status(500).send(err);
            return;
        }

        if (results.length > 0) {
            // Le client existe déjà dans la banque
            res.status(400).json({ success: false, message: 'Client already exists in the bank.' });
        } else {
            // Le client n'existe pas, on peut l'ajouter comme prospect
            Prospect.create({ cin }, (err, results) => {
                if (err) {
                    res.status(500).send(err);
                    return;
                }
                res.json({ success: true, id: results.insertId });
                
                // Envoyer un email après la création du prospect
                sendEmail(email, 'pending', 'thanks for sumbitting Your application is under review.');
            });
        }
    });
};



const adminCheck = (req, res) => {
    const { id, status, reason } = req.body;
    Prospect.updateStatus(id, status, reason, (err, results) => {
        if (err) {
            res.status(500).send(err);
            return;
        }

        Prospect.findById(id, (err, results) => {
            if (err) {
                res.status(500).send(err);
                return;
            }
            if (results.length > 0) {
                const prospect = results[0];
                sendEmail(prospect.email, status, reason);
                res.json({ success: true });
            } else {
                res.status(404).send('Prospect not found');
            }
        });
    });
};

const sendEmail = (to, status, reason) => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'fatmabenyezza17@gmail.com',
            pass: 'qqaa fldd lbqv vcf'
        }
    });

    const subject = status === 'approved' ? 'Your application is approved' : 'Your application is declined';
    const text = status === 'approved' ? 'Congratulations! Your application has been approved.' : `Sorry, your application was declined. Reason: ${reason}`;
    
    // Définir le nom complet du prospect
    const prospectName = `${firstname} ${lastname}`;
                
    // Envoyer un email après la création du prospect
    sendEmailToProspect(email, prospectName);
    const mailOptions = {
        from: 'fatmabenyezza17@gmail.com',
        to:'benyezzafatma06@gmail.com' ,
         subject: 'Bienvenue chez notre plateforme de gestion bancaire en ligne',
         text: `Bonjour ${prospectName},\n\nBienvenue chez notre plateforme de gestion bancaire en ligne. Nous sommes ravis de vous compter parmi nos prospects.\n\nCordialement,\nVotre équipe de gestion bancaire`

         
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent to:', to);
            console.log('Subject:', subject);
            console.log('Message:', text);
            console.log('Email sent:', info.response);
        }
    });
};
const getProspectsWithCin = (req, res) => {
    db.query('SELECT cin FROM prospects', (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(results);
        }
    });
};

module.exports = {
    createProspect,
    adminCheck,getProspectsWithCin,
    getAll,
    getClientInfo,
    getOne
};
