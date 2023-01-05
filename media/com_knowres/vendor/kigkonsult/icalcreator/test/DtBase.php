<?php
/**
 * iCalcreator, the PHP class package managing iCal (rfc2445/rfc5445) calendar information.
 *
 * This file is a part of iCalcreator.
 *
 * @author    Kjell-Inge Gustafsson, kigkonsult <ical@kigkonsult.se>
 * @copyright 2007-2021 Kjell-Inge Gustafsson, kigkonsult, All rights reserved
 * @link      https://kigkonsult.se
 * @license   Subject matter of licence is the software iCalcreator.
 *            The above copyright, link, package and version notices,
 *            this licence notice and the invariant [rfc5545] PRODID result use
 *            as implemented and invoked in iCalcreator shall be included in
 *            all copies or substantial portions of the iCalcreator.
 *
 *            iCalcreator is free software: you can redistribute it and/or modify
 *            it under the terms of the GNU Lesser General Public License as
 *            published by the Free Software Foundation, either version 3 of
 *            the License, or (at your option) any later version.
 *
 *            iCalcreator is distributed in the hope that it will be useful,
 *            but WITHOUT ANY WARRANTY; without even the implied warranty of
 *            MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 *            GNU Lesser General Public License for more details.
 *
 *            You should have received a copy of the GNU Lesser General Public License
 *            along with iCalcreator. If not, see <https://www.gnu.org/licenses/>.
 */
namespace Kigkonsult\Icalcreator;

use DateTime;
use DateTimeInterface;
use Exception;
use Kigkonsult\Icalcreator\Util\DateTimeFactory;
use Kigkonsult\Icalcreator\Util\DateTimeZoneFactory;
use Kigkonsult\Icalcreator\Util\IcalXMLFactory;
use Kigkonsult\Icalcreator\Util\ParameterFactory;
use Kigkonsult\Icalcreator\Util\RecurFactory;
use Kigkonsult\Icalcreator\Util\StringFactory;
use Kigkonsult\Icalcreator\Util\Util;
use PHPUnit\Framework\TestCase;
use SimpleXMLElement;

/**
 * class DtBase
 *
 * @since 2.29.18 2020-01-25
 */
class DtBase extends TestCase
{
    private static string $ERRFMT = "Error %sin case #%s, %s <%s>->%s";

    /**
     * The test method, case prefix '-1x'
     *
     * @param int $case
     * @param array  $compsProps
     * @param mixed  $value
     * @param mixed  $params
     * @param array $expectedGet
     * @param string $expectedString
     * @throws Exception
     */
    public function theTestMethod(
        int    $case,
        array  $compsProps,
        mixed  $value,
        mixed  $params,
        array  $expectedGet,
        string $expectedString
    ) : void
    {
        $c = new Vcalendar();

        foreach( $compsProps as $theComp => $props ) {
            $newMethod = 'new' . $theComp;
            $comp      = $c->{$newMethod}();
            foreach( $props as $propName ) {
                $getMethod    = StringFactory::getGetMethodName( $propName );
                $createMethod = StringFactory::getCreateMethodName( $propName );
                $deleteMethod = StringFactory::getDeleteMethodName( $propName );
                $setMethod    = StringFactory::getSetMethodName( $propName );
                if( IcalInterface::LAST_MODIFIED === $propName ) {
                    $c->setLastmodified( $value, $params );
                }

//              error_log( __FUNCTION__ . ' #' . $case . ' <' . $theComp . '>->' . $propName . ' value : ' . var_export( $value, true )); // test ###

                if( in_array( $propName, [ IcalInterface::EXDATE, IcalInterface::RDATE ], true ) ) {
                    $comp->{$setMethod}( [ $value ], $params );
                    $getValue = $comp->{$getMethod}( null, true );
                    if( ! empty( $getValue[Util::$LCvalue] )) {
                        $getValue[Util::$LCvalue] = reset( $getValue[Util::$LCvalue] );
                    }
                }
                else {
                    if( in_array( $propName, [ IcalInterface::DTEND, IcalInterface::DUE, IcalInterface::RECURRENCE_ID, ], true ) ) {
                        $comp->setDtstart( $value, $params );
                    }
                    $comp->{$setMethod}( $value, $params );
                    $getValue = $comp->{$getMethod}( true );
                }

                if( $expectedGet[Util::$LCvalue] instanceof DateTime &&
                    $getValue[Util::$LCvalue] instanceof DateTime ) {
                    ParameterFactory::ifExistRemove( $getValue[Util::$LCparams], Util::$ISLOCALTIME );
                    $this->assertEquals(
                        $expectedGet[Util::$LCparams],
                        $getValue[Util::$LCparams],
                        sprintf( self::$ERRFMT, null, $case . '-11a', __FUNCTION__, $theComp, $getMethod )
                    );
                    switch( true ) {
                        case ParameterFactory::isParamsValueSet( $expectedGet, IcalInterface::DATE ) :
                            $fmt = DateTimeFactory::$Ymd;
                            break;
                        case isset( $getValue[Util::$LCparams][Util::$ISLOCALTIME] ) :
                            $fmt = DateTimeFactory::$YmdHis;
                            break;
                        default :
                            $fmt = DateTimeFactory::$YMDHISe;
                            break;
                    }
                    $this->assertEquals(
                        $expectedGet[Util::$LCvalue]->format( $fmt ),
                        $getValue[Util::$LCvalue]->format( $fmt ),
                        sprintf( self::$ERRFMT, null, $case . '-11b', __FUNCTION__, $theComp, $getMethod )
                    );
                }
                $this->assertEquals(
                    strtoupper( $propName ) . $expectedString,
                    trim( $comp->{$createMethod}() ),
                    sprintf( self::$ERRFMT, null, $case . '-12', __FUNCTION__, $theComp, $createMethod )
                );
                $comp->{$deleteMethod}();
                if( IcalInterface::DTSTAMP === $propName ) {
                    $this->assertNotFalse(
                        $comp->{$getMethod}(),
                        sprintf( self::$ERRFMT, '(after delete) ', $case . '-13', __FUNCTION__, $theComp, $getMethod )
                    );
                }
                else {
                    $this->assertFalse(
                        $comp->{$getMethod}(),
                        sprintf( self::$ERRFMT, '(after delete) ', $case . '-14', __FUNCTION__, $theComp, $getMethod )
                    );
                }
                $comp->{$setMethod}( $value, $params );
            } // end foreach
        } // end foreach

        $this->parseCalendarTest( $case, $c, $expectedString, $theComp, $propName );
    }

