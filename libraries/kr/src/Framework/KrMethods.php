<?php
/**
 * @package     Know Reservations
 * @subpackage  Library
 * @copyright   Copyright (C) 2020 Highland Vision. All rights reserved.
 * @license     See the file LICENSE.txt for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\KR\Framework;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Joomla\FMethods as FNS;
use HighlandVision\KR\SiteHelper;
use Joomla\CMS\Cache\Cache;
use Joomla\CMS\Language\Language;
use Joomla\CMS\Layout\FileLayout;
use Joomla\CMS\Response\JsonResponse;
use Joomla\CMS\Uri\Uri;
use Joomla\CMS\User\User;
use Joomla\Registry\Registry;
use Joomla\Session\SessionInterface;
use RuntimeException;

use function defined;

use const JPATH_COMPONENT_ADMINISTRATOR;

const OPTION = 'com_knowres';

/**
 * Methods for KR (currently just Joomla)
 *
 * @since  3.0.0
 */
class KrMethods
{
	/**`
	 * Create log entry
	 *
	 * @param  mixed    $entry
	 * @param  integer  $priority
	 * @param  string   $category
	 * @param  ?string  $date
	 * @param  array    $context
	 *
	 * @since 3.7.0
	 */
	public static function addLog(mixed $entry, int $priority = 64, string $category = 'com_knowres',
		?string $date = null, array $context = []): void
	{
		FNS::addLogLog($entry, $priority, $category, $date, $context);
	}

	/**
	 * Create logging options
	 *
	 * @param  array  $options     Options
	 * @param  array  $categories  Categories
	 *
	 * @since 3.7.0
	 */
	public static function addLogLogger(array $options, array $categories): void
	{
		FNS::addLogLogger($options, $categories);
	}

	/**
	 * Set class to adjust site width for some forms
	 *
	 * @since  4.0.0
	 * @return string
	 */
	public static function adjustForWidth(): string
	{
		$width = KrMethods::getParams()->get('property_template_width', '960');
		if ($width <= 1024)
		{
			$class = "small-12 columns";
		}
		else if ($width <= 1366)
		{
			$class = "small-12 large-8 large-offset-2 columns";
		}
		else
		{
			$class = "small-12 large-6 large-offset-3 columns";
		}

		return $class;
	}

	/**
	 * Build select list
	 *
	 * @param  array   $data       Options array with key / value
	 * @param  string  $name       Name of select
	 * @param  mixed   $attribs    See genericlist
	 * @param  string  $optKey     See genericlist
	 * @param  string  $optText    See genericlist
	 * @param  null    $selected   See genericlist
	 * @param  string  $idtag      See genericlist
	 * @param  bool    $translate  See genericlist
	 *
	 * @since  3.3.0
	 * @return mixed
	 */
	public static function buildSelect(array $data, string $name, mixed $attribs = null, string $optKey = 'value',
		string $optText = 'text', $selected = null, string $idtag = '', bool $translate = false): mixed
	{
		return FNS::buildSelect($data, $name, $attribs, $optKey, $optText, $selected, $idtag, $translate);
	}

	/**
	 * Remoce cached data
	 *
	 * @param  string  $name  Name of cache
	 *
	 * @since  3.2.0
	 */
	public static function cleanCache(string $name): void
	{
		$options = [
			'cachebase'    => JPATH_ADMINISTRATOR . '/cache',
			'caching'      => true,
			'defaultgroup' => $name
		];

		$cache = self::getCache($options);
		$cache->clean($name);
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
		return FNS::emailToPunycode($email);
	}

	/**
	 * Get article
	 *
	 * @param  int  $article_id  ID of article
	 *
	 * @throws Exception
	 * @since  3.3.0
	 * @return mixed
	 */
	public static function getArticle(int $article_id): mixed
	{
		return FNS::getArticle($article_id);
	}

	/**
	 * Get uri base
	 *
	 * @since  1.0.0
	 * @return string
	 */
	public static function getBase(): string
	{
		return FNS::getBase();
	}

	/**
	 * Get cache instance
	 *
	 * @param  array  $options  Cache options
	 *
	 * @since  3.2.0
	 * @return Cache
	 */
	public static function getCache(array $options): Cache
	{
		return FNS::getCache($options);
	}

	/**
	 * Get a configuration value
	 *
	 * @param  string  $value    Config value to return
	 * @param  null    $default  The default return value
	 *
	 * @throws Exception
	 * @since  3.5.0
	 * @return mixed
	 */
	public static function getCfg(string $value, $default = null): mixed
	{
		return FNS::getCfg($value, $default);
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
		return FNS::getCookie($name);
	}

	/**
	 * Get default language
	 *
	 * @param  string  $area  'site' or 'administrator'
	 *
	 * @since  3.5.0
	 * @return mixed
	 */
	public static function getDefaultLanguage(string $area = 'administrator'): mixed
	{
		return FNS::getDefaultLanguage($area);
	}

