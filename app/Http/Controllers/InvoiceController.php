<?php

namespace App\Http\Controllers;

use App\AgentSale;
use App\Http\Resources\ApiResource;
use App\Invoice;
use Illuminate\Http\Request;
use App\Http\Helpers;

class InvoiceController extends Controller
{

	protected $helper;

	public function __construct(Helpers $_helper) {
		$this->helper = $_helper;
	}

	public function getInvoice($invoiceId = null)
	{
		$invoice = Invoice::find($invoiceId);

		if($invoice == null) return response()->setStatusCode(500)->isServerError();

		return response()->json($invoice);
	}

	public function searchInvoice($agentId, $campaignId, $issueDate)
	{
		$result = [
			'message' => '',
			'data' => null
		];
		$invoice = Invoice::byAgentId($agentId)->byCampaignId($campaignId)->byIssueDate($issueDate)->first();

		if($invoice == null) {
			response()->setStatusCode(500);
			$result['message'] = 'Server error. Invoice not found.';
		}

		$result['data'] = $invoice;

		return response()->json($invoice, response()->getStatusCode());
	}

	public function saveInvoice($invoiceId = null)
	{
		$invoice = ($invoiceId) ? Invoice::find($invoiceId) : null;
		$input = request()->all();

		return response()->json($input);


		if($invoice != null)
		{
			$invoice->$input['issueDate'];
			$invoice->$input['weekEnding'];
			$invoice->save();
		}

		if(count($input['agentSales']) > 0)
		{
			$agentSales = $input['agentSales'];
			foreach($agentSales as $as)
			{
				$a = AgentSale::find($as['agentSaleId']);
				if($a != null)
				{
					$a->first_name = $as['firstName'];
					$a->last_name = $as['lastName'];
					$a->address = $as['street'];
					$a->city = $as['city'];
					$a->state = $as['state'];
					$a->postal_code = $as['postalCode'];
					$a->status_type = $as['statusType'];
					$a->amount = $as['amount'];
				}
			}
		}
	}

	public function saveNewInvoice(Request $request, $clientId, $agentId)
	{
		$result = new ApiResource();

		return response()->json([$request->all(), $clientId, $agentId]);
	}

}
