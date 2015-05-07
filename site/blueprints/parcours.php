<?php if(!defined('KIRBY')) exit ?>

title: Parcours
pages: false
files:
  sortable: true
	fields:
		caption:
			label: Légende
			type: textarea
fields:
	title:
		label: Titre
		type:  text
	begin_date:
		label: Date de début
		type: date
		width:1/4
	end_date:
		label: Date de fin
		type: date
		width:1/4
	color:
		label: Couleur
		type: color
		width:1/4
	text:
		label: Présentation
		type:  textarea