<?php

namespace Drupal\custom_search\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;

class CustomSearch extends FormBase {
  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'search_form';
  }

public function buildForm(array $form, FormStateInterface $form_state) {
    $form['search_box'] = array(
      '#type' => 'textfield',
      '#attributes' => [
        'placeholder' => t('Search Services'),
      ],
    );
    
    $form['search_filters'] = array (
      '#type' => 'select',
      '#options' => array(
        'Search all IH' => t('Search all IH'),
        'Services' => t('Services'),
        'Locations' => t('Locations'),
        'Articles' => t('Articles'),
        'Alerts' => t('Alerts'),
      ),
    );
    
    return $form;
  }

  public function validateForm(array &$form, FormStateInterface $form_state) {
  }
  
  public function submitForm(array &$form, FormStateInterface $form_state) {
  }
}