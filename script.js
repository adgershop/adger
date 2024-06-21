function openGmail() {
    var email = "your-email@gmail.com"; // Replace with your email
    var subject = "الموضوع هنا"; // Replace with your subject
    var name = "اسم الشخص"; // Replace with the actual name
    var phoneNumber = "رقم الهاتف"; // Replace with the actual phone number

    var body = "اسم الشخص: " + name + "\nرقم الهاتف: " + phoneNumber + "\n"; // Body text

    // Construct Gmail URL with parameters
    var gmail_url = 'https://mail.google.com/mail/u/0/?view=cm&fs=1&to=' + encodeURIComponent(email) + '&su=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);

    // Open Gmail in a new tab
    window.open(gmail_url, '_blank');
}