<?php 

namespace Drupal\interior_custom_email\Form;

use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;

class EmailForm extends ConfigFormBase {
	public function getFormId() {
		return 'email_form';
	}
	protected function getEditableConfigNames() {
		return[
			'email.settings',
		];
	}
	public function buildForm(array $form, FormStateInterface $form_state) {
		$config = $this->config('email.settings');
		
		$form['api_key'] = [
			'#type' => 'textfield',
			'#title' => 'API Key',
			'#default_value' => $config->get('api_key'),
			
		];
		$form['api_value'] = [
			'#type' => 'textfield',
			'#title' => 'API Value',
			'#default_value' => $config->get('api_value'),
			
		];
		$form['api_url'] = [
			'#type' => 'textfield',
			'#title' => 'API Url',
			'#default_value' => $config->get('api_url'),
			
		];
		$form['app_id'] = [
			'#type' => 'textfield',
			'#title' => 'Application ID',
			'#default_value' => $config->get('app_id'),
			
		];
		$form['from'] = [
			'#type' => 'textfield',
			'#title' => 'From',
      		'#default_value' => $config->get('from'),
  		];
		$form['settings'] = [
			'#type' => 'details',
			'#title' => 'To address',
			'#tree' => TRUE,
			'#open' => TRUE,
		];
		$form['settings']['development'] = array(
			'#type' => 'checkbox',
			'#title' => $this->t('Development'),
			'#default_value' => $config->get('development'),
		);
		$form['settings']['display1'] = array(
			'#title' => t('Development - To address'),
			'#type' => 'textfield',
			'#states' => array(
				'visible' => array(
				':input[name="settings[development]"]' => array('checked' => TRUE),
				),
			),
			'#default_value' => $config->get('display1'),
		);
		
		return parent::buildForm($form, $form_state);
	}
	public function validateForm(array &$form, FormStateInterface $form_state) {
		
	}
	public function submitForm(array &$form, FormStateInterface $form_state) {
		$config = $this->config('email.settings');
			$config->set('api_key', $form_state->getValue('api_key'));
			$config->set('api_value', $form_state->getValue('api_value'));
			$config->set('api_url', $form_state->getValue('api_url'));
			$config->set('app_id', $form_state->getValue('app_id'));
			$config->set('from', $form_state->getValue('from'));
			$config->set('development', $form_state->getValue('settings')['development']);
			$config->set('display1', $form_state->getValue('settings')['display1']);
			$config->save();
		parent::submitForm($form, $form_state);
		\Drupal::messenger()->addStatus('Credentials Saved');
	}
	
}