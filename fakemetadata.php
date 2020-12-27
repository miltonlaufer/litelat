<?php
// From: https://medium.com/@zoran.perin/vuejs-and-facebook-share-quick-and-dirty-ca0cbc1554fb

$path = filter_var($_REQUEST['path'], FILTER_SANITIZE_STRING);

if (!$path) {
  $path = 'splash';
}

$metadata = json_decode(file_get_contents('src/data/metadata/metadata.json'), true);
$dataInterior = null;
$sanitizedPath = $path;

if (strstr($path, '-') || $path === 'obras') {
  $json = file_get_contents('src/data/obras.json');
  $obras = json_decode($json, true);
  $tmpArray = explode('-', $path);
  $sanitizedPath = $tmpArray[0];
  $id = $tmpArray[1];

  if ($sanitizedPath === 'obra') {
    $dataInterior = $obras['obras'][$id];
    $dataInterior['biografia'] = null;
  } elseif ($sanitizedPath === 'autor') {
    foreach ($obras['obras'] as $obra) {
      for ($z = 0; $z < count($obra['nombre']); $z++) {
        if (getAutorId($obra['nombre'][$z], $obra['apellido'][$z]) === $id) {
          $dataInterior['nombre'] = $obra['nombre'][$z];
          $dataInterior['apellido'] = $obra['apellido'][$z];
          $dataInterior['biografia'] = $obra['biografia'][$z];
          $dataInterior['captura_grande'] = $obra['captura_grande'];

          break;
        }
      }
    }
  } elseif ($path === 'obras') {
    $dataInterior = $obras['obras'];
  }
}

$data = [
  'meta'     => $metadata['metadata'][$sanitizedPath],
  'internal' => $dataInterior,
  'path'     => $path,
  'type'     => $sanitizedPath
];

makePage($data);

/**
 * Creates the page
 *
 * @param $data
 */
function makePage($data)
{
  $title = $data['meta']['title'] . ' | Antología litElat #1';
  $interior = $data['internal'];

  if ($interior && $data['path'] !== 'obras') {
    $title = ($data['type'] === 'obra' ? $interior['titulo'] : "{$interior['nombre']} {$interior['apellido']}") .
      ' | ' . $title;
  }

  $content = !empty($interior['biografia']) ? $interior['biografia'] :
    !empty($interior['comentario']) ? $interior['comentario'] : $data['meta']['content'];

  $content = strip_tags($content);

  $html = '<!doctype html>' . PHP_EOL;
  $html .= '<html lang="es">' . PHP_EOL;
  $html .= '<head>' . PHP_EOL;
  $html .= "<title>$title</title>" . PHP_EOL;
  $html .= '<meta property="og:url"” content="http://' . $_SERVER['SERVER_NAME'] . '/' . $_REQUEST['path'] . '" />' . PHP_EOL;
  $html .= '<meta property="og:title" content="' . $title . '"/>' . PHP_EOL;
  $html .= '<meta property="og:description" content="' . $content . '" />' . PHP_EOL;
  $html .= '<meta property="og:image" content="http://' . $_SERVER['SERVER_NAME'] . (!empty($interior['captura_grande']) ? '/dist/images/obras/' . $interior['captura_grande'] : '/dist/images/social.png') . '"/>' . PHP_EOL;
  $html .= '<meta property="og:type" content="website" />' . PHP_EOL;
  $html .= '<meta property="og:site_name" content="Antología litElat #1" />' . PHP_EOL;
  $html .= '</head>' . PHP_EOL;
  $html .= '<body>' . PHP_EOL;

  if ($interior) {
    if ($data['type'] === 'obra') {
      $html .= "<h1>{$interior['titulo']}</h1>" . PHP_EOL;
      $html .= "<h2>Autor:";

      for ($z = 0; $z < count($interior['nombre']); $z++) {
        $id = getAutorId($interior['nombre'][$z], $interior['apellido'][$z]);
        $html .= "<a href='/autor-$id'>{$interior['nombre'][$z]} {$interior['apellido'][$z]}</a> ";
      }

      $html .= "</h2>" . PHP_EOL;
      $html .= $interior['comentario'] . PHP_EOL;
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
        foreach ($interior['descargable'] as $link) {
          $html .= "<a href='{$link['link']}'>{$link['text']}</a>" . PHP_EOL;
        }
      }
    } elseif ($data['type'] === 'autor') {
      $html .= "<h1>Autor: {$interior['autor']} ({$interior['nombre']} {$interior['apellido']}) </h1>" . PHP_EOL;
      $html .= "<p>{$interior['biografia']}</p>" . PHP_EOL;
    } elseif ($data['type'] === 'obras') {
      foreach ($interior as $id => $obra) {
        $html .= "<a href='/obra-$id'>{$obra['titulo']}</a>" . PHP_EOL;
      }
    }
  }

  $html .= '<a href="/obras">Obras</a>' . PHP_EOL;

  $html .= '</body>' . PHP_EOL;
  $html .= '</html>';

  echo $html;
}

/**
 * @param $nombre
 * @param $apellido
 * @return string|string[]
 */
function getAutorId($nombre, $apellido)
{
  $nombre = trim($nombre);
  $apellido = trim($apellido);

  return str_replace([' ', '.'], '_', "{$nombre} {$apellido}");
}
