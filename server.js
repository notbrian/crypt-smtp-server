var mailin = require('mailin');
var nodemailer = require('nodemailer');
var axios = require('axios');

var transporter = nodemailer.createTransport('smtps://nguyen.brian70@gmail.com:lfqbwcwhkhxnghyy@smtp.gmail.com');

mailin.start({
  port: 25,
  disableWebhook: true
});

// any connection

mailin.on('startMessage', function (connection) {

});

// received email

mailin.on('message', function (connection, data, content) {

  let from = data.headers.from;
  let subject = data.headers.subject;
  let html = data.html;
  let recipient = data.headers.to;

  axios.get('https://plsencrypt.me/publications/all').then(function (response1) {

    let owner = response1.data.profiles.find(x => x.email === recipient).owner;

    axios.get('https://plsencrypt.me/publications/users').then(function (response2) {

      let to = response2.data.users.find(x => x._id === owner).emails[0].address;

      var mailOptions = {
          from: '"plsencrypt bot" <noreply@plsencrypt.me>', // sender address
          to: to, // list of receivers
          subject: subject, // Subject line
          html: html // html body
      };

      transporter.sendMail(mailOptions, function(error, info){

        if (error) {

          return console.log(error);

        }

        console.log('Message sent: ' + info.response);

      });

    });

  });

});
