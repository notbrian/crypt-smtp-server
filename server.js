var mailin = require('mailin');
var nodemailer = require('nodemailer');

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

  console.log(data.headers.from);
  console.log(data.headers.subject);
  console.log(data.html);

  // setup e-mail data with unicode symbols

  var mailOptions = {
      from: '"plsencrypt bot" <noreply@plsencrypt.me>', // sender address
      to: 'arun.kirubarajan@gmail.com', // list of receivers
      subject: data.headers.subject, // Subject line
      html: data.html // html body
  };

  // send mail with defined transport object

  transporter.sendMail(mailOptions, function(error, info){
      if(error){
          return console.log(error);
      }
      console.log('Message sent: ' + info.response);
  });

});
