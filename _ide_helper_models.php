<?php

// @formatter:off
/**
 * A helper file for your Eloquent Models
 * Copy the phpDocs from this file to the correct Model,
 * And remove them from this file, to prevent double declarations.
 *
 * @author Barry vd. Heuvel <barryvdh@gmail.com>
 */


namespace App{
/**
 * App\SessionUser
 *
 * @property int $id
 * @property int $user_id
 * @property int $session_client
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Client $client
 * @property-read \App\User $user
 * @method static \Illuminate\Database\Eloquent\Builder|\App\SessionUser bySessionUserId($id)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\SessionUser newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\SessionUser newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\SessionUser query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\SessionUser userId($id)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\SessionUser whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\SessionUser whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\SessionUser whereSessionClient($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\SessionUser whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\SessionUser whereUserId($value)
 */
	class SessionUser extends \Eloquent {}
}

namespace App{
/**
 * App\AgentSale
 *
 * @property int $agent_sale_id
 * @property int $invoice_id
 * @property int $agent_id
 * @property string|null $first_name
 * @property string|null $last_name
 * @property string|null $address
 * @property string|null $city
 * @property string|null $state
 * @property string|null $postal_code
 * @property int $status_type
 * @property float $amount
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\AgentSale newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\AgentSale newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\AgentSale query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\AgentSale whereAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\AgentSale whereAgentId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\AgentSale whereAgentSaleId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\AgentSale whereAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\AgentSale whereCity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\AgentSale whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\AgentSale whereFirstName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\AgentSale whereInvoiceId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\AgentSale whereLastName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\AgentSale wherePostalCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\AgentSale whereState($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\AgentSale whereStatusType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\AgentSale whereUpdatedAt($value)
 */
	class AgentSale extends \Eloquent {}
}

namespace App{
/**
 * App\Agent
 *
 * @property int $agent_id
 * @property int|null $user_id
 * @property string $first_name
 * @property string $last_name
 * @property int|null $manager_id
 * @property bool $is_manager
 * @property bool $is_active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Agent[] $children
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\SalesPairing[] $pairings
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\PayrollDetail[] $payrollDetails
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Payroll[] $payrolls
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\DailySale[] $sales
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\SalesPairing[] $salesPairings
 * @property-read \App\User $user
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Agent activeOnly($activeOnly)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Agent byActiveType($activeType)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Agent byAgentId($agentId)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Agent byManager($managerId)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Agent byUser($userId)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Agent managerId($managerId)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Agent newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Agent newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Agent query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Agent whereAgentId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Agent whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Agent whereFirstName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Agent whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Agent whereIsManager($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Agent whereLastName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Agent whereManagerId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Agent whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Agent whereUserId($value)
 */
	class Agent extends \Eloquent {}
}

namespace App{
/**
 * App\Campaign
 *
 * @property int $campaign_id
 * @property int $client_id
 * @property string $name
 * @property bool $active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property float|null $compensation
 * @property string|null $md_details
 * @property string|null $md_onboarding
 * @property string|null $md_other
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Payroll[] $payrolls
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Utility[] $utilities
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Campaign active($activeOnly = false)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Campaign byCampaign($id)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Campaign byCampaignName($name)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Campaign byClientId($clientId)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Campaign newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Campaign newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Campaign query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Campaign whereActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Campaign whereCampaignId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Campaign whereClientId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Campaign whereCompensation($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Campaign whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Campaign whereMdDetails($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Campaign whereMdOnboarding($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Campaign whereMdOther($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Campaign whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Campaign whereUpdatedAt($value)
 */
	class Campaign extends \Eloquent {}
}

namespace App{
/**
 * App\Override
 *
 * @property int $override_id
 * @property int $payroll_details_id
 * @property int $agent_id
 * @property int $units
 * @property float $amount
 * @property int $modified_by
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Agent $agent
 * @property-read \App\PayrollDetail $payrollDetails
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Override byOverride($id)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Override byOverrideList($ids)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Override newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Override newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Override query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Override whereAgentId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Override whereAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Override whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Override whereModifiedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Override whereOverrideId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Override wherePayrollDetailsId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Override whereUnits($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Override whereUpdatedAt($value)
 */
	class Override extends \Eloquent {}
}

