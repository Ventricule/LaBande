<?php if(!defined('KIRBY')) exit ?>

title: Page
pages: default
files: false
fields:
	title:
		label: Titre
		type:  text
	color:
		label: Couleur
		type: color
	archivable:
		label: Activer les archives pour cette section ?
		type: checkbox