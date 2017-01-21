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

  axios.get('https://plsencrypt.me/publications/all').then(function (response1) {

    console.log(response1.data.profiles);

    axios.get('https://plsencrypt.me/publications/users').then(function (response2) {

      console.log(response2.data.users);

    });

  });

  let from = data.headers.from;
  let subject = data.headers.subject;
  let html = data.html;
  let to = data.headers.to;

  console.log(to);

  // setup e-mail data with unicode symbols

  var mailOptions = {
      from: '"plsencrypt bot" <noreply@plsencrypt.me>', // sender address
      to: to, // list of receivers
      subject: subject, // Subject line
      html: html // html body
  };

  // send mail with defined transport object

  transporter.sendMail(mailOptions, function(error, info){
    if(error){
      return console.log(error);
    }
    console.log('Message sent: ' + info.response);
  });

});
