<?php

namespace Drupal\interior_health_common\EventSubscriber;

use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpKernel\KernelEvents;
use Drupal\Core\Url;
use Symfony\Component\HttpKernel\Event\GetResponseEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

/**
 * Configures redirect to urls.
 *
 * @package Drupal\interior_health_common\EventSubscriber
 */
class RedirectEventSubscriber implements EventSubscriberInterface {

  /**
   * Checking for redirection.
   *
   * @param \Symfony\Component\HttpKernel\Event\GetResponseEvent $event
   *   The event to process.
   */
  public function checkForRedirection(GetResponseEvent $event) {

    $path_info = $event->getRequest()->getPathInfo();

    $new_url = '';
    $type = \Drupal::request()->query->get('type');
    // \Drupal::logger('interior_health_common')->notice(print_r($type,TRUE));
    // \Drupal::logger('interior_health_common')->notice(print_r($path_info,TRUE));
    if ($path_info == '/FindUs/_layouts/FindUs/info.aspx' && $type == 'Location') {
      $new_url = '/locations';
    }

    if ($path_info == '/FindUs/_layouts/FindUs/info.aspx' && $type == 'Service') {
      $new_url = '/services';
    }

    if ($new_url != '') {
      $url = Url::fromUserInput($new_url)->toString();
      $event->setResponse(new RedirectResponse($url));
    }
  }

  /**
   * {@inheritdoc}
   */
  public static function getSubscribedEvents() {
    $events[KernelEvents::REQUEST][] = ['checkForRedirection'];
    return $events;
  }

}
