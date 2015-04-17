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
  location:
    label: Emplacement
    type: geolocation