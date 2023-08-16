<?php
namespace Drupal\interior_webform_mailchimp\Form;

use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;

/**
 * Configure example settings for this site.
 */
class mailchimpSettingsForm extends ConfigFormBase {

  /** 
   * Config settings.
   *
   * @var string
   */
  const SETTINGS = 'interior_mailchimp.settings';

  /** 
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'mailchimp_admin_settings';
  }

  /** 
   * {@inheritdoc}
   */
  protected function getEditableConfigNames() {
    return [
      'interior_mailchimp.settings',
    ];
  }

  /** 
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $config = $this->config('interior_mailchimp.settings');

    $form['api_key'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Mailchimp API Key'),
      '#required' => TRUE,
      '#default_value' => $config->get('api_key'),
      '#description' => $this->t('The API key for your Mailchimp account. Get or generate a valid API key at your Mailchimp API Dashboard'),
    ];  

    $form['audience_id'] = [
      '#type' => 'textfield',
      '#title' => $this->t('List ID'),
      '#required' => TRUE,
      '#default_value' => $config->get('audience_id'),
      '#description' => $this->t('The Audience ID for your Mailchimp account'),
    ]; 
    $form['server_location'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Server Location'),
      '#required' => TRUE,
      '#default_value' => $config->get('server_location'),
      '#description' => $this->t('the string after the - in your MAILCHIMP_API_KEY f.e. us4'),
    ];  

    return parent::buildForm($form, $form_state);
  }

  /** 
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    // Retrieve the configuration.
    $this->configFactory->getEditable('interior_mailchimp.settings')
      // Set the submitted configuration setting.
      ->set('api_key', $form_state->getValue('api_key'))
      ->set('audience_id', $form_state->getValue('audience_id'))
      ->set('server_location', $form_state->getValue('server_location'))
      ->save();

    parent::submitForm($form, $form_state);
  }

}