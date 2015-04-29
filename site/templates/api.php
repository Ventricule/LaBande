<?php
header('Content-type: application/json; charset=utf-8');

$data = $pages->find('manifestations')->children()->visible();
$json = array();

foreach($data as $article) {
  
  $coordinates;
  $lieu = (string)$article->lieu();
  $emplacement = (string)$article->location();
	$color='FFFFFF';
	if( (string)$article->parcours() ) {
		$parcoursYaml = yaml($article->parcours());
		$parcoursList = array();
		foreach($parcoursYaml as $parcours) {
			$parcoursList[] = $parcours['parcours'];
		}
		$parcoursA = $parcoursList[0];
		$parcoursA = page('parcours')->children()->find($parcoursA);
		if($parcoursA) {
			$color = str_replace('#','',(string)$parcoursA->color());
		}
	}
  if ( $lieu ) {
    $coordinates = (string)$pages->index()->findBy('uid', $lieu)->location();
  } else {
    $coordinates = $emplacement;
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
      "hash" => (string)$article->hash(),
      //"description" => (string)$article->text(),
      "lieu-uid" => $lieu,
      "icon" => array(
				"iconUrl" => "assets/images/marker.php?color=".$color,
				"iconSize"=> [20, 20], // size of the icon
				"iconAnchor"=> [10, 10], // point of the icon which will correspond to marker's location
				"popupAnchor"=> [0, -10], // point from which the popup should open relative to the iconAnchor
				"labelAnchor"=> [10, 0],
				"className"=> "marker"
			)
    )
  );

}

echo json_encode($json);

?>