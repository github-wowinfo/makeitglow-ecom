<?php

	$errors = array();

	// Check if name has been entered
	if (!isset($_POST['name'])) {
		$errors['name'] = 'Please enter your name';
	}

	// Check if email has been entered and is valid
	if (!isset($_POST['email']) || !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
		$errors['email'] = 'Please enter a valid email address';
	}
        
        // Check if phone has been entered and is valid
	if (!isset($_POST['phone'])) {
		$errors['phone'] = 'Please enter your phone number';
	}
        
        // Check if city has been entered and is valid
	if (!isset($_POST['city'])) {
		$errors['city'] = 'Please enter your city name';
	}
        
        // Check if phone has been entered and is valid
	if (!isset($_POST['company'])) {
		$errors['company'] = 'Please enter your company name';
	}

	//Check if message has been entered
	if (!isset($_POST['message'])) {
		$errors['message'] = 'Please enter your message';
	}

	$errorOutput = '';

	if(!empty($errors)){

		$errorOutput .= '<div class="alert alert-danger alert-dismissible" role="alert">';
 		$errorOutput .= '<button type="button" class="close mt-10" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>';

		$errorOutput  .= '<ul>';

		foreach ($errors as $key => $value) {
			$errorOutput .= '<li>'.$value.'</li>';
		}

		$errorOutput .= '</ul>';
		$errorOutput .= '</div>';

		echo $errorOutput;
		die();
	}

	$name = $_POST['name'];
        $phone = $_POST['phone'];
        $company = $_POST['company'];
        $city = $_POST['city'];
	$email = $_POST['email'];
	$message = $_POST['message'];
	$from = $email;
	$to = 'help@makeitglow.ae';  // please change this email id
	$subject = 'Contact Form : Make it Glow - Website enquiry';

	$body = "From: $name\n Phone: $phone\n Company: $company\n City: $city\n E-Mail: $email\n Message:\n $message";

	$headers = "From: ".$from;

	//send the email
	$result = '';
	if (mail ($to, $subject, $body, $headers)) {
		$result .= '<div class="alert alert-success alert-dismissible" role="alert">';
 		$result .= '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
		$result .= 'Thank You! One of our business representatives will soon speak to you.';
		$result .= '</div>';

		echo $result;
		die();
	}

	$result = '';
	$result .= '<div class="alert alert-danger alert-dismissible" role="alert">';
	$result .= '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
	$result .= 'Something bad happend during sending this message. Please try again later';
	$result .= '</div>';

	echo $result;
