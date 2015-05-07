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
    label: Afficher les événements qui auront lieu d'ici (x) jours
    type: number
    width: 1/4
