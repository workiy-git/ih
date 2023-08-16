<?php

/**
 * @file
 * Theme Settings file for Interior health Theme.
 */

use Drupal\Core\Form\FormStateInterface;
use Drupal\file\Entity\File;

/**
 * Implements hook_form_system_theme_settings_alter().
 */
function interior_health_theme_form_system_theme_settings_alter(&$form, &$form_state, $form_id = NULL) {
  // Work-around for a core bug affecting admin themes. See issue #943212.
  if (isset($form_id)) {
    return;
  }

  // General tab.
  $form['libraires'] = [
    '#type' => 'details',
    '#title' => t('Map Libraires'),
  ];

  $form['libraires']['block_libraries_mapping'] = [
    '#type' => 'textarea',
    '#title' => t('Mapping Libraires with Block'),
    '#description' => t('Enter Libraires Mapping in Json Format. Json format is <b><pre>{"BLOCK_ID-1" : ["LIBRARY-1", "LIBRARY-2", "LIBRARY-3"]}</pre></b>'),
    '#default_value' => theme_get_setting('block_libraries_mapping'),
    '#element_validate' => [
      [
        'Drupal\interior_health_common\Validate\JsonValidate',
        'validate',
      ],
    ],
  ];
  $form['libraires']['path_libraries_mapping'] = [
    '#type' => 'textarea',
    '#title' => t('Mapping Libraires with Path'),
    '#description' => t('Enter Libraires Mapping in Json Format. Json format is <b><pre>{"PATH-1" : ["LIBRARY-1", "LIBRARY-2", "LIBRARY-3"]}</pre></b>'),
    '#default_value' => theme_get_setting('path_libraries_mapping'),
    '#element_validate' => [
      [
        'Drupal\interior_health_common\Validate\JsonValidate',
        'validate',
      ],
    ],
  ];
  // Adding the Mobile Logo.
  $form['logo_responsive'] = [
    '#type'              => 'managed_file',
    '#title'             => t('Mobile Logo'),
    '#default_value'     => theme_get_setting('logo_responsive'),
    '#upload_location'   => 'public://logo',
    '#upload_validators' => [
      'file_validate_extensions' => ['gif png jpg jpeg'],
    ],
  ];
  $form['#submit'][] = 'interior_health_theme_form_system_theme_settings_submit';
}

/**
 * Form Submit Handler.
 */
function interior_health_theme_form_system_theme_settings_submit(&$form, FormStateInterface $form_state) {
  if ($file_id = $form_state->getValue(['logo_responsive', '0'])) {
    $file = File::load($file_id);
    $file->setPermanent();
    $file->save();
  }
}