namespace App{
/**
 * App\ClientOptions
 *
 * @property int $options_id
 * @property int $client_id
 * @property bool $has_onboarding
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Client $client
 * @method static \Illuminate\Database\Eloquent\Builder|\App\ClientOptions clientId($clientId)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\ClientOptions newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\ClientOptions newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\ClientOptions query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\ClientOptions whereClientId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\ClientOptions whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\ClientOptions whereHasOnboarding($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\ClientOptions whereOptionsId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\ClientOptions whereUpdatedAt($value)
 */
	class ClientOptions extends \Eloquent {}
}

namespace App{
/**
 * App\Remark
 *
 * @property int $remark_id
 * @property string $description
 * @property int $modified_by
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\DailySale[] $dailySale
 * @property-read \App\User $user
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Remark newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Remark newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Remark query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Remark whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Remark whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Remark whereModifiedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Remark whereRemarkId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Remark whereUpdatedAt($value)
 */
	class Remark extends \Eloquent {}
}

namespace App{
/**
 * App\Utility
 *
 * @property int $utility_id
 * @property int|null $campaign_id
 * @property string|null $commodity
 * @property int|null $agent_company_id
 * @property string $agent_company_name
 * @property string|null $utility_name
 * @property string|null $meter_number
 * @property string|null $classification
 * @property float|null $price
 * @property string|null $unit_of_measure
 * @property int|null $term
 * @property bool $is_active
 * @property int $modified_by
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Campaign|null $campaign
 * @property-read \App\User $user
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Utility byActiveStatus($isActive)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Utility byCampaign($campaignId)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Utility byUtility($utilityId)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Utility newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Utility newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Utility query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Utility whereAgentCompanyId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Utility whereAgentCompanyName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Utility whereCampaignId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Utility whereClassification($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Utility whereCommodity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Utility whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Utility whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Utility whereMeterNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Utility whereModifiedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Utility wherePrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Utility whereTerm($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Utility whereUnitOfMeasure($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Utility whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Utility whereUtilityId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Utility whereUtilityName($value)
 */
	class Utility extends \Eloquent {}
}

namespace App{
/**
 * App\Payroll
 *
 * @property int $payroll_id
 * @property int $pay_cycle_id
 * @property int $client_id
 * @property int $campaign_id
 * @property string|null $week_ending
 * @property bool $is_released
 * @property string|null $release_date
 * @property bool $is_automated
 * @property string|null $automated_release
 * @property int $modified_by
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property-read \App\Campaign $campaign
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\PayrollDetail[] $details
 * @property-read \App\PayCycle $payCycle
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Payroll byClient($clientId)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Payroll byPayroll($payrollId)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Payroll byPayrollList($payrollIds)
 * @method static bool|null forceDelete()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Payroll newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Payroll newQuery()
 * @method static \Illuminate\Database\Query\Builder|\App\Payroll onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Payroll query()
 * @method static bool|null restore()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Payroll whereAutomatedRelease($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Payroll whereCampaignId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Payroll whereClientId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Payroll whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Payroll whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Payroll whereIsAutomated($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Payroll whereIsReleased($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Payroll whereModifiedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Payroll wherePayCycleId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Payroll wherePayrollId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Payroll whereReleaseDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Payroll whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Payroll whereWeekEnding($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Payroll withTrashed()
 * @method static \Illuminate\Database\Query\Builder|\App\Payroll withoutTrashed()
 */
	class Payroll extends \Eloquent {}
}

namespace App{
/**
 * App\User
 *
 * @property int $id
 * @property string $first_name
 * @property string $last_name
 * @property string $username
 * @property string $email
 * @property string $password
 * @property string|null $remember_token
 * @property bool $active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Agent $agent
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Client[] $clients
 * @property-read \App\UserDetail $detail
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection|\Illuminate\Notifications\DatabaseNotification[] $notifications
 * @property-read \App\Role $role
 * @property-read \App\SessionUser $sessionUser
 * @property-read \Illuminate\Database\Eloquent\Collection|\Laravel\Passport\Token[] $tokens
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User active()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User isActiveByBool($activeOnly = true)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User userId($userId)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User username($username)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereFirstName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereLastName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User wherePassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereRememberToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereUsername($value)
 */
	class User extends \Eloquent {}
}

