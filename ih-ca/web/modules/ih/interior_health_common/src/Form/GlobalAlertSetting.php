<?php

namespace Drupal\interior_health_common\Form;

use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Form\ConfigFormBase;

/**
 * Global alert setting.
 *
 * @package Drupal\interior_health_common\Form
 */
class GlobalAlertSetting extends ConfigFormBase {

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'global_alert_setting_form';
  }

  /**
   * {@inheritdoc}
   */
  protected function getEditableConfigNames() {
    return [
      'GlobalAlertSetting.settings',
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {

    $config = $this->config('GlobalAlertSetting.settings');

    $form['show'] = [
      '#type' => 'checkbox',
      '#title' => 'Show Global Location Alerts',
      '#default_value' => $config->get('show'),
    ];

    $form['alert_title'] = [
      '#type' => 'textfield',
      '#size' => 60,
      '#maxlength' => 128,
      '#title' => 'Alert Title',
      '#required' => TRUE,
      '#default_value' => $config->get('alert_title'),
    ];

    $form['alert_description'] = [
      '#type' => 'text_format',
      '#title' => 'Alert Description',
      '#required' => TRUE,
    ];

    if (!empty($config->get('alert_description'))) {
      $form['alert_description']['#format'] = $config->get('alert_description')['format'];
      $form['alert_description']['#default_value'] = $config->get('alert_description')['value'];
    }
    else {
      $form['alert_description']['#format'] = 'full_html';
    }

    $form['cust_submit'] = [
      '#type' => 'submit',
      '#value' => 'Save',
    ];

    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {

    // print_r($form_state->getValue('alert_description'));.
    $this->config('GlobalAlertSetting.settings')
      ->set('show', $form_state->getValue('show'))
      ->set('alert_title', $form_state->getValue('alert_title'))
      ->set('alert_description', $form_state->getValue('alert_description'))
      ->save();
  }

}
