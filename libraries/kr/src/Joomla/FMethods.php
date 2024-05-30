<?php
/**
 * @package     Know Reservations
 * @subpackage  Library
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\KR\Joomla;

defined('_JEXEC') or die;

use Exception;
use InvalidArgumentException;
use Joomla\CMS\Cache\Cache;
use Joomla\CMS\Component\ComponentHelper;
use Joomla\CMS\Event\Content\ContentPrepareEvent;
use Joomla\CMS\Factory;
use Joomla\CMS\Language\Language;
use Joomla\CMS\Language\LanguageHelper;
use Joomla\CMS\Language\Text;
use Joomla\CMS\Layout\FileLayout;
use Joomla\CMS\Log\Log;
use Joomla\CMS\Mail\Mail;
use Joomla\CMS\Plugin\PluginHelper;
use Joomla\CMS\Response\JsonResponse;
use Joomla\CMS\Router\Route;
use Joomla\CMS\String\PunycodeHelper;
use Joomla\CMS\Table\Table;
use Joomla\CMS\Uri\Uri;
use Joomla\CMS\User\User;
use Joomla\CMS\User\UserFactoryInterface;
use Joomla\Event\DispatcherInterface;
use Joomla\Registry\Registry;
use Joomla\Session\SessionInterface;
use RuntimeException;
use stdClass;

use function is_null;

/**
 * Generic Joomla methods
 *
 * @since  1.0.0
 */
class FMethods
{
	/**
	 * Add include path
	 *
	 * @param  string|array  $path  Required path
	 *
	 * @since  3.2.0
	 */
	public static function addIncludePath(string|array $path): void
	{
		Table::addIncludePath($path);
	}

	/**
	 * Create log
	 *
	 * @param  mixed    $entry
	 * @param  integer  $priority
	 * @param  string   $category
	 * @param  ?string  $date
	 * @param  array    $context
	 *
	 * @since 3.7.0
	 */
	public static function addLogLog(mixed $entry, int $priority, string $category, string $date = null,
	                                 array $context = []): void
	{
		Log::add($entry, $priority, $category, $date, $context);
	}

	/**
	 * Create logger route
	 *
	 * @param  array  $options     Options
	 * @param  array  $categories  Categories
	 *
	 * @since 3.7.0
	 */
	public static function addLogLogger(array $options, array $categories): void
	{
		Log::addLogger($options, Log::ALL, $categories);
	}

	/**
	 * Convert email to punycode
	 *
	 * @param  string  $email  Email to convert
	 *
	 * @since  3.3.0
	 * @return string
	 */
	public static function emailToPunycode(string $email): string
	{
		return PunycodeHelper::emailToPunycode($email);
	}

	/**
	 * Add message to queue
	 *
	 * @param  string  $message  Message text
	 * @param  string  $type     Message type, error, alert etc
	 *
	 * @throws Exception
	 * @since  3.2.0
	 */
	public static function enqueueMessage(string $message, string $type = 'message'): void
	{
		Factory::getApplication()->enqueueMessage($message, $type);
	}

	/**
	 * Get Joomla articles used for KR terms
	 *
	 * @param  int  $article_id  ID of article
	 *
	 * @throws Exception
	 * @since  3.3.0
	 * @return mixed
	 */
	public static function getArticle(int $article_id): mixed
	{
		$model = Factory::getApplication()->bootComponent('com_content')
		                ->getMVCFactory()->createModel('Article', 'Administrator', ['ignore_request' => true]);

		return $model->getItem($article_id);
	}

	/**
	 * Get Uri base
	 *
	 * @since  3.0.0
	 * @return string
	 */
	public static function getBase(): string
	{
		return Uri::base();
	}

	/**
	 * Get instance of Cache
	 *
	 * @param  array  $options  Cache options
	 *
	 * @since  3.3.0
	 * @return Cache
	 */
	public static function getCache(array $options): Cache
	{
		return new Cache($options);
	}

	/**
	 * Get config value
	 *
	 * @param  string  $name     Name of config item
	 * @param  mixed   $default  The default return value
	 *
	 * @throws Exception
	 * @since  1.0.0
	 * @return mixed
	 */
	public static function getCfg(string $name, mixed $default): mixed
	{
		return Factory::getApplication()->get($name, $default);
	}

	/**
	 * Returns cookie with the given name.
	 *
	 * @param  string  $name  Cookie name
	 *
	 * @throws Exception
	 * @since  3.3.0
	 * @return ?string
	 */
	public static function getCookie(string $name): ?string
	{
		return Factory::getApplication()->input->cookie->get($name);
	}

