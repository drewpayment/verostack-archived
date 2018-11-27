<?php
/**
 * Created by PhpStorm.
 * User: drewpayment
 * Date: 5/5/18
 * Time: 1:09 AM
 */

namespace App\Http\Resources;


use App\Http\Helpers;
use App\User;
use Illuminate\Http\Response;

class ApiResource {

	protected $helper;
	protected $status;
	protected $data;
	protected $response;
	public $hasError;

	/**
	 * ApiResource constructor.
	 *
	 * @param null $obj
	 * @return \App\Http\Resources\ApiResource
	 */
	public function __construct($obj = null) {
		$this->helper = new Helpers;
		return $this->setData($obj);
	}

	public function mergeInto(ApiResource &$resource)
	{
		if($this->hasData())
			$resource->setData($this->getData());
		$resource->buildResponse($this->getData());
		return $resource;
	}

	public function combineStatus(ApiResource &$resource)
	{
		return $resource->hasData()
			? $resource->setToSuccess()
			: $resource->setToFail();
	}

	/**
	 * Returns the locally stored data.
	 *
	 */
	public function getData()
	{
		return $this->data;
	}

	/**
	 * Sets the data, if the data is null then creates an error object and returns.
	 *
	 * @param $obj
	 *
	 * @return $this
	 */
	public function setData($obj)
	{
		$this->data = $obj == null
			? $obj
			: is_object($obj)
				? $this->helper->normalizeLaravelObject(array_filter($obj->toArray()))
				: $obj;

		return $this->hasData() ? $this->setToSuccess() : $this->setToFail();
	}

	/**
	 * Determines if the resource has data.
	 *
	 * @return bool
	 */
	public function hasData()
	{
		return !is_null($this->data);
	}

    /**
     * Sets the ApiResource to success/fail based on the truthy value 
     * passed into the method.
     *
     * @param [boolean] $status
     * @return ApiResource
     */
    public function setStatus($status)
    {
        if($status)
            $this->setToSuccess();
        else
            $this->setToFail();
        return $this;
    }

	/**
	 * Sets the resource to success and updates the response.
	 *
	 * @return $this \App\Http\Resources\ApiResource
	 */
	public function setToSuccess()
	{
		$this->hasError = false;
		$this->status = Response::HTTP_OK;
		$this->response = $this->buildResponse();
		return $this;
	}

	/**
	 * Sets the resource to fail and updates the response.
	 *
	 * @return $this \App\Http\Resources\ApiResource
	 */
	public function setToFail()
	{
		$this->hasError = true;
		$this->status = Response::HTTP_BAD_REQUEST;
		$this->response = $this->buildResponse();
		return $this;
	}

	/**
	 * TODO: Not sure if this works.... I would like for it to just resolve the web request and return back to the
	 * frontend with the result
	 *
	 * @return $this|\Illuminate\Http\JsonResponse
	 */
	public function throwApiException($exceptionMsg = null)
	{
		if($this->hasError)
		{
			$this->status = Response::HTTP_INTERNAL_SERVER_ERROR;

            if(is_null($exceptionMsg)) {
                $this->response = $this->buildResponse([
                    'message' => 'A fatal exception occurred. Please try again later.'
                ]);
            } else {
                $this->response = $this->buildResponse([
                    'message' => $exceptionMsg
                ]);
            }
		}

		return $this;
	}

	/**
	 * Checks to make sure the user has access to the client.
	 *
	 * @param $userId
	 *
	 * @return ApiResource
	 */
	public function checkAccessByUser($userId)
	{
		$authorized = false;
		$user = User::find($userId)->first();
		$selectedClientId = $user->sessionUser->session_client;
		$clients = $user->clients->all();
		foreach($clients as $c)
		{
			$authorized = $c->client_id == $selectedClientId;
		}

		if($authorized)
			return $this->setToSuccess();
		else
			return $this->setToFail();
	}

	/**
	 * Checks access of client id.
	 *
	 * @param $clientId
	 * @param $userId
	 *
	 * @return ApiResource
	 */
	public function checkAccessByClient($clientId, $userId)
	{
		$user = User::find($userId)->first();
		$selectedClient = $user->sessionUser->session_client;
		$authorized = $clientId == $selectedClient;

		if($authorized)
			return $this->setToSuccess();
		else
			return $this->setToFail();
	}

	/**
	 * Gets response information from resource
	 *
	 * @return mixed
	 */
	public function getResponse()
	{
		return $this->response;
	}

	/**
	 * Create and return json response object.
	 *
	 * @param null $data
	 *
	 * @return \Illuminate\Http\JsonResponse
	 */
	private function buildResponse($data = null)
	{
		$data = $data == null ? $this->data : $data;
		return response()->json($data, $this->status);
	}

}