namespace App{
/**
 * App\Role
 *
 * @property int $user_id
 * @property int $role
 * @property bool $is_sales_admin
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\User $user
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Role activeOnly()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Role byRoleId($id)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Role inactiveOnly()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Role newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Role newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Role query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Role userId($userId)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Role whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Role whereIsSalesAdmin($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Role whereRole($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Role whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Role whereUserId($value)
 */
	class Role extends \Eloquent {}
}

namespace App{
/**
 * App\SaleStatus
 *
 * @property int $sale_status_id
 * @property int $client_id
 * @property string $name
 * @property bool $is_active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Client $client
 * @method static \Illuminate\Database\Eloquent\Builder|\App\SaleStatus byClientId($clientId)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\SaleStatus bySaleStatusId($id)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\SaleStatus newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\SaleStatus newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\SaleStatus query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\SaleStatus whereClientId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\SaleStatus whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\SaleStatus whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\SaleStatus whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\SaleStatus whereSaleStatusId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\SaleStatus whereUpdatedAt($value)
 */
	class SaleStatus extends \Eloquent {}
}

namespace App{
/**
 * App\Contact
 *
 * @property int $contact_id
 * @property int $client_id
 * @property int $contact_type
 * @property string|null $business_name
 * @property string $first_name
 * @property string $last_name
 * @property string|null $middle_name
 * @property string|null $prefix
 * @property string|null $suffix
 * @property int|null $ssn
 * @property string|null $dob
 * @property string $street
 * @property string|null $street2
 * @property string $city
 * @property string $state
 * @property string $zip
 * @property int $phone_country
 * @property int|null $phone
 * @property string|null $email
 * @property int $fax_country
 * @property int|null $fax
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\DailySale[] $sales
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Contact byClient($clientId)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Contact byContact($contactId)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Contact newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Contact newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Contact query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Contact whereBusinessName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Contact whereCity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Contact whereClientId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Contact whereContactId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Contact whereContactType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Contact whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Contact whereDob($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Contact whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Contact whereFax($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Contact whereFaxCountry($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Contact whereFirstName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Contact whereLastName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Contact whereMiddleName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Contact wherePhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Contact wherePhoneCountry($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Contact wherePrefix($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Contact whereSsn($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Contact whereState($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Contact whereStreet($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Contact whereStreet2($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Contact whereSuffix($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Contact whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Contact whereZip($value)
 */
	class Contact extends \Eloquent {}
}

namespace App{
/**
 * App\Expense
 *
 * @property int $expense_id
 * @property int $payroll_details_id
 * @property int $agent_id
 * @property string|null $title
 * @property string|null $description
 * @property float $amount
 * @property string $expense_date
 * @property int|null $modified_by
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\PayrollDetail $payrollDetails
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Expense byExpense($id)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Expense byPayrollDetailsId($id)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Expense newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Expense newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Expense query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Expense whereAgentId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Expense whereAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Expense whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Expense whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Expense whereExpenseDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Expense whereExpenseId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Expense whereModifiedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Expense wherePayrollDetailsId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Expense whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Expense whereUpdatedAt($value)
 */
	class Expense extends \Eloquent {}
}

namespace App{
/**
 * App\DailySaleRemark
 *
 * @property int $daily_sale_id
 * @property int $remark_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\DailySale $dailySale
 * @property-read \App\Remark $remark
 * @method static \Illuminate\Database\Eloquent\Builder|\App\DailySaleRemark newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\DailySaleRemark newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\DailySaleRemark query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\DailySaleRemark whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\DailySaleRemark whereDailySaleId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\DailySaleRemark whereRemarkId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\DailySaleRemark whereUpdatedAt($value)
 */
	class DailySaleRemark extends \Eloquent {}
}