	/**
	 * Get current default language
	 *
	 * @param  string  $area  Area of site
	 *
	 * @since  1.0.0
	 * @return mixed
	 */
	public static function getDefaultLanguage(string $area = 'administrator'): mixed
	{
		return ComponentHelper::getParams('com_languages')->get($area);
	}

	/**
	 * Get Uri base
	 *
	 * @since  3.3.0
	 * @return Uri
	 */
	public static function getInstance(): Uri
	{
		return Uri::getInstance();
	}

	/**
	 * Get current language
	 *
	 * @since  3.3.0
	 * @return ?Language
	 */
	public static function getLanguage(): ?Language
	{
		return Factory::getLanguage();
		//		return Factory::getContainer()->get('language');
	}

	/**
	 * Get current language
	 *
	 * @since  3.2.0
	 * @return string
	 */
	public static function getLanguageTag(): string
	{
		return Factory::getLanguage()->getTag();
		//		return Factory::getContainer()->get('language')->getTag();
	}

	/**
	 * Get all site languages
	 *
	 * @since  3.2.0
	 * @return array
	 */
	public static function getLanguages(): array
	{
		return LanguageHelper::getLanguages();
	}

	/**
	 * Get layout to use
	 *
	 * @param  string  $name      Name of layout
	 * @param  string  $basepath  Path to search
	 * @param  array   $options   Optional parameters
	 *
	 * @since   3.2.0
	 * @return FileLayout
	 */
	public static function getLayout(string $name, string $basepath = '', array $options = []): FileLayout
	{
		return new FileLayout($name, $basepath, $options);
	}

	/**
	 * Get mailer object
	 *
	 * @since  3.3.0
	 * @return Mail
	 */
	public static function getMailer(): Mail
	{
		return Factory::getMailer();
	}

	/**
	 * Get menu item
	 *
	 * @param  string  $link  Menu link to search for
	 *
	 * @throws Exception
	 * @since  3.3.0
	 * @return mixed
	 */
	public static function getMenuItemByLink(string $link): mixed
	{
		return Factory::getApplication()->getMenu('site')->getItems('link', $link, true);
	}

	/**
	 * Get component params
	 *
	 * @param  string  $name  Component name
	 *
	 * @since  3.0.0
	 * @return Registry
	 */
	public static function getParams(string $name): Registry
	{
		return ComponentHelper::getParams($name);
	}

	/**
	 * Get path info
	 *
	 * @param  string  $type  Path type
	 *
	 * @since  1.0.0
	 * @return false|string
	 */
	public static function getPath(string $type): false|string
	{
		if ($type == 'root') {
			return JPATH_SITE;
		}

		return false;
	}

	/**
	 * Get Uri root
	 *
	 * @since  3.0.0
	 * @return string
	 */
	public static function getRoot(): string
	{
		return Uri::root();
	}

	/**
	 * Get Joomla session
	 *
	 * @throws Exception
	 * @since  3.4.0
	 * @return SessionInterface
	 */
	public static function getSession(): SessionInterface
	{
		return Factory::getApplication()->getSession();
	}

	/**
	 * Get current template
	 *
	 * @throws Exception
	 * @since  3.3.0
	 * @return string
	 */
	public static function getTemplate(): string
	{
		return Factory::getApplication()->getTemplate();
	}

	/**
	 * Get user data.
	 *
	 * @param  ?int  $id  ID of user or null for current user
	 *
	 * @throws Exception
	 * @since  1.0.0
	 * @return User
	 */
	public static function getUser(int $id = null): User
	{
		if (is_null($id)) {
			return Factory::getApplication()->getIdentity();
		}
		else {
			return Factory::getContainer()->get(UserFactoryInterface::class)->loadUserById($id);
		}
	}

	/**
	 * Set user state
	 *
	 * @param  string  $key      Key field
	 * @param  ?mixed  $default  Default value
	 *
	 * @throws Exception
	 * @since  3.3.0
	 * @return mixed
	 */
	public static function getUserState(string $key, mixed $default = null): mixed
	{
		return Factory::getApplication()->getUserState($key, $default);
	}

	/**
	 * Get array input
	 *
	 * @param  string  $name     Name of input
	 * @param  array   $default  Default value
	 *
	 * @throws Exception
	 * @since  3.5.0
	 * @return array
	 */
	public static function inputArray(string $name, array $default): array
	{
		return Factory::getApplication()->getInput()->get($name, $default, 'array');
	}

