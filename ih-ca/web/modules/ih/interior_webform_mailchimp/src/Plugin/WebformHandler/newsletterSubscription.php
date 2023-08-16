<?php
namespace Drupal\interior_webform_mailchimp\Plugin\WebformHandler;

use Drupal\Core\Form\FormStateInterface;
use Drupal\webform\Plugin\WebformHandlerBase;
use Drupal\webform\webformSubmissionInterface;
use \Drupal\Core\Config\ImmutableConfig;

/**
 * Form submission handler.
 *
 * @WebformHandler(
 *   id = "newslettersubscription",
 *   label = @Translation("Newsletter subscription"),
 *   category = @Translation("Form Handler"),
 *   description = @Translation("Administers subscriptions in Mailchimp"),
 *   cardinality = \Drupal\webform\Plugin\WebformHandlerInterface::CARDINALITY_SINGLE,
 *   results = \Drupal\webform\Plugin\WebformHandlerInterface::RESULTS_PROCESSED,
 * )
 */

class newsletterSubscription extends WebformHandlerBase {

  /**
   * {@inheritdoc}
   */
  public function defaultConfiguration() {
    return [];
  }
 
  // const MAILCHIMP_API_KEY = 'f52854c6041820fbcbf934a25d93a126-us5'; // see https://mailchimp.com/help/about-api-keys
  // const LIST_ID = '5d6073e958'; // see https://3by400.com/get-support/3by400-knowledgebase?view=kb&kbartid=6
  // const SERVER_LOCATION = 'us5'; // the string after the '-' in your MAILCHIMP_API_KEY f.e. us4

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state, WebformSubmissionInterface $webform_submission) {
    //getting config values
    $config = \Drupal::config('interior_mailchimp.settings');
    $api_key = $config->get('api_key'); 
    $audience_id = $config->get('audience_id'); 
    $server_location = $config->get('server_location');

    $values = $webform_submission->getData();
    $email = strtolower($values['email']);
    //$first_name = $values['types'];
    $tags = [];
    $update_tags = [
      0 => ["name" => "News", "status" => "inactive"], 
      1 => ["name" => "Alerts", "status" => "inactive"], 
      2 => ["name" => "Stories@IH", "status" => "inactive"], 
      3 => ["name" => "COVID-19", "status" => "inactive"], 
    ];

    foreach($values['types'] as $key => $item){
      $tags[] = $item;
      $ukey = array_search($item, array_column($update_tags, 'name'));
      if ($ukey >= 0) {
        $update_tags[$ukey]["status"] = "active";
      }
    }

    // The data to send to the API
    $postData = array(
      "email_address" => "$email",
      "status" => "subscribed",
      'tags'  => $tags,
    );

    // Setup cURL
    // To get the correct dataserver, see the url of your mailchimp back-end, mine is https://us20.admin.mailchimp.com/account/api/
    $ch = curl_init('https://'.$server_location.'.api.mailchimp.com/3.0/lists/'.$audience_id.'/members/');
    curl_setopt_array($ch, array(
      CURLOPT_POST => TRUE,
      CURLOPT_RETURNTRANSFER => TRUE,
      CURLOPT_HTTPHEADER => array(
        'Authorization: apikey '.$api_key,
        'Content-Type: application/json'
      ),
      CURLOPT_POSTFIELDS => json_encode($postData)
    ));

    // Send the request
    $response = curl_exec($ch);
    $readable_response = json_decode($response);
    if(!$readable_response) {
      \Drupal::logger('Mailchimp_subscriber')->error($readable_response->title.': '.$readable_response->detail .'. Raw values:'.print_r($values));
      \Drupal::messenger()->addError('Something went wrong. Please contact your webmaster.');
    }
    if($readable_response->status == 403) {
      \Drupal::logger('Mailchimp_subscriber')->error($readable_response->title.': '.$readable_response->detail .'. Raw values:'.print_r($values));
      \Drupal::messenger()->addError('Something went wrong. Please contact your webmaster.');
    }
    if($readable_response->status == 'subscribed') {
      \Drupal::messenger()->addStatus('You are now successfully subscribed.');
    }
    if($readable_response->status == 400) {
      if($readable_response->title == 'Member Exists') {
        
        // The data to send to the API
        $postData2 = array(
          "tags" => $update_tags,
        );

        // Setup cURL
        // To get the correct dataserver, see the url of your mailchimp back-end, mine is https://us20.admin.mailchimp.com/account/api/
        $ch2 = curl_init('https://' . $server_location . '.api.mailchimp.com/3.0/lists/' . $audience_id . '/members/' . md5($email) . "/tags");
        curl_setopt_array($ch2, array(
          CURLOPT_POST => TRUE,
          CURLOPT_RETURNTRANSFER => TRUE,
          CURLOPT_HTTPHEADER => array(
            'Authorization: apikey '.$api_key,
            'Content-Type: application/json'
          ),
          CURLOPT_POSTFIELDS => json_encode($postData2)
        ));

        // Send the request
        $response2 = curl_exec($ch2);
        $readable_response2 = json_decode($response2);
        if(isset($readable_response2)) {
          \Drupal::logger('Mailchimp_subscriber_update_response')->notice(print_r($readable_response2,TRUE));
          \Drupal::messenger()->addError('Something went wrong. Please contact your administrator.');
        }
        else {
          \Drupal::messenger()->addStatus('Your subscription updated successfully.');
        }
      }
    }
    return true;
  }
}