namespace App{
/**
 * App\UserDetail
 *
 * @property int $user_detail_id
 * @property int $user_id
 * @property string $street
 * @property string|null $street2
 * @property string $city
 * @property string $state
 * @property int $zip
 * @property string|null $ssn
 * @property string|null $phone
 * @property string $birthDate
 * @property int|null $bankRouting
 * @property int|null $bankAccount
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Campaign $campaign
 * @property-read \App\User $user
 * @method static \Illuminate\Database\Eloquent\Builder|\App\UserDetail id($userDetailId)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\UserDetail newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\UserDetail newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\UserDetail query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\UserDetail userId($userId)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\UserDetail whereBankAccount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\UserDetail whereBankRouting($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\UserDetail whereBirthDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\UserDetail whereCity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\UserDetail whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\UserDetail wherePhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\UserDetail whereSsn($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\UserDetail whereState($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\UserDetail whereStreet($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\UserDetail whereStreet2($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\UserDetail whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\UserDetail whereUserDetailId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\UserDetail whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\UserDetail whereZip($value)
 */
	class UserDetail extends \Eloquent {}
}

namespace App{
/**
 * App\PayrollDetail
 *
 * @property int $payroll_details_id
 * @property int $payroll_id
 * @property int $agent_id
 * @property int $sales
 * @property float|null $taxes
 * @property float $gross_total
 * @property float $net_total
 * @property int $modified_by
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property-read \App\Agent $agent
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Expense[] $expenses
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Override[] $overrides
 * @property-read \App\Payroll $payroll
 * @method static \Illuminate\Database\Eloquent\Builder|\App\PayrollDetail byPayrollDetailsId($id)
 * @method static bool|null forceDelete()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\PayrollDetail newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\PayrollDetail newQuery()
 * @method static \Illuminate\Database\Query\Builder|\App\PayrollDetail onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\PayrollDetail query()
 * @method static bool|null restore()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\PayrollDetail whereAgentId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\PayrollDetail whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\PayrollDetail whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\PayrollDetail whereGrossTotal($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\PayrollDetail whereModifiedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\PayrollDetail whereNetTotal($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\PayrollDetail wherePayrollDetailsId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\PayrollDetail wherePayrollId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\PayrollDetail whereSales($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\PayrollDetail whereTaxes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\PayrollDetail whereUpdatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\PayrollDetail withTrashed()
 * @method static \Illuminate\Database\Query\Builder|\App\PayrollDetail withoutTrashed()
 */
	class PayrollDetail extends \Eloquent {}
}

namespace App{
/**
 * App\Invoice
 *
 * @property int $invoice_id
 * @property int $agent_id
 * @property int $campaign_id
 * @property string $issue_date
 * @property string $week_ending
 * @property int|null $modified_by
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Invoice byAgentId($id)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Invoice byCampaignId($id)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Invoice byIssueDate($date)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Invoice newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Invoice newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Invoice query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Invoice whereAgentId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Invoice whereCampaignId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Invoice whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Invoice whereInvoiceId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Invoice whereIssueDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Invoice whereModifiedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Invoice whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Invoice whereWeekEnding($value)
 */
	class Invoice extends \Eloquent {}
}

namespace App{
/**
 * App\RoleType
 *
 * @property int $id
 * @property string $type
 * @property bool $active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\RoleType byActiveStatus($includeInactive = false)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\RoleType newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\RoleType newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\RoleType query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\RoleType whereActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\RoleType whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\RoleType whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\RoleType whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\RoleType whereUpdatedAt($value)
 */
	class RoleType extends \Eloquent {}
}

namespace App{
/**
 * App\SalesPairing
 *
 * @property int $sales_pairings_id
 * @property int $agent_id
 * @property int $campaign_id
 * @property float|null $commission
 * @property int $sales_id
 * @property int $client_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Agent $agent
 * @method static \Illuminate\Database\Eloquent\Builder|\App\SalesPairing agentId($id)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\SalesPairing campaignId($campaignId)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\SalesPairing clientId($clientId)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\SalesPairing newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\SalesPairing newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\SalesPairing query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\SalesPairing salesPairings($id)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\SalesPairing whereAgentId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\SalesPairing whereCampaignId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\SalesPairing whereClientId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\SalesPairing whereCommission($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\SalesPairing whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\SalesPairing whereSalesId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\SalesPairing whereSalesPairingsId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\SalesPairing whereUpdatedAt($value)
 */
	class SalesPairing extends \Eloquent {}
}

