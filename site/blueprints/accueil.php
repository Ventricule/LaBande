<?php if(!defined('KIRBY')) exit ?>

title: Page
pages: accueil
files: false
fields:
  title:
    label: Titre
    type:  text
  text:
    label: Texte
    type:  textarea
  number:
    label: Nombre d'événements à afficher
    type: number
    width: 1/2