	/**
	 * Get boolean input
	 *
	 * @param  string  $name     Name of input
	 * @param  bool    $default  Default value
	 *
	 * @throws Exception
	 * @since  3.3.0
	 * @return bool
	 */
	public static function inputBool(string $name, bool $default): bool
	{
		return Factory::getApplication()->getInput()->get($name, $default, 'bool');
	}

	/**
	 * Get files input
	 *
	 * @param  string  $name     Name of input
	 * @param  array   $default  Default value
	 *
	 * @throws Exception
	 * @since  4.0.0
	 * @return array
	 */
	public static function inputFiles(string $name, array $default): array
	{
		return Factory::getApplication()->getInput()->get($name, $default, []);
	}

	/**
	 * Get float input
	 *
	 * @param  string  $name     Name of input
	 * @param  float   $default  Default value
	 *
	 * @throws Exception
	 * @since  4.0.0
	 * @return array
	 */
	public static function inputFloat(string $name, float $default): array
	{
		return Factory::getApplication()->getInput()->get($name, $default, 'float');
	}

	/**
	 * Get integer input
	 *
	 * @param  string  $name     Name of input
	 * @param  int     $default  Default value
	 *
	 * @throws Exception
	 * @since  3.3.0
	 * @return int
	 */
	public static function inputInt(string $name, int $default): int
	{
		return Factory::getApplication()->getInput()->get($name, $default, 'int');
	}

	/**
	 * Get string input
	 *
	 * @param  string   $name     Name of input
	 * @param  ?string  $default  Default value
	 *
	 * @throws Exception
	 * @since  3.3.0
	 * @return ?string
	 */
	public static function inputString(string $name, ?string $default): ?string
	{
		return Factory::getApplication()->getInput()->get($name, $default, 'string');
	}

	/**
	 * Check if using Admin.
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	public static function isAdmin(): bool
	{
		return Factory::getApplication()->isClient('administrator');
	}

	/**
	 * Return a json response
	 *
	 * @param $wrapper
	 *
	 * @since  3.3.0
	 * @return JsonResponse
	 */
	public static function jsonResponse($wrapper): JsonResponse
	{
		return new JsonResponse($wrapper);
	}

	/**
	 * Loads a plugin or module position
	 *
	 * @param  string  $position  Position to load
	 *
	 * @throws Exception
	 * @since  1.0.0
	 * @return string
	 */
	public static function loadInternal(string $position): string
	{
		$context   = 'text';
		$obj       = new stdClass();
		$obj->text = $position;

		PluginHelper::importPlugin('content');
		Factory::getApplication()->triggerEvent('onContentPrepare', [&$context, &$obj, null, 0]);

		return $obj->text;

//		$dispatcher = Factory::getContainer()->get(DispatcherInterface::class);
//
//		PluginHelper::importPlugin('content', null, true, $dispatcher);
//		$dispatcher->dispatch('onContentPrepare', new ContentPrepareEvent('onContentPrepare', [
//			'context' => $context,
//			'subject' => $article,
//			'params'  => $params,
//			'page'    => 0,
//		]));
//
//		return $article->text;


	}

	/**
	 * Log out a user.
	 *
	 * @param  int  $user_id  ID of user
	 *
	 * @throws Exception
	 * @since  1.0.0
	 * @return bool
	 */
	public static function logoutUser(int $user_id): bool
	{
		$options = array(
			'clientid' => 1
		);

		return Factory::getApplication()->logout($user_id, $options);
	}

	/**
	 * Translate language constant
	 *
	 * @param  string  $string  String to translate
	 *
	 * @since  3.2.0
	 * @return string
	 */
	public static function plain(string $string): string
	{
		return Text::_($string);
	}

	/**
	 * Translate language variable
	 *
	 * @param  mixed  ...$string  $string String to pluralise
	 *
	 * @since  3.3.0
	 * @return string
	 */
	public static function plural(...$string): string
	{
		return Text::plural(...$string);
	}

	/**
	 * Redirect
	 *
	 * @param  string  $link    URL
	 * @param  int     $status  HTTP status code
	 *
	 * @throws Exception
	 * @since  3.3.0
	 */
	public static function redirect(string $link, int $status): void
	{
		Factory::getApplication()->redirect($link, $status);
	}

