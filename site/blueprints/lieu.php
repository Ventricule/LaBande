<?php if(!defined('KIRBY')) exit ?>

title: Page
pages: false
files: true
fields:
  title:
    label: Nom du lieu
    type:  text
  text:
    label: Présentation
    type:  textarea
	website:
		label: Site internet
		type: url
		width: 1/2
	email:
		label: Email
		type: email
		width: 1/4
	phonenumber:
		label: Numéro de téléphone
		type: tel
		width: 1/4
	adress:
		label: Adresse
		type: text
		width: 1/2
	transport:
		label: Transports
		type: text
		width: 1/2
	schedule:
		label: Horaires
		type: text
		width: 1/2
	price:
		label: Tarif (ou Entrée libre)
		type: text
		width: 1/2
	location:
		label: Emplacement
		type: geolocation