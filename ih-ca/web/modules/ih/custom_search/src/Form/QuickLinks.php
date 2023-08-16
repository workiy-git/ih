<?php

namespace Drupal\custom_search\Form;

use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\file\Entity\File;

/**
 * Configure settings for Search Overlay.
 */
class QuickLinks extends ConfigFormBase {

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'quick_links_config';
  }

  /**
   * {@inheritdoc}
   */
  protected function getEditableConfigNames() {
    return [
      'quick_links.settings',
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $config = $this->config('quick_links.settings');

    $form['#tree'] = TRUE;

    $form['search'] = array(
      '#type' => 'container',
    );

    $form['search']['repeat_fieldset'] = array(
      '#title' => t('Quick Links'),
      '#type' => 'fieldset',
      '#prefix' => '<div id=repeat_container>',
    );

    
    if (empty($form_state->get('num_topics'))) {
      if($config->get("search") != NULL) {
        $search = $config->get("search");
        $form_state->set('num_topics', count($search));
      }
      else {
        $search = NULL;
        $form_state->set('num_topics', 1);
      }
    }

    for ($i = 0; $i < $form_state->get('num_topics'); $i++) {

      $form['search']['repeat_fieldset'][$i]['title'] = [
        '#title' => t('Title'),
        '#type' => 'textfield',
        '#attributes' => [
          'placeholder' => t('Enter the Title Name'),
        ],
        '#prefix' => '<h4>Topic '.($i + 1).'</h4>',
      ];
      $form['search']['repeat_fieldset'][$i]['url'] = [
        '#title' => t('URL'),
        '#type' => 'textfield',
        '#attributes' => [
          'placeholder' => t('Enter the url'),
        ],      
      ];

      // Set default value for the products
      if ($search != NULL) {
        $form['search']['repeat_fieldset'][$i]['title']['#default_value'] = $search[$i]['title'];
        $form['search']['repeat_fieldset'][$i]['url']['#default_value'] = $search[$i]['url'];
      }

    }//End of for loop

    $form['search']['add_name'] = array(
        '#type' => 'submit',
        '#value' => t('+Add'),
        '#submit' => array('::ajax_example_add_more_add_one'),
        // See the examples in ajax_example.module for more details on the
        // properties of #ajax.
        '#ajax' => array(
          'callback' => '::ajax_example_add_more_callback',
          'wrapper' => 'repeat_container',
        ),
    );

    if ($form_state->get('num_topics') > 1) {
      $form['search']['remove_name'] = array(
        '#type' => 'submit',
        '#value' => t('-Remove'),
        '#submit' => array('::ajax_example_add_more_remove_one'),
        '#ajax' => array(
          'callback' => '::ajax_example_add_more_callback',
          'wrapper' => 'repeat_container',
        ),
      );
    }
    return parent::buildForm($form, $form_state);
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    
    $config = $this->configFactory->getEditable('quick_links.settings');
    
    // Set the submitted configuration setting
    $search = $form_state->getValue('search')['repeat_fieldset'];;
    $config->set('search', $search);
    $config->save();
    
    parent::submitForm($form, $form_state);
  }

    /**
   * Callback for both ajax-enabled buttons.
   *
   * Selects and returns the fieldset with the names in it.
   */
  public function ajax_example_add_more_callback(array &$form, FormStateInterface $form_state) {
    return $form['search'];
  }

  /**
   * Submit handler for the "add-one-more" button.
   *
   * Increments the max counter and causes a rebuild.
   */
  public function ajax_example_add_more_add_one(array &$form, FormStateInterface $form_state) {
    $form_state->set('num_topics', $form_state->get('num_topics')+1);
    $form_state->setRebuild();
  }

  /**
   * Submit handler for the "remove one" button.
   *
   * Decrements the max counter and causes a form rebuild.
   */
  public function ajax_example_add_more_remove_one(array &$form, FormStateInterface $form_state) {
    if ($form_state->get('num_topics') > 1) {
      $form_state->set('num_topics', $form_state->get('num_topics')-1);
    }
    $form_state->setRebuild();
  }

}