	/**
	 * Get Joomla session
	 *
	 * @throws Exception
	 * @since  3.3.0
	 * @return SessionInterface
	 */
	public static function getSession(): SessionInterface
	{
		return FNS::getSession();
	}

	/**
	 * Get uri instance
	 *
	 * @since  1.0.0
	 * @return Uri
	 */
	public static function getInstance(): Uri
	{
		return FNS::getInstance();
	}

	/**
	 * Get current language tag
	 *
	 * @since  3.3.0
	 * @return ?Language
	 */
	public static function getLanguage(): ?Language
	{
		return FNS::getLanguage();
	}

	/**
	 * Get current language tag
	 *
	 * @since  3.2.0
	 * @return string
	 */
	public static function getLanguageTag(): string
	{
		return FNS::getLanguageTag();
	}

	/**
	 * Get languages
	 *
	 * @since  3.3.0
	 * @return array
	 */
	public static function getLanguages(): array
	{
		return FNS::getLanguages();
	}

	/**
	 * Get layout to use
	 * Admin checks for admin layouts, site template layouts and finally site layouts
	 * Site checks for site template and site layouts
	 *
	 * @param  string  $name  Name of layout
	 *
	 * @throws Exception
	 * @since  3.2.0
	 * @return FileLayout
	 */
	public static function getLayout(string $name): FileLayout
	{
		if (self::isAdmin())
		{
			$paths[] = JPATH_COMPONENT_ADMINISTRATOR . '/layouts';

			$site_template = SiteHelper::getSiteTemplate();
			if ($site_template)
			{
				$paths[] = JPATH_SITE . '/templates/' . $site_template . '/html/layouts/' . OPTION;
			}
		}
		else
		{
			$template = self::getTemplate();
			$paths[]  = JPATH_SITE . '/templates/' . $template . '/html/layouts/' . OPTION;
		}

		$paths[] = JPATH_SITE . '/components/' . OPTION . '/layouts';

		$layout = FNS::getLayout($name);
		$layout->addIncludePaths($paths);

		return $layout;
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
		return FNS::getMenuItemByLink($link);
	}

	/**
	 * Get component params
	 *
	 * @param  string  $component  Component name
	 *
	 * @since  3.2.0
	 * @return Registry
	 */
	public static function getParams(string $component = OPTION): Registry
	{
		return FNS::getParams($component);
	}

	/**
	 * Get uri root
	 *
	 * @since  1.0.0
	 * @return string
	 */
	public static function getRoot(): string
	{
		return FNS::getRoot();
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
		return FNS::getTemplate();
	}

	/**
	 * Get user
	 *
	 * @param  ?int  $id  ID of user or null for current
	 *
	 * @throws Exception
	 * @since  3.2.0
	 * @return User
	 */
	public static function getUser(?int $id = null): User
	{
		return FNS::getUser($id);
	}

	/**
	 * Get state
	 *
	 * @param  string  $key      State key
	 * @param  mixed   $default  Default value
	 *
	 * @throws Exception
	 * @since  3.3.0
	 * @return mixed
	 */
	public static function getUserState(string $key, mixed $default = null): mixed
	{
		return FNS::getUserState($key, $default);
	}

	/**
	 * Get user input
	 *
	 * @param  string  $name     Name of input
	 * @param  array   $default  Default value
	 * @param  string  $method   Input type
	 *
	 * @throws Exception
	 * @since  3.3.0
	 * @return array
	 */
	public static function inputArray(string $name, array $default = [], string $method = 'post'): array
	{
		return FNS::inputArray($name, $default, $method);
	}

	/**
	 * Get user input
	 *
	 * @param  string  $name     Name of input
	 * @param  bool    $default  Default value
	 * @param  string  $method   Input type   True for POST o/w GET
	 *
	 * @throws Exception
	 * @since  3.3.0
	 * @return bool
	 */
	public static function inputBool(string $name, bool $default = false, string $method = 'post'): bool
	{
		return FNS::inputBool($name, $default, $method);
	}

	/**
	 * Get user input
	 *
	 * @param  string  $name     Name of input
	 * @param  array   $default  Default value
	 *
	 * @throws Exception
	 * @since  3.3.0
	 * @return array
	 */
	public static function inputFiles(string $name, array $default = []): array
	{
		return FNS::inputFiles($name, $default);
	}

	/**
	 * Get user input
	 *
	 * @param  string  $name     Name of input
	 * @param  float   $default  Default value
	 * @param  string  $method   Input type
	 *
	 * @throws Exception
	 * @since  3.3.0
	 * @return float
	 */
	public static function inputFloat(string $name, float $default = 0.00, string $method = 'post'): float
	{
		return FNS::inputFloat($name, $default, $method);
	}

	/**
	 * Get user input
	 *
	 * @param  string  $name     Name of input
	 * @param  int     $default  Default value
	 * @param  string  $method   Input type
	 *
	 * @throws Exception
	 * @since  3.3.0
	 * @return int
	 */
	public static function inputInt(string $name, int $default = 0, string $method = 'post'): int
	{
		return FNS::inputInt($name, $default, $method);
	}

