document.getElementById('support-form').addEventListener('submit', function (e) {
  e.preventDefault();

  var name    = document.getElementById('name').value.trim();
  var email   = document.getElementById('email').value.trim();
  var subject = document.getElementById('subject').value.trim();
  var message = document.getElementById('message').value.trim();

  var body =
    'Name: ' + name + '\n' +
    'Email: ' + email + '\n\n' +
    message;

  var mailtoURL =
    'mailto:support@arcaleph.com' +
    '?subject=' + encodeURIComponent(subject) +
    '&body=' + encodeURIComponent(body);

  window.location.href = mailtoURL;
});
