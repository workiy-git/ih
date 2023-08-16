<?php
namespace Drupal\interior_custom_email\Plugin\Mail;

use Drupal\Core\Mail\MailFormatHelper;
use Drupal\Core\Mail\MailInterface;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Mail\Plugin\Mail\PhpMail;
use Drupal\interior_custom_email\Controller\EmailApi;
use Drupal\Core\Render\Markup;
use Drupal\Core\Mail\Plugin\Mail;

/**
 * Defines the Interior custom Email backend
 * 
 * @Mail(
 *  id = "interior_custom_email",
 *  label = @Translation("Custom API mailer"),
 *  description = @Translation("Sends an email using an external API specific to our interior custom email  Module.")
 * )
 */

 class ApiEmailGateway extends PhpMail implements MailInterface, ContainerFactoryPluginInterface {

     /**
      *  {@inheritdoc}
      */
    public static function create (ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
        return new static();
    }
    /**
   * Set the config object.
   *
   * @param \Drupal\Core\Config\ConfigFactoryInterface $config_factory
   *   The config factory object.
   *
   * @return $this
   */
    // public function format (array $message) {
    //   // $message['body'] = implode("\n\n", $message['body']);
    //   $message['body'] = MailFormatHelper::htmlToText($message['body']);
    //   // kint($message);
    //   kint($message['body']);
    //   die;
    // }

    public function mail(array $message) {
      
      $to_mail = $message['to'];
      $subject = $message['subject'];
      $body = MailFormatHelper::wrapMail($message['body']);
      $module = $message['module'];
      
      if(isset($message['params']['cc_mail'])){
        $cc_mail = $message['params']['cc_mail'];
      }
      if(isset($message['params']['headers']['Bcc'])){
        $bcc_mail = $message['params']['headers']['Bcc'];
      }
      \Drupal::logger('bcc_mailID')->notice('<pre><code>' . print_r($bcc_mail, TRUE) . '</code></pre>' );
      $email_api = new EmailApi();
      if(!empty($subject) || !empty($body) || !empty($to_mail) || !empty($cc_mail) || !empty($bcc_mail) || !empty($module)){
        return $email_api->emailApi($subject,$body,$to_mail,$cc_mail,$bcc_mail,$module);
      }
    }   
 }