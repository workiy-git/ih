<?php

namespace Drupal\custom_search\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides a 'Homepage Global Search Block' Block.
 *
 * @Block(
 *   id = "homepage_global_search_block",
 *   admin_label = @Translation("Homepage Global Search Block"),
 *   category = @Translation("Homepage Global Search"),
 * )
 */
class HomepageGlobalSearchBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {
  	
  	// Set the twig name
  	$output['#theme'] = 'homepage_global_search_block';

    $welcome_arr[0]['title'] = "Welcome.";
    $welcome_arr[0]['subtitle'] = "What can we help you find?";

    $output['#welcome_arr'] = $welcome_arr;
    return $output;

  }

}