var mailin = require('mailin');
var nodemailer = require('nodemailer');
var axios = require('axios');

// var transporter = nodemailer.createTransport('smtps://nguyen.brian70@gmail.com:lfqbwcwhkhxnghyy@smtp.gmail.com');
var transporter = nodemailer.createTransport();

mailin.start({
  port: 25,
  disableWebhook: true
});

// any connection

mailin.on('startMessage', function (connection) {

});

// received email

mailin.on('message', function (connection, data, content) {

  let from = JSON.stringify(data.headers.from);
  let subject = data.headers.subject;
  let html = data.html;
  let recipient = data.headers.to;
  axios.get('https://plsencrypt.me/publications/all').then(function (response1) {

    // console.log(response1.data.profiles);

    let owner = "";

    for (var i = 0; i < response1.data.profiles.length; i++) {

      if (recipient.indexOf(response1.data.profiles[i].email) > -1) {

        owner = response1.data.profiles[i].owner;

      }

    }

    axios.get('https://plsencrypt.me/publications/users').then(function (response2) {

      // console.log(response2.data.users);

      let to = response2.data.users.find(x => x._id === owner).emails[0].address;

      // console.log(to);
      var mailOptions = {
          from: '"plsencryptme bot" <noreply@plsencrypt.me>', // sender address
          to: to, // list of receivers
          subject: subject, // Subject line
          html: `<h5> this email is originally from: ${from} </h5><br>` + html + "<h5> This email was forwarded by the plsencrypt bot. </h5> <br>" // html body
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
