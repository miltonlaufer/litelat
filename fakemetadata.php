<?php
// From: https://medium.com/@zoran.perin/vuejs-and-facebook-share-quick-and-dirty-ca0cbc1554fb

$path = filter_var($_REQUEST['path'], FILTER_SANITIZE_STRING);

if (!$path) {
  $path = 'splash';
}

$metadata = json_decode(file_get_contents('src/data/metadata/metadata.json'), true);
$obra = null;
$sanitizedPath = $path;

if (strstr($path, 'obra-')) {
  $tmpArray = explode('-', $path);
  $sanitizedPath = $tmpArray[0];
  $id = $tmpArray[1];
  $json = file_get_contents('src/data/obras.json');
  $obras = json_decode($json, true);
  $obra = $obras['obras'][$id];
}

$data = [
  'meta' => $metadata['metadata'][$sanitizedPath],
  'obra' => $obra,
  'path' => $path
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
  $obra = $data['obra'];

  if ($obra) {
    $title = $obra['titulo'] . ' | ' . $title;
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

  if ($obra) {
    $html .= "<h1>{$obra['titulo']}</h1>" . PHP_EOL;
    $html .= "<h2>Autor: {$obra['autor']} ({$obra['nombre']}  {$obra['apellido']}) </h2>" . PHP_EOL;
    $html .= "<p>{$obra['comentario']}</p>" . PHP_EOL;
    $html .= '<p>Idiomas: ' . implode(", ", $obra['idioma']) . '</p>' . PHP_EOL;
    $html .= '<p>Tecnologías: ' . implode(", ", $obra['tecnologias']) . '</p>' . PHP_EOL;
    $html .= '<p>Categorías: ' . implode(", ", $obra['categorias']) . '</p>' . PHP_EOL;
    $html .= "<p>{$obra['ano']}</p>" . PHP_EOL;

    if (is_array($obra['enlace'])) {
      foreach ($obra['enlace'] as $link) {
        $html .= "<a href='{$link['link']}'>{$link['text']}</a>" . PHP_EOL;
      }
    }

    if ($obra['descargable']) {
      $html .= "Descargable: <a href='/dist/descargables/{$obra['descargable']}'>{$obra['descargable']}</a>" . PHP_EOL;
    }
  }

  $html .= '</body>' . PHP_EOL;
  $html .= '</html>';

  echo $html;
}
