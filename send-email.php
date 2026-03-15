<?php
// send-email.php - Direct email sender without third-party services

// Enable error reporting for debugging (disable in production)
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Your email address where messages will be sent
$to_email = "mubasshir.ali@example.com"; // CHANGE THIS TO YOUR EMAIL

// Check if form was submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Honeypot check - if filled, it's a bot
    if (!empty($_POST['website'])) {
        // Silently redirect to success page (bot thinks it worked)
        header("Location: contact.html?status=success");
        exit;
    }
    
    // Get form data and sanitize
    $name = isset($_POST['name']) ? strip_tags(trim($_POST['name'])) : '';
    $email = isset($_POST['email']) ? strip_tags(trim($_POST['email'])) : '';
    $subject = isset($_POST['subject']) ? strip_tags(trim($_POST['subject'])) : 'New Contact Form Message';
    $message = isset($_POST['message']) ? strip_tags(trim($_POST['message'])) : '';
    
    // Default subject if empty
    if (empty($subject)) {
        $subject = "Contact Form Message from " . $name;
    }
    
    // Validate required fields
    $errors = [];
    
    if (empty($name)) {
        $errors[] = "Name is required";
    }
    
    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Valid email is required";
    }
    
    if (empty($message)) {
        $errors[] = "Message is required";
    }
    
    // If there are errors, redirect back with error
    if (!empty($errors)) {
        $error_string = urlencode(implode(", ", $errors));
        header("Location: contact.html?status=error&message=" . $error_string);
        exit;
    }
    
    // Prepare email headers
    $headers = "From: " . $name . " <" . $email . ">\r\n";
    $headers .= "Reply-To: " . $email . "\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    
    // Prepare HTML email body
    $email_body = "
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #3B82F6, #22C55E); color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background: #f9f9f9; }
            .field { margin-bottom: 15px; }
            .field-label { font-weight: bold; color: #3B82F6; }
            .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h2>New Contact Form Message</h2>
            </div>
            <div class='content'>
                <div class='field'>
                    <div class='field-label'>Name:</div>
                    <div>" . htmlspecialchars($name) . "</div>
                </div>
                <div class='field'>
                    <div class='field-label'>Email:</div>
                    <div><a href='mailto:" . htmlspecialchars($email) . "'>" . htmlspecialchars($email) . "</a></div>
                </div>
                <div class='field'>
                    <div class='field-label'>Subject:</div>
                    <div>" . htmlspecialchars($subject) . "</div>
                </div>
                <div class='field'>
                    <div class='field-label'>Message:</div>
                    <div style='white-space: pre-wrap;'>" . htmlspecialchars($message) . "</div>
                </div>
            </div>
            <div class='footer'>
                <p>This email was sent from your portfolio website contact form.</p>
            </div>
        </div>
    </body>
    </html>
    ";
    
    // Send email using PHP's mail() function
    $mail_sent = mail($to_email, $subject, $email_body, $headers);
    
    if ($mail_sent) {
        // Success - redirect to thank you page
        header("Location: contact.html?status=success");
        exit;
    } else {
        // Error - redirect back with error
        $error_message = "Failed to send email. Please try again later.";
        header("Location: contact.html?status=error&message=" . urlencode($error_message));
        exit;
    }
    
} else {
    // If someone tries to access this file directly, redirect to contact page
    header("Location: contact.html");
    exit;
}
?>