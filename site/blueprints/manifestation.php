<?php if(!defined('KIRBY')) exit ?>

title: Manifestation
pages: false
files:
	sortable: true
fields:
	title:
		label: Title
		type:  text
	date:
		label: Date
		type: date
		width: 1/2
	time:
		label: Heure
		type: time
		interval: 15
		width: 1/2
	text:
		label: Text
		type:  textarea
	emplacement:
		label: Géographie
		type: headline
	info:
		label:
		type: info
		text: >
			De préférence, l'emplacement d'une manifestion doit être un lieu préalablement définit dans <a href="#/pages/show/lieux" target="_blank">la liste des lieux</a>. <br> Si ce n'est pas possible car l'emplacement n'est pas un lieu (une rue, une place, une friche...), placez le sur la carte et donnez lui un nom.
	lieu:
		label: Lieu
		type:  select
		default: khiasma
		options: query
		query:
			page: lieux
			fetch: children
	ou:
		label: ou
		type: info
	location:
		label: Emplacement
		type: geolocation
	location-name:
		label: Nom de l'emplacement
		type: text