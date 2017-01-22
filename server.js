var mailin = require('mailin');
var nodemailer = require('nodemailer');
var axios = require('axios');

var transporter = nodemailer.createTransport('smtps://plsencryptme@gmail.com:npgqmpemotthwlmk@smtp.gmail.com');
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
  from = from.replace("<","&lt;")
  from = from.replace(">", "&gt;")
  let subject = data.headers.subject;
  let html = data.html;
  let recipient = data.headers.to;

  axios.get('https://plsencrypt.me/publications/all').then(function (response1) {

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
          from: '"Crypt Forwarding Bot" <noreply@plsencrypt.me>', // sender address
          to: to, // list of receivers
          subject: subject, // Subject line
          html: `<p> this email is originally from: ${from} and was sent to ${recipient} </p> <hr> <br>` + html + " <hr> <br> <h5> This email was forwarded by the Crypt Bot. </h5>" // html body
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
