<?php

namespace Drupal\insta_feed\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Block\BlockPluginInterface;

/**
 * Provides a 'Insta Feeds' block.
 *
 * @Block(
 *  id = "insta_feed_block",
 *  admin_label = @Translation("Insta Feeds"),
 * )
 */
class InstaBlock extends BlockBase implements BlockPluginInterface {

  /**
   * Implements instagram feed block.
   */
  public function auth_insta_feed($access_token, $mediacount) {
    $account = $this->getaccount($access_token);
    $output = [];
    if (isset($account['message'])) {
      $output['error'] = $account['message'];
      return $output;
    }
    else {
      if (!empty($account) && !empty($access_token)) {
        $results = $this->get_insta_media_ids($access_token, $account);
      }
      $client = \Drupal::httpClient();
      $count = 0;      
      if (!empty($results) && !empty($results['data'])) {
        // Iterate media ids
        foreach ($results['data'] as $key => $value) {
          // check number of media's want to display
          if ($mediacount > $count) {
            // Fetch info from the instagram using media id
            $image_obj = $client->get('https://graph.instagram.com/' . $value['id'] . '?fields=id,media_url,media_type,caption,permalink&access_token=' . $access_token);
            $responsebody = $image_obj->getBody();
            $body = json_decode($responsebody);

            if ($body->media_type == 'IMAGE') {
              $data['image'] = [ 'src' => $body->media_url, 'link' => $body->permalink ];
              $data['caption'] = $body->caption;
              $data['media_type'] = $body->media_type;
              $output[$key] = $data;
              $count++;
            }
          } // End of mediacount IF
        } // End of For
      }
      return $output;
    }
  }
  
  /**
   * Retrieve the Instagram account details using access token.
   */
  public function getaccount($access_token) {
    $client = \Drupal::httpClient();
    $request = $client->get('https://graph.instagram.com/me?fields=id,username&access_token=' . $access_token, ['http_errors' => FALSE]);
    $body = $request->getBody();
    $response = json_decode($body, TRUE);
    return isset($response['error']) ? $response['error'] : $response;
  }

  /**
   * Fetch the instagram media ids.
   */
  public function get_insta_media_ids($access_token, $account) {
    $client = \Drupal::httpClient();
    $request = $client->get('https://graph.instagram.com/' . $account['id'] . '/media?access_token=' . $access_token, ['http_errors' => FALSE]);
    $body = $request->getBody();
    $mediaobj = json_decode($body, TRUE);
    return $mediaobj;
  }

  /**
   * {@inheritdoc}
   */
  public function blockForm($form, FormStateInterface $form_state) {
    global $base_url;
    $form = parent::blockForm($form, $form_state);

    // Retrieve existing configuration for this block.
    $config = $this->getConfiguration();

    // Add form fields to the existing block configuration form.
    $form['account_id'] = [
      '#type' => 'textfield',
      '#title' => t('Instagram Account Id'),
      '#default_value' => isset($config['account_id']) ? $config['account_id'] : '',
    ];
    $form['account_link'] = [
      '#type' => 'textfield',
      '#title' => t('Instagram Account Link'),
      '#default_value' => isset($config['account_link']) ? $config['account_link'] : '',
    ];
    $form['clientid'] = [
      '#type' => 'textfield',
      '#title' => t('Client Id'),
      '#default_value' => isset($config['clientid']) ? $config['clientid'] : '',
    ];
    $form['clientsecret'] = [
      '#type' => 'textfield',
      '#title' => t('Client Secret'),
      '#default_value' => isset($config['clientsecret']) ? $config['clientsecret'] : '',
    ];
    $form['mediacount'] = [
      '#type' => 'textfield',
      '#title' => t('No. of Media to Show'),
      '#default_value' => isset($config['mediacount']) ? $config['mediacount'] : '',
    ];
    $form['tokenvalidity'] = [
      '#type' => 'textfield',
      '#title' => t('Time when the access token was created'),
      '#default_value' => isset($config['tokenvalidity']) ? $config['tokenvalidity'] : time(),
      '#attributes' => ['disabled' => 'disabled'],
    ];
    $form['accesstoken'] = [
      '#type' => 'textarea',
      '#title' => t('Access Token'),
      '#default_value' => isset($config['accesstoken']) ? $config['accesstoken'] : '',
    ];

    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function blockSubmit($form, FormStateInterface $form_state) {
    // Save our custom settings when the form is submitted.
    $this->setConfigurationValue('account_id', $form_state->getValue('account_id'));
    $this->setConfigurationValue('account_link', $form_state->getValue('account_link'));
    $this->setConfigurationValue('clientid', $form_state->getValue('clientid'));
    $this->setConfigurationValue('clientsecret', $form_state->getValue('clientsecret'));
    $this->setConfigurationValue('mediacount', $form_state->getValue('mediacount'));
    $this->setConfigurationValue('tokenvalidity', $form_state->getValue('tokenvalidity'));
    $this->setConfigurationValue('accesstoken', $form_state->getValue('accesstoken'));
  }

  /**
   * {@inheritdoc}
   */
  public function build() {

    $config = $this->getConfiguration();
    $accountid = isset($config['account_id']) ? $config['account_id'] : '';
    $accountlink = isset($config['account_link']) ? $config['account_link'] : '';
    $clientid = isset($config['clientid']) ? $config['clientid'] : '';
    $clientsecret = isset($config['clientsecret']) ? $config['clientsecret'] : '';
    $mediacount = isset($config['mediacount']) ? $config['mediacount'] : '';
    $access_token = isset($config['accesstoken']) ? $config['accesstoken'] : '';
    $tokenvalidity = isset($config['tokenvalidity']) ? $config['tokenvalidity'] : '';

    $output = $this->auth_insta_feed($access_token, $mediacount);
    return [
      '#theme' => 'custom_insta_feed_block',
      '#output' => $output,
      '#attached' => [
        'library' => [
          'insta_feed/insta_feed.style',
        ],
      ],
    ];

  }

}
