<?php

/**
 * @file
 * Contain \Drupal\ih_geolocation\Controller\DistanceMatrixController
 */

namespace Drupal\ih_geolocation\Controller;

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Drupal\rest\ResourceResponse;
use Symfony\Component\HttpFoundation\JsonResponse;

/**
 * Controller for the ih_geolocation module.
 */
class DistanceMatrixController extends ControllerBase {
  
  /**
   * Function to get the distances.
   */
  public function getDistances() {

    // Fetch the Geolocation API key in config
    $config = \Drupal::config('geolocation_google_maps.settings');
    $api_key = $config->get('google_map_api_key');
    
    // URL encode for source
    $source = urlencode($_POST['source']);

    // URL encode for destination
    $destinations = urlencode($_POST['destination']);
    
    if (isset($source) && isset($destinations)) {
      $url = "https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=$source&destinations=$destinations&key=$api_key";

      \Drupal::logger('gdistance_url')->notice("<pre>" . print_r($url, TRUE) . "</pre>");

      // Initialize the curl
      $ch = curl_init();
      
      // Set curl option
      curl_setopt($ch, CURLOPT_URL, $url);
      curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
      curl_setopt($ch, CURLOPT_PROXYPORT, 3128);
      curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
      curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
      // Execute the curl request
      $response = curl_exec($ch);
      $response = json_decode($response);
      // Close the curl
      curl_close($ch);
      
      \Drupal::logger('gdistance_response')->notice("<pre>" . print_r($response, TRUE) . "</pre>");
      
      return new JsonResponse($response);
    }
    else {
      $response = json_encode("false");
      return new JsonResponse($response);
    }

  }  /* End of getDistances function*/

  /**
   * Function to get the map key.
   */
  public function getMapKey() {

    // Fetch the Geolocation API key in config
    $config = \Drupal::config('geolocation_google_maps.settings');
    $api_key = $config->get('google_map_api_key');
    
    if (isset($api_key)) {
      return new JsonResponse($api_key);
    }
    else {
      $response = json_encode("false");
      return new JsonResponse($response);
    }

  }
}
