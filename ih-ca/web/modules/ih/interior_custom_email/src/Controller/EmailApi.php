<?php
/**
 * @file
 * Contains \Drupal\interior_custom_email\Controller\EmailApi.
 */
namespace Drupal\interior_custom_email\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Url;
use Drupal\Core\Form\ConfigFormBase;
use Symfony\Component\HttpFoundation\RedirectResponse;


class EmailApi extends ControllerBase {

  public function emailApi($subject,$body,$to_mail,$cc_mail,$bcc_mail,$module) {
    
    $config = $this->config('email.settings');

      $api_key = $config->get('api_key');
      $api_value = $config->get('api_value');
      $api_url = $config->get('api_url');
      $application_id = $config->get('app_id');
      $from_cf = $config->get('from');
    
      //to mail
      if(!empty($config->get('development'))){
        $to_mail = explode(",",$config->get('display1'));
      }
      elseif(!empty($to_mail)){
        $to_mail = explode(",",$to_mail);
      }

      $to_cf_arr = [];
      foreach($to_mail as $to){
        $to_cf_arr[] = $to; 
      }

      //cc mail address
      $cc_mail = explode(",",$cc_mail);
      $cc_arr = [];
      foreach($cc_mail as $cc){
        $cc_arr[] = $cc; 
      }

      //bcc mail address
      $bcc_mail = explode(",",$bcc_mail);
      $bcc_arr = [];
      foreach($bcc_mail as $bcc){
        $bcc_arr[] = $bcc; 
      }
    

      if($module == 'content_moderation_notifications'){
        $post_fields = [
          "from" => $from_cf,
          "to" => $to_cf_arr,
          "bcc" => $bcc_arr,
          "subject" => $subject,
          "bodyType" => "html",
          "applicationId" => $application_id,
          "body" => $body
        ];
      }
      elseif($module == 'webform'){
        $post_fields = [
          "from" => $from_cf,
          "to" => $to_cf_arr,
          "subject" => $subject,
          "bodyType" => "html",
          "applicationId" => $application_id,
          "body" => $body
        ];
      }
      $json_post_fields = json_encode($post_fields);

      // curl request for API trigger
      $curl = curl_init();

      curl_setopt_array($curl, array(
        CURLOPT_URL => ''.$api_url.'',
        CURLOPT_CUSTOMREQUEST => 'POST',
        CURLOPT_POSTFIELDS => $json_post_fields,
        CURLOPT_HTTPHEADER => array(
          ''.$api_key.': '.$api_value.'',
          'Content-Type: application/json'
        ),
      ));

      $response_api = curl_exec($curl);
      $httpcode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
      curl_close($curl);
     
      try {
        if ($httpcode == 200) {
          \Drupal::logger('mail_response')->notice('<pre><code>' . print_r($response_api, TRUE) . '</code></pre>' ); 
          $host = \Drupal::request()->getSchemeAndHttpHost();
          $email = $bcc_arr[0];
          array_shift($bcc_arr);
          foreach($bcc_arr as $bcc){
            $email = $email.','.$bcc;
          }
          \Drupal::logger('bcc_mailID')->notice('<pre><code>' . print_r($email, TRUE) . '</code></pre>' );
        }
        else {
          $host = \Drupal::request()->getSchemeAndHttpHost();
          $email = $to_cf_arr[0];
          array_shift($to_cf_arr);
          foreach($to_cf_arr as $to){
            $email = $email.','.$to;
          }
          if($module == "webform"){
            $current_path = \Drupal::service('path.current')->getPath();
            $message = "Please email ".$email." or call us at 1-877-442-2001 with your feedback. Please note that we have been experiencing technical difficulties with the web form. If you submitted a concern through the web form and did not receive a response, please contact us by email or phone.";
            \Drupal::service('request_stack')->getCurrentRequest()->query->set('destination', $current_path);
            \Drupal::messenger()->addError($message, TRUE); 
          }
        }
      }
      catch(HTTP_Request2_Exception $e) {
        echo 'Error: ' . $e->getMessage();
      }

      

      return $response_api;
  } 
   
}
