<?php

namespace Drupal\vbo_workflows\Plugin\Action;

use Drupal\node\Entity\Node;
use Drupal\views_bulk_operations\Action\ViewsBulkOperationsActionBase;
use Drupal\Core\Session\AccountInterface;
use Drupal\Core\StringTranslation\StringTranslationTrait;
use Drupal\Core\Entity\ContentEntityInterface;

/**
 * Content moderation draft node.
 *
 * @Action(
 *   id = "vbo_workflows_draft_node_action",
 *   label = @Translation("Draft node (moderation_state)"),
 *   type = "node",
 *   confirm = TRUE
 * )
 */
class DraftNodeAction extends ViewsBulkOperationsActionBase {

  use StringTranslationTrait;

  /**
   * {@inheritdoc}
   */
  public function execute(ContentEntityInterface $entity = NULL) {
    $query = NULL;
    $nids = [];

    // Get the latest node revision.
    $query = \Drupal::database()->select('node_revision', 'nr');
    $query->fields('nr', ['vid']);
    $query->condition('nr.nid', $entity->id());
    $nids = array_keys($query->execute()->fetchAllAssoc('vid'));
    $recent_nid = !empty($nids) ? end($nids) : 0;

    // Get the moderation state of the latest revision.
    if (!empty($entity->id()) && !empty($recent_nid)) {
      $moderation_state = \Drupal::database()->select('content_moderation_state_field_revision', 'cm');
      $moderation_state->fields('cm', ['moderation_state']);
      $moderation_state->condition('cm.content_entity_id', $entity->id());
      $moderation_state->condition('cm.content_entity_revision_id', $recent_nid);
      $result = $moderation_state->execute()->fetchAll();
      $state = !empty($result) ? $result[0]->moderation_state : '';
    }

    if (!empty($state)) {
      $moderation_states = ['draft', 'review', 'archived', 'published'];
      if (in_array($state, $moderation_states)) {

        // Set the moderation state as draft.
        $entity->set('moderation_state', 'draft');
        $entity->save();

        $this->messenger()->addMessage(t(':title state changed to :state', [
          ':title' => $entity->getTitle(),
          ':state' => $entity->get('moderation_state')->getString(),
        ]));
      }
      else {
        $this->messenger()->addWarning(t('%title  - cannot change state directly from %state to draft', [
          '%title' => $entity->getTitle(),
          '%state' => $state,
        ]));
      }
    }
    else {
      $this->messenger()->addWarning(t('%title  - cannot change state', [
        '%title' => $entity->getTitle(),
      ]));
    }
  }

  /**
   * {@inheritdoc}
   */
  public function access($object, AccountInterface $account = NULL, $return_as_object = FALSE) {
    if ($object instanceof Node) {
      $can_update = $object->access('update', $account, TRUE);
      $can_edit = $object->access('edit', $account, TRUE);

      return $can_edit->andIf($can_update)->isAllowed();
    }

    return FALSE;
  }

}
