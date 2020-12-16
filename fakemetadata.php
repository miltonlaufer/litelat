<?php
// From: https://medium.com/@zoran.perin/vuejs-and-facebook-share-quick-and-dirty-ca0cbc1554fb

$path = filter_var($_REQUEST['path'], FILTER_SANITIZE_STRING);

if (!$path) {
  $path = 'splash';
}

$metadata = json_decode(file_get_contents('src/data/metadata/metadata.json'), true);
$dataInterior = null;
$sanitizedPath = $path;

if (strstr($path, '-')) {
  $json = file_get_contents('src/data/obras.json');
  $obras = json_decode($json, true);
  $tmpArray = explode('-', $path);
  $sanitizedPath = $tmpArray[0];
  $id = $tmpArray[1];

  if (strstr($path, 'obra')) {
    $dataInterior = $obras['obras'][$id];
  } elseif (strstr($path, 'autor')) {
    foreach ($obras['obras'] as $obra) {
      if (str_replace([' ', '.'], '_', "{$obra['nombre']} {$obra['apellido']}") === $id) {
        $dataInterior = $obra;
        break;
      }
    }
  }
}

$data = [
  'meta'     => $metadata['metadata'][$sanitizedPath],
  'internal' => $dataInterior,
  'path'     => $path,
  'type'     => $sanitizedPath
];

/*
echo $path . "\n";
var_dump($metadata);
echo $sanitizedPath . "\n";
var_dump($metadata['metadata'][$sanitizedPath]);
*/

makePage($data);

/**
 * Creates the page
 *
 * @param $data
 */
function makePage($data)
{
  $title = $data['meta']['title'] . ' | Antología Litelat #1';
  $interior = $data['internal'];

  if ($interior) {
    $title = ($data['type'] === 'obra' ? $interior['titulo'] : "{$interior['nombre']} {$interior['apellido']}") .
      ' | ' . $title;
  }

  $html = '<!doctype html>' . PHP_EOL;
  $html .= '<html lang="es">' . PHP_EOL;
  $html .= '<head>' . PHP_EOL;
  $html .= "<title>$title</title>" . PHP_EOL;
  $html .= '<meta property="og:url"” content="http://' . $_SERVER['SERVER_NAME'] . '/' . $_REQUEST['path'] . '" />' . PHP_EOL;
  $html .= '<meta property="og:title" content="' . $title . '"/>' . PHP_EOL;
  $html .= '<meta property="og:description" content="' . $data['meta']['content'] . '" />' . PHP_EOL;
  $html .= '<meta property="og:image" content="' . (!empty($obra['captura_grande']) ? '/dist/images/obras/' . $obra['captura_grande'] : '/dist/images/social.png') . '"/>' . PHP_EOL;
  $html .= '<meta property="og:type" content="website" />' . PHP_EOL;
  $html .= '<meta property="og:site_name" content="Antología Litelat #1" />' . PHP_EOL;
  $html .= '</head>' . PHP_EOL;
  $html .= '<body>' . PHP_EOL;

  if ($interior) {
    if ($data['type'] === 'obra') {
      $html .= "<h1>{$interior['titulo']}</h1>" . PHP_EOL;
      $html .= "<h2>Autor: {$interior['autor']} ({$interior['nombre']}  {$interior['apellido']}) </h2>" . PHP_EOL;
      $html .= "<p>{$interior['comentario']}</p>" . PHP_EOL;
      $html .= '<p>Idiomas: ' . implode(", ", $interior['idioma']) . '</p>' . PHP_EOL;
      $html .= '<p>Tecnologías: ' . implode(", ", $interior['tecnologias']) . '</p>' . PHP_EOL;
      $html .= '<p>Categorías: ' . implode(", ", $interior['categorias']) . '</p>' . PHP_EOL;
      $html .= "<p>{$interior['ano']}</p>" . PHP_EOL;

      if (is_array($interior['enlace'])) {
        foreach ($interior['enlace'] as $link) {
          $html .= "<a href='{$link['link']}'>{$link['text']}</a>" . PHP_EOL;
        }
      }

      if ($interior['descargable']) {
        $html .= "Descargable: <a href='/dist/descargables/{$interior['descargable']}'>{$interior['descargable']}</a>" . PHP_EOL;
      }
    } else {
      $html .= "<h1>Autor: {$interior['autor']} ({$interior['nombre']}  {$interior['apellido']}) </h1>" . PHP_EOL;
      $html .= "<p>{$interior['biografia']}</p>" . PHP_EOL;
    }
  }

  $html .= '</body>' . PHP_EOL;
  $html .= '</html>';

  echo $html;
}
