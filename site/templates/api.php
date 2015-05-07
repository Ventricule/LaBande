<?php
header('Content-type: application/json; charset=utf-8');

$data = $pages->find('manifestations')->children()->visible();
$json = array();

foreach($data as $article) {
  
  $coordinates;
  $lieuUid = (string)$article->lieu();
  $emplacement = (string)$article->location();
	$color='FFFFFF';
	$parcoursList = array();
	if( (string)$article->parcours() ) {
		$parcoursYaml = yaml($article->parcours());
		foreach($parcoursYaml as $parcours) {
			$parcoursList[] = $parcours['parcours'];
		}
		$parcoursA = $parcoursList[0];
		$parcoursA = page('parcours')->children()->find($parcoursA);
		if($parcoursA) {
			$color = str_replace('#','',(string)$parcoursA->color());
		}
	}
  if ( $lieuUid ) {
		$lieu = $pages->index()->findBy('uid', $lieuUid);
    $coordinates = (string)$lieu->location();
		$lieuName = (string)$lieu->title();
  } else {
    $coordinates = $emplacement;
		$lieuName = (string)$article->locationName();
  }

  $json[] = array(
    'type'   => "Feature",
    'geometry' => array(
      'type' => 'Point',
      'coordinates' => array_reverse( explode( ',', $coordinates ) )
    ),
    'properties' => array(
      "title" => (string)$article->title(),
      "uid" => (string)$article->uid(),
      "manifestations" => (string)$article->uid(),
      "hash" => (string)$article->hash(),
			"zoom" => 14,
      "lieux" => $lieuUid,
      "lieuName" => $lieuName,
			"parcours" => $parcoursList,
			"color" => $color,
			"location" => $coordinates,
			"divIcon" => array(
				"labelAnchor"=> [10, 0],
				"className"=> "div-icon",
				"html"=> "<div style='background-color:#".$color.";'></div>"
			)
    )
  );

}

echo json_encode($json);

?>