	/**
	 * Register a new user
	 *
	 * @param  string  $name      Name of user
	 * @param  string  $username  Username of user
	 * @param  string  $email     Email of user
	 * @param  string  $password  Generated password
	 *
	 * @throws InvalidArgumentException
	 * @throws RuntimeException
	 * @since  3.3.0
	 * @return int
	 */
	public static function registerUser(string $name, string $username, string $email, string $password): int
	{
		$params         = self::getParams('com_users');
		$defaultGroup[] = $params->get('new_usertype', 2);
		$email          = self::emailToPunycode($email);

		$data = [
			'username'  => $username,
			'name'      => $name,
			'email'     => $email,
			'email1'    => $email,
			'password'  => $password,
			'password1' => $password,
			'password2' => $password,
			'block'     => 0,
			'groups'    => $defaultGroup
		];

		$user = new User();
		if (!$user->bind($data)) {
			throw new InvalidArgumentException(Text::sprintf('COM_USERS_REGISTRATION_BIND_FAILED', $user->getError()));
		}

		PluginHelper::importPlugin('user');
		$user->save();
		if (!$user->id) {
			throw new InvalidArgumentException(Text::sprintf('COM_USERS_REGISTRATION_SAVE_FAILED', $user->getError()));
		}

		return $user->id;
	}

	/**
	 * Get router url
	 *
	 * @param  string  $url    URL
	 * @param  bool    $xhtml  Replace & by &amp; for XML compliance.
	 * @param  int     $ssl    Secure state for the resolved URI.
	 *
	 * @since  3.4.0
	 * @return ?string
	 */
	public static function route(string $url, bool $xhtml = true, int $ssl = 0): ?string
	{
		return Route::_($url, $xhtml, $ssl);
	}

	/**
	 * Send email
	 *
	 * @param  mixed  $from        From email
	 * @param  mixed  $fromName    From name
	 * @param  mixed  $to          To email
	 * @param  mixed  $subject     Subject
	 * @param  mixed  $body        Body
	 * @param  bool   $html        TRUE for html, FALSO for plain text
	 * @param  mixed  $cc          Carbon copy emaiols
	 * @param  mixed  $bcc         Blind carbon copy emails
	 * @param  mixed  $reply       Reply email
	 * @param  mixed  $replyName   Reply name
	 * @param  mixed  $attachment  Attachments
	 *
	 * @throws Exception
	 * @since  1.0.0
	 * @return bool
	 */
	public static function sendEmail(mixed $from,
	                                 mixed $fromName,
	                                 mixed $to,
	                                 mixed $subject,
	                                 mixed $body,
	                                 bool  $html = true,
	                                 mixed $cc = null,
	                                 mixed $bcc = null,
	                                 mixed $reply = null,
	                                 mixed $replyName = null,
	                                 mixed $attachment = null): bool
	{
		$mail = self::getMailer();
		$mail->setSender([$from, $fromName]);
		$mail->addRecipient($to);

		if (is_null($reply)) {
			if (version_compare(JVERSION, '3.5', 'ge')) {
				$mail->addReplyTo($from, $fromName);
			}
			else {
				$mail->addReplyTo([$from,
				                   $fromName
				                  ]);
			}
		}
		else {
			$mail->addReplyTo($reply, $replyName);
		}

		$mail->addCc($cc);
		$mail->addBcc($bcc);
		$mail->addAttachment($attachment);
		$mail->setSubject($subject);
		$mail->isHtml($html);
		$mail->setBody($body);

		if (isset($_SERVER['HTTP_X_REAL_IP'])) {
			$mail->addCustomHeader('X_Real_IP', $_SERVER['HTTP_X_REAL_IP']);
		}
		if (isset($_SERVER['HTTP_X_GT_CLIENTIP'])) {
			$mail->addCustomHeader('X_GTClient_IP', $_SERVER['HTTP_X_GT_CLIENTIP']);
		}

		return $mail->send();
	}

	/**
	 * Set user state
	 *
	 * @param  string  $key    Key field
	 * @param  mixed   $value  Value
	 *
	 * @throws Exception
	 * @since  3.3.0
	 */
	public static function setUserState(string $key, mixed $value): void
	{
		Factory::getApplication()->setUserState($key, $value);
	}

	/**
	 * Translate language variable
	 *
	 * @param  mixed  ...$string  $string String to translate
	 *
	 * @since  3.3.0
	 * @return string
	 */
	public static function sprintf(...$string): string
	{
		return Text::sprintf(...$string);
	}
}