    /**
     * The test method 1b, single EXDATE + RDATE, case prefix '-1bx'
     *
     * @param int|string $case
     * @param array       $compsProps
     * @param mixed       $value
     * @param mixed       $params
     * @param array $expectedGet
     * @param string $expectedString
     * @throws Exception
     */
    public function theTestMethod1b(
        int | string $case,
        array        $compsProps,
        mixed        $value,
        mixed        $params,
        array        $expectedGet,
        string       $expectedString
    ) : void
    {
        $c = new Vcalendar();
        foreach( $compsProps as $theComp => $props ) {
            $newMethod = 'new' . $theComp;
            $comp      = $c->{$newMethod}();
            foreach( $props as $propName ) {
                $getMethod    = StringFactory::getGetMethodName( $propName );
                $createMethod = StringFactory::getCreateMethodName( $propName );
                $deleteMethod = StringFactory::getDeleteMethodName( $propName );
                $setMethod    = StringFactory::getSetMethodName( $propName );
                //              error_log( __FUNCTION__ . ' #' . $case . '-1b1' . ' <' . $theComp . '>->' . $propName . ' value : ' . var_export( $value, true )); // test ###

                $comp->{$setMethod}( $value, $params );
                $getValue = $comp->{$getMethod}( null, true );
                ParameterFactory::ifExistRemove( $getValue[Util::$LCparams], Util::$ISLOCALTIME );
                $this->assertEquals(
                    $expectedGet[Util::$LCparams],
                    $getValue[Util::$LCparams],
                    sprintf( self::$ERRFMT, null, $case . '-1b2', __FUNCTION__, $theComp, $getMethod )
                );
                if( ! empty( $expectedGet[Util::$LCvalue] )) {
                    $expVal = $expectedGet[Util::$LCvalue];

                    // echo __FUNCTION__ . ' ' . $getMethod . ' ' . var_export( $expectedGet, true ) . PHP_EOL; // test ###

                    switch( true ) {
                        case ParameterFactory::isParamsValueSet( $expectedGet, IcalInterface::DATE ) :
                            $fmt = DateTimeFactory::$Ymd;
                            break;
                        case isset( $getValue[Util::$LCparams][Util::$ISLOCALTIME] ) :
                            $fmt = DateTimeFactory::$YmdHis;
                            break;
                        default :
                            $fmt = DateTimeFactory::$YMDHISe;
                            break;
                    }
                    while( is_array( $expVal ) && ! $expVal instanceof DateTime ) {
                        $expVal = reset( $expVal );
                    }
                    $expGet = $expVal->format( $fmt );
                    $getVal = reset( $getValue[Util::$LCvalue] );
                    while( is_array( $getVal ) && ! $getVal instanceof DateTime ) {
                        $getVal = reset( $getVal );
                    }
                    $getVal = $getVal->format( $fmt );
                } // end if
                else {
                    $expGet = $expectedGet;
                    $getVal = $getValue;
                }
                $this->assertEquals(
                    $expGet,
                    $getVal,
                    sprintf( self::$ERRFMT, null, $case . '-1b3', __FUNCTION__, $theComp, $getMethod )
                );
                $this->assertEquals(
                    strtoupper( $propName ) . $expectedString,
                    trim( $comp->{$createMethod}() ),
                    sprintf( self::$ERRFMT, null, $case . '-1b4', __FUNCTION__, $theComp, $createMethod )
                );
                $comp->{$deleteMethod}();
                if( IcalInterface::DTSTAMP === $propName ) {
                    $this->assertNotFalse(
                        $comp->{$getMethod}(),
                        sprintf( self::$ERRFMT, '(after delete) ', $case . '-1b5', __FUNCTION__, $theComp, $getMethod )
                    );
                }
                else {
                    $this->assertFalse(
                        $comp->{$getMethod}(),
                        sprintf( self::$ERRFMT, '(after delete) ', $case . '-1b6', __FUNCTION__, $theComp, $getMethod )
                    );
                }
                $comp->{$setMethod}( $value, $params );
                $comp->{$setMethod}( $value, $params );
                if( ! empty( $value ) ) {
                    $comp->{$setMethod}( [ $value, $value ], $params );
                }
            } // end foreach
        } // end foreach

        $this->parseCalendarTest( $case, $c, $expectedString );
    }

