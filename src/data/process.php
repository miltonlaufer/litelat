<?php
/**
 * Este archivo crea la base json a partir de la información de la hoja de cálculo.
 * Se ejecuta por línea de comando (aunque debería funcionar por web también).
 */

$input = file_get_contents("obrasraw.txt");

$columnas = [
  'titulo',
  'autor',
  'nombre',
  'apellido',
  'pais',
  'residencia',
  'ano',
  'idioma',
  'categorias',
  'tecnologias',
  'comentario',
  'biografia',
  'Capturas',
  'captura_grande',
  'captura_chica',
  'enlace',
  'descargable'
];
$obras = explode("**", $input);
$contador = 0;
$resultTmp = [];

foreach ($obras as $obra) {
  $contador++;
  $obraArray = explode('---', $obra);
  $resultTmp[$contador] = call_user_func_array(
    'array_merge',
    array_map(
      function ($val, $col) {
        if (in_array($col, ['categorias', 'idioma', 'tecnologias'])) {
          $val = array_map(
            function ($val) {
              return trim($val);
            },
            explode(',', $val)
          );
        } elseif (in_array($col, ['enlace', 'descargable'])) {
          if (strlen(trim($val))) {
            $links = explode(';', $val);
            $val = array_map(
              function ($val) {
                $link = explode('*', $val);

                return [
                  'text' => trim($link[0]),
                  'link' => trim($link[1])
                ];
              },
              $links
            );
          } else {
            $val = null;
          }
        } elseif (in_array($col, ['nombre', 'apellido', 'biografia'])) {
          $val = explode('&&', $val);
        } elseif ($col === 'titulo') {
          if (empty(trim($val))) {
            return null;
          }

          $val = str_replace('"', '', $val);
        }

        if (!is_array($val)) {
          $val = trim(str_replace("\n", '', $val));
        }

        return [trim($col) => $val];
      },
      $obraArray,
      $columnas,
    )
  );
}

// La última línea siempre está vacía.
unset($resultTmp[$contador]);

// Muestra el resultado en la terminal
var_dump(['obras' => $resultTmp]);

file_put_contents('obras.json', json_encode(['obras' => $resultTmp]));

echo "Listo";