	/**
	 * Get user input
	 *
	 * @param  string   $name     Name of input
	 * @param  ?string  $default  Default value
	 * @param  string   $method   Input type
	 *
	 * @throws Exception
	 * @since  3.3.0
	 * @return ?string
	 */
	public static function inputString(string $name, ?string $default = null, string $method = 'post'): ?string
	{
		return FNS::inputString($name, $default, $method);
	}

	/**
	 * Return true for admin login
	 *
	 * @throws Exception
	 * @since  3.3.0
	 * @return bool
	 */
	public static function isAdmin(): bool
	{
		return FNS::isAdmin();
	}

	/**
	 * Return a json response
	 *
	 * @param  array  $wrapper  Json wrapper
	 *
	 * @since  3.3.0
	 * @return JsonResponse
	 */
	public static function jsonResponse(array $wrapper): JsonResponse
	{
		return FNS::jsonResponse($wrapper);
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
		return FNS::loadInternal($position);
	}

	/**
	 * Logger out a user.
	 *
	 * @param  int  $user_id  ID of user
	 *
	 * @throws Exception
	 * @since  1.0.0
	 * @return bool
	 */
	public static function logoutUser(int $user_id): bool
	{
		return FNS::logoutUser($user_id);
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
	public static function message(string $message, string $type = 'message'): void
	{
		FNS::enqueueMessage($message, $type);
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
		return FNS::plain($string);
	}

	/**
	 * Translate language plural
	 *
	 * @param  mixed  ...$string  String to pluralise
	 *
	 * @since  3.3.0
	 * @return string
	 */
	public static function plural(...$string): string
	{
		return FNS::plural(...$string);
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
	public static function redirect(string $link, int $status = 303): void
	{
		FNS::redirect($link, $status);
	}

	/**
	 * Register a new user
	 *
	 * @param  string  $name      Name of user
	 * @param  string  $username  Username of user
	 * @param  string  $email     Email of user
	 * @param  string  $password  Generated password
	 *
	 * @throws RuntimeException
	 * @since  3.9.0
	 * @return int
	 */
	public static function registerUser(string $name, string $username, string $email, string $password): int
	{
		return FNS::registerUser($name, $username, $email, $password);
	}

	/**
	 * Method to render the layout.
	 *
	 * @param  string             $name  Dot separated path to the layout file, relative to base path
	 * @param  object|array|null  $data  Display fields in array
	 *
	 * @throws Exception
	 * @since  3.1.0
	 * @return string
	 */
	public static function render(string $name, object|array|null $data = []): string
	{
		$layout = self::getLayout($name);

		return $layout->render($data);
	}

	/**
	 * Get router url
	 *
	 * @param  string  $url    URL
	 * @param  bool    $xhtml  Replace & by &amp; for XML compliance.
	 * @param  int     $ssl    Secure state for the resolved URI.
	 *
	 * @since  3.3.0
	 * @return ?string
	 */
	public static function route(string $url, bool $xhtml = true, int $ssl = 0): ?string
	{
		return FNS::route($url, $xhtml, $ssl);
	}

	/**
	 * Send email
	 *
	 * @param  mixed       $from        From email
	 * @param  mixed       $fromName    From name
	 * @param  mixed       $to          To email
	 * @param  mixed       $subject     Subject
	 * @param  mixed       $body        Body
	 * @param  bool        $html        TRUE for html, FALSO for plain text
	 * @param  mixed|null  $cc          Carbon copy emaiols
	 * @param  mixed|null  $bcc         Blind carbon copy emails
	 * @param  mixed|null  $reply       Reply email
	 * @param  mixed|null  $replyName   Reply name
	 * @param  mixed|null  $attachment  Attachments
	 *
	 * @throws Exception
	 * @since  2.3.0
	 */
	public static function sendEmail(
		mixed $from, mixed $fromName, mixed $to, mixed $subject, mixed $body, bool $html = true, mixed $cc = null,
		mixed $bcc = null, mixed $reply = null, mixed $replyName = null, mixed $attachment = null): void
	{
		FNS::sendEmail($from, $fromName, $to, $subject, $body, $html, $cc, $bcc, $reply, $replyName,
			$attachment);
	}

	/**
	 * Set state
	 *
	 * @param  string  $key    State key
	 * @param  mixed   $value  State default value
	 *
	 * @throws Exception
	 * @since  3.3.0
	 */
	public static function setUserState(string $key, mixed $value): void
	{
		FNS::setUserState($key, $value);
	}

	/**
	 * Translate language variable
	 *
	 * @param  mixed  ...$string  $string String to translate
	 *
	 * @since  3.2.0
	 * @return string
	 */
	public static function sprintf(...$string): string
	{
		return FNS::sprintf(...$string);
	}
}