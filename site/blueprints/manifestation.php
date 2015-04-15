<?php if(!defined('KIRBY')) exit ?>

title: Manifestation
pages: false
files:
  sortable: true
fields:
  title:
    label: Title
    type:  text
  year:
    label: Year
    type:  text
  text:
    label: Text
    type:  textarea
  tags:
    label: Tags
    type:  tags
  lieu:
    label: Nom du lieu
    type:  text
  location:
    label: Coordonnées géographique
    type: geolocation