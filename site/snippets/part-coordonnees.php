<?php 
$contact = $coord = array();

$website = (string)$entry->website();
if($website) {	$contact['icon-link-1'] = "<a href='$website' target='_blank'>".str_replace('http://','',$website)."&nbsp;</a>";	}

$email = (string)$entry->email();
if($email){		$contact['icon-mail'] = "<a href='mailto:$email' target='_blank' class='hidden'>$email&nbsp;</a>";	}

$phone = (string)$entry->phonenumber();
if($phone){		$contact['icon-phone'] = "<span class='hidden'>$phone&nbsp;</span>";	}

foreach($contact as $icon=>$text) {
	$contact[$icon] = "<span class='$icon foldable'>$text</span>";
}

$coord['contact'] = implode(' ', $contact);

$coord['blank'] = "&nbsp;";

$coord['icon-map'] = (string)$entry->adress();

$coord['icon-bus'] = (string)$entry->transport();

$coord['icon-clock'] = (string)$entry->schedule();

$coord['icon-ticket'] = (string)$entry->price();

$coord = array_filter($coord);
foreach($coord as $icon=>$entry) {
	$coord[$icon] = "<span class='$icon'>$entry</span>";
}
$coord = implode('<br>', $coord);
?>
<h5><?php echo $coord ?></h5>