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
		label: Title
		type:  text
		begin_date:
			label: Date de début
			type: date
		end_date:
			label: Date de fin
			type: date
		color:
			label: Couleur
			type: color
		text:
			label: Présentation
			type:  textarea