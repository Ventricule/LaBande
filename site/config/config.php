<?php

/*

---------------------------------------
License Setup
---------------------------------------

Please add your license key, which you've received
via email after purchasing Kirby on http://getkirby.com/buy

It is not permitted to run a public website without a
valid license key. Please read the End User License Agreement
for more information: http://getkirby.com/license

*/

c::set('license', 'put your license key here');
c::set('debug', true);

setlocale(LC_TIME, 'fr_FR', 'fra');

/*

---------------------------------------
Kirby Configuration
---------------------------------------

By default you don't have to configure anything to
make Kirby work. For more fine-grained configuration
of the system, please check out http://getkirby.com/docs/advanced/options

*/

/*

---------------------------------------
AJAX
---------------------------------------

*/

c::set('routes', array(
	array(
		'pattern' => 'ajax/(:all)',
		'action'  => function($uri) {
			header('X-Robots-Tag: noindex, follow');
			snippet('item', array('entry' => page($uri)));
		}
	)
));