    /**
     * Testing calendar parse and (-re-)create, case prefix '-3x'
     *
     * @param int|string $case
     * @param Vcalendar   $calendar
     * @param string|null $expectedString
     * @param mixed|null $theComp
     * @param string|null $propName
     * @throws Exception
     */
    public function parseCalendarTest(
        int | string $case,
        Vcalendar    $calendar,
        string       $expectedString = null,
        mixed        $theComp = null,
        string       $propName = null
    ) : void
    {
        static $xmlStartChars = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<icalendar xmlns=\"urn:ietf:params:xml:ns:icalendar-2.0\"><!-- kigkonsult.se iCalcreator";
        static $xmlEndChars   = "</icalendar>\n";

//      echo $case . ' ' . __FUNCTION__ . ' ' . $theComp . '::' . $propName . ' start' . PHP_EOL; // test ###

        $calendarStr1 = $calendar->createCalendar();

        if( ! empty( $expectedString )) {
            $createString = str_replace( [ Util::$CRLF . ' ', Util::$CRLF ], Util::$SP0, $calendarStr1 );
            $createString = str_replace( '\,', ',', $createString );
            $this->assertNotFalse(
                strpos( $createString, $expectedString ),
                sprintf( self::$ERRFMT, null, $case . '-31', __FUNCTION__, $theComp, $propName )
            );
        }

        if( ! empty( $expectedString )) {

            // echo 'start convert to XML' . PHP_EOL; // test ###

            $calendarUid = $calendar->getUid();
            $xml = IcalXMLFactory::iCal2XML( $calendar );

            $this->assertStringStartsWith( $xmlStartChars, $xml );
            $this->assertNotFalse( strpos( $xml, Vcalendar::iCalcreatorVersion()));
            $this->assertStringEndsWith( $xmlEndChars, $xml );
            try {
                $test = new SimpleXMLElement( $xml );
            }
            catch( Exception $e ) {
                $this->fail(
                    sprintf( self::$ERRFMT, null, $case . '-32', __FUNCTION__, $theComp, $propName )
                );
            }

            // echo 'start XML convert to iCal' . PHP_EOL; // test ###
            $c2  = IcalXMLFactory::XML2iCal( $xml );
            $this->assertTrue(
                ( $c2 instanceof Vcalendar ),
                sprintf( self::$ERRFMT, null, $case . '-33', __FUNCTION__, $theComp, $propName )
            );

            // echo 'start create calendar' . PHP_EOL; // test ###

            $c2->setUid( $calendarUid ); // else UID compare error
            $calendarStr2 = $c2->createCalendar();
            $this->assertEquals(
                $calendarStr1,
                $calendarStr2,
                sprintf( self::$ERRFMT, null, $case . '-34', __FUNCTION__, $theComp, $propName )
                . PHP_EOL . str_replace( '><', '>' . PHP_EOL . '<', $xml ) . PHP_EOL
            );
        } // end if
        else {
            $calendarStr2 = $calendarStr1;
        }

//      echo __FUNCTION__ . ' start #' . $case . ' calendar2 : ' . $calendarStr2 . PHP_EOL; // test ###

        $calendar3    = new Vcalendar();
        $calendar3->parse( $calendarStr2 );
        $calendarStr3 = $calendar3->createCalendar();
        $this->assertEquals(
            $calendarStr1,
            $calendarStr3,
            sprintf( self::$ERRFMT, null, $case . '-35', __FUNCTION__, $theComp, $propName )
        );
        ob_start();
        $calendar3->returnCalendar();
        $hdrs = PHP_SAPI === 'cli' ? xdebug_get_headers() : headers_list();
        $out3 = ob_get_clean();

        // testing start -> issue Google Calendar issue - 1 Character is missing in output #93
        $calEnd = 'END:VCALENDAR' . Util::$CRLF;
        $this->assertTrue(
            str_ends_with( $calendarStr1, $calEnd ),
            sprintf( self::$ERRFMT, null, $case . '-36a', __FUNCTION__, $theComp, $propName )
        );
        $this->assertTrue(
            str_ends_with( $out3, $calEnd ),
            sprintf( self::$ERRFMT, null, $case . '-36b', __FUNCTION__, $theComp, $propName )
        );
        $this->assertEquals(
            strlen( $calendarStr1 ),
            strlen( $out3 ),
            sprintf( self::$ERRFMT, null, $case . '-36c', __FUNCTION__, $theComp, $propName )
        );
        $needle = 'Content-Length: ';
        $contentLength = 0;
        foreach( $hdrs as $hdr ) {
            if( str_starts_with( strtolower( $hdr ), strtolower( $needle ))) {
                $contentLength = trim( StringFactory::after( $needle, $hdr ));
                break;
            }
        }
        $exp = strlen( $out3 );
        $this->assertEquals(
            $exp,
            $contentLength,
            'Error in case #' . $case . ' -36d, ' . __FUNCTION__ . ' exp: ' . $exp . ', found: ' . var_export( $hdrs, true )
        );
        // testing end -> issue Google Calendar issue - 1 Character is missing in output #93

        $this->assertEquals(
            $calendarStr1,
            $out3,
            sprintf( self::$ERRFMT, null, $case . '-36e', __FUNCTION__, $theComp, $propName )
        );
    }

