<?php

namespace App\Http\Controllers;

use App\Http\Helpers;
use App\Override;
use Illuminate\Http\Request;

class OverrideController extends Controller
{

	protected $helpers;

	public function __construct(Helpers $_helpers)
	{
		$this->helpers = $_helpers;
	}

	/**
	 * @param $overrideId
	 *
	 * @return \Illuminate\Http\JsonResponse
	 */
	public function getOverridesByOverrideId($overrideId)
	{
		$overrides = Override::find($overrideId);

		return response()->json($this->helpers->normalizeLaravelObject($overrides->toArray()));
	}

}
