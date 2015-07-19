<?php if(!defined('KIRBY')) exit ?>

title: Page
pages: parcours
files: false
fields:
	title:
		label: Titre
		type:  text
	description:
		label: Description
		type: text
	color:
		label: Couleur
		type: color
	archivable:
		label: Activer les archives pour cette section ?
		type: checkbox