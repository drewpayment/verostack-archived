<?php

namespace App\Http\Controllers;

use App\DailySale;
use App\Http\UserService;
use Illuminate\Http\Request;
use App\Http\SalesPairingsService;
use App\Http\Resources\ApiResource;
use Illuminate\Support\Facades\Auth;
use App\Http\Services\PayrollDetailsService;
use App\Http\Helpers;
use Symfony\Component\Process\Process;
use Illuminate\Support\Facades\URL;
use Carbon\Carbon;
use Symfony\Component\Process\Exception\ProcessFailedException;
use Illuminate\Http\JsonResponse;

class PayrollDetailController extends Controller
{
    protected $service;
    protected $userService;
    protected $salesPairingsService;
    protected $helper;

    public function __construct(PayrollDetailsService $_service, UserService $_userService, 
        SalesPairingsService $_salesPairingsService, Helpers $_helpers) {
        $this->service = $_service;
        $this->userService = $_userService;
        $this->salesPairingsService = $_salesPairingsService;
        $this->helper = $_helpers;
    }

    /**
     * QueryString Parameters get passed: 
     * page - (Page # in Pagination)
     * resultsPerPage - (# of results per paginated result)
     * startDate - (start date filter)
     * endDate - (end date filter)
     *
     * @param Request $request
     * @param int $clientId
     * @return JsonResponse
     */
    public function getPaychecks(Request $request, $clientId)
    {
        $result = new ApiResource();

        $result
			->checkAccessByClient($clientId, Auth::user()->id)
			->mergeInto($result);

		if($result->hasError)
			return $result->throwApiException()->getResponse();

        $this->service->getPaychecksPaged($request, $clientId)->mergeInto($result);

        return $result->throwApiException()->getResponse();
    }

    /**
     * This is the API endpoint that handles executing the node script and creating the PDF stub.
     *
     * @param int $clientId
     * @return JsonResponse
     */
    public function runHeadlessDetailScript($clientId, $payrollDetailsId)
    {
        $result = new ApiResource();
        $userId = Auth::user()->id;

        $result
            ->checkAccessByClient($clientId, $userId)
            ->mergeInto($result);

        if($result->hasError)
            return $result->throwApiException()->getResponse();

        $url = URL::to('/#/admin/pay/paycheck-detail?client=') . $clientId 
            . '&user=' . $userId 
            . '&detail=' . $payrollDetailsId
            . '&headless=' . env('HEADLESS');
        
        $baseStoragePath = storage_path('app/public/pdfs');
        $randomIdentifier = bin2hex(random_bytes(7));
        $date = Carbon::now()->format('Y-m-d');
        $env = ["PATH" => env('NODE_PATH')];
        $process = new Process(['node', storage_path('scripts/pdf.js'), 
            $url, $clientId, $userId, $date, $baseStoragePath, $randomIdentifier
        ]);

        $process->run(null, $env);

        if(!$process->isSuccessful()) {
            throw new ProcessFailedException($process);
            return $result->setToFail()
                ->throwApiException()
                ->getResponse();
        }

        /**
         * 
         * NEED TO THEN GET FILE FROM FILESYSTEM AND RETURN IT TO THE FRONTEND... 
         * 
         */
        $pdf = base64_encode(file_get_contents($baseStoragePath . '/' . $clientId . '/' . $userId . '/' . $date . '-' . $randomIdentifier . '.pdf'));

        $json = new JsonResponse();
        $json->setData(['data' => $pdf]);
        $json->withHeaders(['Content-Type' => 'application/json; charset=utf-8', 'Content-Length' => strlen($pdf)]);

        return $json;
    }

    public function getHeadlessPaycheckDetail($clientId, $userId, $payrollDetailId, $headless)
    {
        $result = new ApiResource();

        $result
            ->checkAccessByClient($clientId, $userId)
            ->mergeInto($result);

        if($result->hasError)
            return $result->throwApiException()->getResponse();

        $envHead = env('HEADLESS');

        if($envHead != $headless)
            return $result->setToFail()->throwApiException()->getResponse();

        $detail = $this->service->getPaycheck($payrollDetailId)->getData();
        $user = $this->userService->getUserDtoByUser($userId);
        $sales = DailySale::with(['agent', 'campaign', 'saleStatus'])->byClient($clientId)
            ->filterPaid()
            ->byDateRange($detail['payroll']['payCycle']['startDate'], $detail['payroll']['payCycle']['endDate'])
            ->get();
        $sales = $this->helper->normalizeLaravelObject($sales->toArray());
        $pairings = $this->salesPairingsService->getSalesPairingsByClientId($clientId)->getData();

        $payload = ['detail' => $detail, 'user' => $user, 'sales' => $sales, 'pairings' => $pairings];

        return $result->setData($payload)
            ->throwApiException()->getResponse();
    }

    public function getPaycheckList(Request $request, $clientId, $agentId)
    {
        $result = new ApiResource();

        $result
            ->checkAccessByClient($clientId, Auth::user()->id)
            ->mergeInto($result);

        if($result->hasError)
            return $result->throwApiException()->getResponse();

        $this->service->getAgentPaychecks($request, $clientId, $agentId)->mergeInto($result);

        return $result->throwApiException()
            ->getResponse();
    }

}