    /**
     * Return the datetime as assoc array
     *
     * @param DateTime $dateTime
     * @return array
     */
    public function getDateTimeAsArray( DateTime $dateTime ) : array
    {
        $output =  [
            RecurFactory::$LCYEAR  => $dateTime->format( 'Y' ),
            RecurFactory::$LCMONTH => $dateTime->format( 'm' ),
            RecurFactory::$LCDAY   => $dateTime->format( 'd' ),
            RecurFactory::$LCHOUR  => $dateTime->format( 'H' ),
            RecurFactory::$LCMIN   => $dateTime->format( 'i' ),
            RecurFactory::$LCSEC   => $dateTime->format( 's' ),
        ];
        if( DateTimeZoneFactory::isUTCtimeZone( $dateTime->getTimezone()->getName() )) {
            $output[RecurFactory::$LCtz] = 'Z';
        }
        return $output;
    }

    /**
     * Return the datetime as (ical create-) long string
     *
     * @param DateTimeInterface $dateTime
     * @param string|null $tz
     * @return string
     */
    public function getDateTimeAsCreateLongString( DateTimeInterface $dateTime, string $tz = null ) : string
    {
        static $FMT1   = ';TZID=%s:';
        $isUTCtimeZone = ! ( empty( $tz ) ) && DateTimeZoneFactory::isUTCtimeZone( $tz );
        $output        = ( empty( $tz ) || $isUTCtimeZone ) ? Util::$COLON : sprintf( $FMT1, $tz );
        $output       .= $dateTime->format( DateTimeFactory::$YmdTHis );
        if( $isUTCtimeZone ) {
            $output   .= 'Z';
        }
        return $output;
    }

    /**
     * Return the datetime as (ical create-) short string
     *
     * @param DateTimeInterface $dateTime
     * @param bool $prefix
     * @return string
     */
    public function getDateTimeAsCreateShortString( DateTimeInterface $dateTime, bool $prefix = true ) : string
    {
        static $FMT1 = ';VALUE=DATE:%d';
        static $FMT2 = ':%d';
        $fmt = $prefix ? $FMT1 : $FMT2;
        return sprintf( $fmt, $dateTime->format( DateTimeFactory::$Ymd ));
    }
}