namespace App{
/**
 * App\PayCycle
 *
 * @property int $pay_cycle_id
 * @property int $client_id
 * @property string $start_date
 * @property string $end_date
 * @property bool $is_pending
 * @property bool $is_closed
 * @property bool $is_locked
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\DailySale[] $dailySales
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Payroll[] $payrolls
 * @method static \Illuminate\Database\Eloquent\Builder|\App\PayCycle byClient($id)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\PayCycle byDates($start, $end)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\PayCycle byPayCycle($id)
 * @method static bool|null forceDelete()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\PayCycle includeClosed($include = false)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\PayCycle newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\PayCycle newQuery()
 * @method static \Illuminate\Database\Query\Builder|\App\PayCycle onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\PayCycle query()
 * @method static bool|null restore()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\PayCycle whereClientId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\PayCycle whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\PayCycle whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\PayCycle whereEndDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\PayCycle whereIsClosed($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\PayCycle whereIsLocked($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\PayCycle whereIsPending($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\PayCycle wherePayCycleId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\PayCycle whereStartDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\PayCycle whereUpdatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\PayCycle withTrashed()
 * @method static \Illuminate\Database\Query\Builder|\App\PayCycle withoutTrashed()
 */
	class PayCycle extends \Eloquent {}
}

namespace App{
/**
 * App\DailySale
 *
 * @property int $daily_sale_id
 * @property int $agent_id
 * @property int $client_id
 * @property int $utility_id
 * @property int $campaign_id
 * @property int $contact_id
 * @property string $pod_account
 * @property int $status
 * @property int $paid_status
 * @property int|null $pay_cycle_id
 * @property string $sale_date
 * @property string $last_touch_date
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property string|null $paid_date
 * @property string|null $charge_date
 * @property string|null $repaid_date
 * @property-read \App\Agent $agent
 * @property-read \App\Campaign $campaign
 * @property-read \App\Contact $contact
 * @property-read \App\PayCycle|null $payCycle
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Remark[] $remarks
 * @property-read \App\SaleStatus $saleStatus
 * @method static \Illuminate\Database\Eloquent\Builder|\App\DailySale byAccount($pod)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\DailySale byAgentId($agentId)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\DailySale byCampaign($campaignId)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\DailySale byClient($clientId)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\DailySale byDailySale($dailySaleId)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\DailySale byDateRange($startDate, $endDate)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\DailySale byPaidStatus($status)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\DailySale byPayCycle($id)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\DailySale filterPaid()
 * @method static bool|null forceDelete()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\DailySale newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\DailySale newQuery()
 * @method static \Illuminate\Database\Query\Builder|\App\DailySale onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\DailySale query()
 * @method static bool|null restore()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\DailySale whereAgentId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\DailySale whereCampaignId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\DailySale whereChargeDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\DailySale whereClientId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\DailySale whereContactId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\DailySale whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\DailySale whereDailySaleId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\DailySale whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\DailySale whereLastTouchDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\DailySale wherePaidDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\DailySale wherePaidStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\DailySale wherePayCycleId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\DailySale wherePodAccount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\DailySale whereRepaidDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\DailySale whereSaleDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\DailySale whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\DailySale whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\DailySale whereUtilityId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\DailySale withTrashed()
 * @method static \Illuminate\Database\Query\Builder|\App\DailySale withoutTrashed()
 */
	class DailySale extends \Eloquent {}
}

namespace App{
/**
 * App\Client
 *
 * @property int $client_id
 * @property string $name
 * @property string $street
 * @property string $city
 * @property string $state
 * @property int $zip
 * @property float $phone
 * @property int $taxid
 * @property bool $active
 * @property int $modified_by
 * @property string|null $deleted_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\ClientOptions $clientOption
 * @property-read \App\SessionUser $sessionUser
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\User[] $users
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Client clientId($clientId)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Client newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Client newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Client query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Client whereActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Client whereCity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Client whereClientId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Client whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Client whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Client whereModifiedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Client whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Client wherePhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Client whereState($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Client whereStreet($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Client whereTaxid($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Client whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Client whereZip($value)
 */
	class Client extends \Eloquent {}
}

