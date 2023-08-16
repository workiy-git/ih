<?php

namespace Drupal\custom_search\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides a 'Global Search Popup' Block.
 *
 * @Block(
 *   id = "global_search_popup_block",
 *   admin_label = @Translation("Global Search Popup Block"),
 *   category = @Translation("Global Search"),
 * )
 */
class GlobalSearchPopup extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {

  	// Set the twig name
  	$output['#theme'] = 'global_search_popup_block';

    // Get the popular topics config values
    $output['#popular_topics'] = \Drupal::config('popular_topics.settings')->get('search');

    // Get the quick_links config values
    $output['#quick_links'] = \Drupal::config('quick_links.settings')->get('search');
  	
    return $output;

  }

}